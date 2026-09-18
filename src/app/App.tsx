import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Services } from '../pages/Services';
import { Contact } from '../pages/Contact';
import { NotFound } from '../pages/NotFound';

const metadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Thoughtful Catering in Ghana',
    description:
      'Thoughtful catering, handcrafted pastries, and memorable gatherings in Ghana. Plan your next occasion with Harvest & Grace.',
  },
  '/about': {
    title: 'Our Story',
    description:
      'Meet the spirit behind Harvest & Grace: good food, thoughtful service, and warm Ghanaian hospitality.',
  },
  '/services': {
    title: 'Catering & Menus',
    description:
      'Explore pastries, corporate catering, wedding menus, private dining, and catering packages from Harvest & Grace.',
  },
  '/contact': {
    title: 'Plan Your Occasion',
    description:
      'Tell Harvest & Grace about your next occasion. Enquire about catering, a private tasting, or a personalised menu in Ghana.',
  },
};

export function App() {
  const location = useLocation();
  const lastLocation = useRef(location.key);
  useEffect(() => {
    const meta = metadata[location.pathname] ?? {
      title: 'Page Not Found',
      description: 'Find your way back to Harvest & Grace.',
    };
    document.title = `Harvest & Grace | ${meta.title}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
    if (lastLocation.current !== location.key)
      (target ?? document.getElementById('main-content'))?.focus({ preventScroll: true });
    lastLocation.current = location.key;
  }, [location]);

  return (
    <>
      <a
        className="fixed -top-25 left-4 z-100 bg-paper px-5 py-3 text-green focus:top-2.5"
        href="#main-content"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <div className="animate-page-enter" key={location.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}
