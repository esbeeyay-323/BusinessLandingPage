# Harvest & Grace

A React and TypeScript catering website, converted from the original static Vite site. All business information, metrics, prices, and contact details are demonstration content.

## Development

Requires Node.js 22.12+ (verified with Node.js 24).

```sh
npm install
npm run dev
```

Vite prints the local URL. On Windows PowerShell with scripts disabled, use `npm.cmd` and `npx.cmd`.

## Structure

```text
src/
  app/App.tsx         Routes, page metadata, navigation focus and scrolling
  components/        Shared navigation, footer, hero, services, packages, form
  pages/             Home, About, Services, Contact, and NotFound
  data/site.ts       Typed demo content, photography, contact details
  lib/contact.ts     Enquiry types, validation, optional delivery adapter
  styles/tailwind.css Tailwind theme, shared base rules, responsive variants
  assets/            Original local photography
tests/site.spec.ts   Browser, form-delivery, accessibility, responsive checks
```

## Design

Refined culinary editorial. Cormorant Garamond provides expressive headings; DM Sans keeps navigation and forms readable. Both fonts are served locally. White, deep green, sage, and restrained terracotta build on the original food-led aesthetic. Spacing follows an 8px rhythm, with 4px control radii. Motion is limited to a short page entrance and hover feedback, and respects reduced-motion preferences.

The visual signature is full-width original food photography, large serif type, numbered services, and an asymmetric kitchen gallery. Design feasibility score: 14 (impact 4, fit 5, feasibility 4, performance 4, consistency risk 3).

Styling uses Tailwind CSS through its Vite plugin. Layouts and component states are expressed with utilities in JSX; `src/styles/tailwind.css` defines shared theme tokens, base typography, and responsive variants. Ant Design styles use a separate cascade layer below Tailwind utilities. Prettier sorts utility classes with `prettier-plugin-tailwindcss`.

## Contact Form

By default, the form runs in **demo mode**. It validates input and shows a clearly labelled demo confirmation. It does not send or persist personal information.

All form inputs use Ant Design: Input, Select, DatePicker, InputNumber, TextArea, and Checkbox. The shared ConfigProvider theme reads the Tailwind theme variables. Dates are kept as local `YYYY-MM-DD` strings in enquiry data, and the date picker prevents past-date selection. See the [Ant Design component documentation](https://ant.design/components/overview/) for the control APIs.

To connect delivery, set `VITE_CONTACT_ENDPOINT` in `.env.local` and restart or rebuild. The endpoint must accept a JSON `POST` containing `name`, `email`, `phone`, `event`, `date`, `guests`, `package`, `message`, and `consent`. It must return a 2xx HTTP status only after accepting the enquiry; non-2xx responses show a retryable error. Cross-origin endpoints need appropriate CORS headers. The UI times out after 15 seconds and preserves fields on failure.

Vite environment variables are public build-time configuration. Keep mail credentials and API secrets on the server. The receiving service must validate requests, enforce abuse protection, and perform delivery. No backend is included. Replace the demo email, telephone, and WhatsApp number in `src/data/site.ts` before public use; no official social profiles were supplied.

## Verification

```sh
npm run build
npx playwright install chromium
npm test
npm run format:check
```

Tests start isolated demo and delivery-configured servers on ports 4173 and 4174. All delivery requests are intercepted in the browser tests; no messages are sent. Screenshots are saved under `test-results/` at 320, 390, 768, 1440, and 1920px. If using a locally installed browser, set `PLAYWRIGHT_CHANNEL` to `msedge` or `chrome`.

## Deployment

```sh
npm run build
npm run preview
```

Publish `dist/` to a static host. BrowserRouter requires fallback routing: serve `index.html` for application routes such as `/about`, `/services`, and `/contact`. A Netlify-compatible `_redirects` file is included. On Nginx, use `try_files $uri $uri/ /index.html;`. Configure the equivalent rewrite on other hosts.

Pages update their titles and descriptions on client navigation. Search indexing that requires page-specific HTML would benefit from a future prerendering or server-rendering setup. Unknown URLs render the in-app not-found page; the static host's fallback may still return HTTP 200.

The original services, three-step process, gallery imagery, Essential package price, and metrics were retained. Repeated placeholder testimonials, unsupported client-logo claims, debug borders, stale availability copy, and unused imperative animation code were removed. Verify all demo claims and image rights before a public launch.

React routing follows the [official declarative routing setup](https://reactrouter.com/start/declarative/installation).
