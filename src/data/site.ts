import hero from '../assets/mainHero.webp';
import heroMobile from '../assets/mainHeroMobile.jpg';
import pastries from '../assets/anastasiya-badun-n4-NW-jZcoQ-unsplash.webp';
import kitchen from '../assets/elevate-5e-JfidWFH0-unsplash.webp';
import muffins from '../assets/louis-dupressoir-bMgeEUvU73s-unsplash.webp';
import cake from '../assets/cake.jpg';
import dessert from '../assets/mr-pugo-KMo2QHe-93M-unsplash.webp';

// Demo business content, retained and refined from the original static site.
export const site = {
  name: 'Harvest & Grace',
  email: 'hello@harvestandgrace.com',
  phone: '+233 55 960 3409',
  phoneHref: 'tel:+233559603409',
  whatsapp: 'https://wa.me/233559603409',
  location: 'Based in Ghana',
};
export const images = { hero, heroMobile, pastries, kitchen, muffins, cake, dessert };
export const navigation = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Our story' },
  { to: '/services', label: 'Catering & menus' },
  { to: '/contact', label: 'Contact' },
];
export type Service = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  detail: string;
};
export const services: Service[] = [
  {
    id: 'pastries',
    number: '01',
    category: 'HANDCRAFTED',
    title: 'Pastries & sweet things',
    description: 'Flaky pies, delicate bites, and something sweet to bring everyone together.',
    image: pastries,
    alt: 'An assortment of fruit tartlets, croissants, and handmade pastries',
    detail: 'From $10 per pie',
  },
  {
    id: 'corporate',
    number: '02',
    category: 'GOOD COMPANY',
    title: 'Corporate gatherings',
    description: 'From a working lunch to the annual gala. Thoughtful food, beautifully handled.',
    image: hero,
    alt: 'Golden savoury rolls served with a dipping sauce',
    detail: 'From $20 per person',
  },
  {
    id: 'celebrations',
    number: '03',
    category: 'LIFE, CELEBRATED',
    title: 'Weddings & private dining',
    description: 'Personal menus for the people and occasions that mean the most to you.',
    image: cake,
    alt: 'A celebration cake prepared for a special occasion',
    detail: 'A menu made for you',
  },
];
export const steps = [
  {
    title: 'Start the conversation',
    description:
      'Tell us your vision, your guest count, and what you love to eat. We will shape a proposal around your occasion.',
  },
  {
    title: 'Find your perfect menu',
    description:
      'Explore flavours at a private tasting. Together, we refine the details, from the first bite to the final course.',
  },
  {
    title: 'Be a guest at your own party',
    description:
      'We take care of setup, service, and cleanup. You stay in the moment, surrounded by your favourite people.',
  },
];
export type CateringPackage = {
  name: string;
  label: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  featured?: boolean;
};
export const packages: CateringPackage[] = [
  {
    name: 'Essential',
    label: 'THE CLASSICS, DONE WELL',
    price: '$45',
    unit: 'from / person',
    description: 'A complete dining experience for gatherings of 20 or more.',
    features: ['3-course set menu', '1 service staff per 20 guests', 'Setup & cleanup'],
  },
  {
    name: 'Signature',
    label: 'MAKE IT YOUR OWN',
    price: 'Tailored',
    unit: 'to your occasion',
    description: 'A personal menu, with the extra touches that feel like you.',
    features: [
      'A collaboratively designed menu',
      'Private menu tasting',
      'Coordinated setup & service',
    ],
    featured: true,
  },
  {
    name: 'Bespoke',
    label: 'EVERY DETAIL CONSIDERED',
    price: 'Bespoke',
    unit: 'by consultation',
    description: 'For weddings, larger celebrations, and a vision all your own.',
    features: [
      'A fully personalised food experience',
      'Event planning consultation',
      'Service tailored to your guest list',
    ],
  },
];
export const eventTypes = [
  'Wedding',
  'Corporate event',
  'Private dining',
  'Pastries & pies',
  'Other occasion',
] as const;
