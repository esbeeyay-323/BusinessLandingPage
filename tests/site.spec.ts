import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function fillEnquiry(page: Page) {
  await page.getByLabel('Your name').fill('Ama Mensah');
  await page.getByLabel('Email address').fill('ama@example.com');
  await page.getByLabel('The occasion').click();
  await page.getByRole('option', { name: 'Wedding', exact: true }).click();
  await page
    .getByLabel('Tell us about your plans')
    .fill('A garden wedding with a seasonal menu for 40 guests.');
  await page.getByLabel('I agree to be contacted').check();
}

test('SPA navigation, active links, deep links and recovery', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    Object.assign(window, { spaMarker: true });
  });
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Our story' })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'Our story' })
  ).toHaveAttribute('aria-current', 'page');
  const activeLink = page.getByRole('navigation').getByRole('link', { name: 'Our story' });
  await expect
    .poll(() =>
      activeLink.evaluate((element) => parseFloat(getComputedStyle(element, '::after').width))
    )
    .toBeGreaterThan(20);
  expect(await page.evaluate(() => Reflect.get(window, 'spaMarker'))).toBe(true);
  await expect(page.locator('#main-content')).toBeFocused();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Harvest & Grace');
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Harvest');
  await page.goto('/not-on-the-menu');
  await expect(
    page.getByRole('heading', { level: 1, name: 'A little off the menu.' })
  ).toBeVisible();
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page).toHaveURL('/');
});

test('mobile menu supports toggle, Escape and closes on navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const open = page.getByRole('button', { name: 'Open navigation' });
  await expect(open).toHaveCSS('color', 'rgb(24, 62, 53)');
  await expect(open.locator('svg')).toHaveCSS('stroke', 'rgb(24, 62, 53)');
  await expect(page.locator('.button-row')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await open.click();
  await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute(
    'aria-expanded',
    'true'
  );
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'Home', exact: true })
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(open).toBeFocused();
  await expect(page.getByRole('navigation')).toBeHidden();
  await open.click();
  await page.getByRole('navigation').getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(open).toHaveAttribute('aria-expanded', 'false');
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.getByRole('navigation')).toBeVisible();
});

test('package and service links preselect the enquiry', async ({ page }) => {
  await page.goto('/services');
  await page.getByRole('link', { name: "Let's talk signature" }).click();
  await expect(
    page.locator('.form-field').filter({ has: page.getByLabel('Preferred package') })
  ).toContainText('Signature');
  await page.goto('/services');
  await page.locator('#pastries').getByRole('link', { name: 'Plan this occasion' }).click();
  await expect(
    page.locator('.form-field').filter({ has: page.getByLabel('The occasion') })
  ).toContainText('Pastries & pies');
  await page.goto('/contact?package=invalid&event=invalid');
  await expect(page.getByLabel('Preferred package')).toHaveValue('');
  await expect(page.getByLabel('The occasion')).toHaveValue('');
});

test('accessible validation and honest demo confirmation without transmission', async ({
  page,
}) => {
  const transmissions: string[] = [];
  page.on('request', (request) => {
    if (request.method() === 'POST') transmissions.push(request.url());
  });
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Preview enquiry' }).click();
  await expect(page.getByLabel('Your name')).toBeFocused();
  await expect(page.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Please choose an occasion.')).toBeVisible();
  await fillEnquiry(page);
  await page.getByLabel('Email address').fill('not-an-email');
  await page.getByLabel('Number of guests').fill('0');
  await page.getByRole('button', { name: 'Preview enquiry' }).click();
  await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  await expect(page.getByText('Please enter a guest count from 1 to 10,000.')).toBeVisible();
  await page.getByLabel('Email address').fill('ama@example.com');
  await page.getByLabel('Number of guests').fill('40');
  await page.getByRole('button', { name: 'Preview enquiry' }).click();
  await expect(page.getByRole('status')).toContainText('no message was sent');
  await expect(page.getByRole('status')).toBeFocused();
  expect(transmissions).toEqual([]);
  await page.getByRole('button', { name: 'Edit enquiry' }).click();
  await expect(page.getByLabel('Your name')).toHaveValue('Ama Mensah');
  await expect(page.getByLabel('Your name')).toBeFocused();
});

test('configured delivery handles pending, failure and retry', async ({ page }) => {
  let attempts = 0;
  let releaseResponse: () => void = () => {};
  const responseGate = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });
  await page.route('**/api/enquiries', async (route) => {
    attempts++;
    expect(route.request().postDataJSON().email).toBe('ama@example.com');
    if (attempts === 1) {
      await responseGate;
      await route.fulfill({ status: 500, json: { error: 'Unavailable' } });
    } else await route.fulfill({ status: 200, json: { ok: true } });
  });
  await page.goto('http://127.0.0.1:4174/contact');
  await fillEnquiry(page);
  await page.getByRole('button', { name: 'Send your enquiry' }).click();
  await expect(page.getByRole('button', { name: 'Sending enquiry' })).toBeDisabled();
  await expect(page.getByLabel('Your name')).toBeDisabled();
  await expect(page.getByLabel('The occasion')).toBeDisabled();
  await expect(page.getByLabel('Event date')).toBeDisabled();
  await expect(page.getByLabel('Number of guests')).toBeDisabled();
  releaseResponse();
  await expect(page.getByRole('alert')).toContainText('could not send');
  await expect(page.getByLabel('Your name')).toHaveValue('Ama Mensah');
  await page.getByRole('button', { name: 'Send your enquiry' }).click();
  await expect(page.getByRole('status')).toContainText('Enquiry received');
  expect(attempts).toBe(2);
});

test('Ant Design date and select controls support keyboard selection and clearing', async ({
  page,
}) => {
  await page.goto('/contact');
  const occasion = page.getByLabel('The occasion');
  await occasion.focus();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page.locator('.form-field').filter({ has: occasion })).toContainText('Wedding');

  const date = page.getByLabel('Event date');
  await date.fill('2020-01-01');
  await date.press('Enter');
  await page.getByLabel('Your name').click();
  await expect(date).toHaveValue('');

  await date.fill('2099-12-25');
  await date.press('Enter');
  await expect(date).toHaveValue('2099-12-25');
  await date.hover();
  await page.getByRole('button', { name: 'Clear', exact: true }).click();
  await page.getByLabel('Your name').click();
  await expect(date).toHaveValue('');
});

test('FAQ expands with the keyboard', async ({ page }) => {
  await page.goto('/services');
  const question = page.getByText('Can we arrange a tasting?', { exact: true });
  await question.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Yes. Use the enquiry form', { exact: false })).toBeVisible();
});

test('Ant Design popups fit mobile and desktop viewports', async ({ page }, testInfo) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/contact');
    await page.getByLabel('The occasion').click();
    const options = page.getByRole('listbox');
    await expect(options).toBeVisible();
    await page.screenshot({
      path: testInfo.outputPath(`select-${width}.png`),
      animations: 'disabled',
    });
    await page.keyboard.press('Escape');
    await page.getByLabel('Event date').click();
    const calendar = page.locator('.ant-picker-dropdown:visible');
    await expect(calendar).toBeVisible();
    await expect(async () => {
      const bounds = await calendar.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }).toPass({ timeout: 3000 });
    await page.screenshot({
      path: testInfo.outputPath(`calendar-${width}.png`),
      animations: 'disabled',
    });
    await page.keyboard.press('Escape');
    await page.screenshot({ path: testInfo.outputPath(`contact-${width}.png`), fullPage: true });
  }
});

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`pages render without overflow at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    for (const path of ['/', '/about', '/services', '/contact']) {
      await page.goto(path);
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
      ).toBe(true);
      // Scroll lazy images into view before inspecting and capturing the complete page.
      for (const img of await page.locator('main img').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveJSProperty('complete', true);
        expect(
          await img.evaluate((element) => (element as HTMLImageElement).naturalWidth)
        ).toBeGreaterThan(0);
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({
        path: testInfo.outputPath(`${path.slice(1) || 'home'}-${width}-viewport.png`),
        animations: 'disabled',
      });
      await page.screenshot({
        path: testInfo.outputPath(`${path.slice(1) || 'home'}-${width}.png`),
        fullPage: true,
        animations: 'disabled',
      });
    }
    expect(pageErrors).toEqual([]);
  });
}

for (const width of [390, 1440]) {
  test(`WCAG accessibility checks at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ['/', '/about', '/services', '/contact']) {
      await page.goto(path);
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        results.violations,
        JSON.stringify(
          results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))
        )
      ).toEqual([]);
    }
  });
}
