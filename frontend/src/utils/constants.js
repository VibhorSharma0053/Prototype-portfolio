// ── App Constants ──

export const SITE_NAME = 'Vibhor Sharma';
export const SITE_TAGLINE = 'Premium Websites for Local Businesses';
export const SITE_DESCRIPTION = 'I design and develop high-performance websites that help cafés, restaurants, gyms, salons, clinics, stores, agencies, and local businesses attract more customers.';

export const CONTACT_EMAIL = 'vibhorsharma0053@gmail.com';
export const CONTACT_PHONE = '7355506900';

export const SOCIAL_LINKS = {
  github: 'https://github.com/VibhorSharma0053',
  linkedin: 'https://linkedin.com/in/vibhorsharma',
  twitter: 'https://twitter.com/vibhorsharma',
  instagram: 'https://instagram.com/vibhorsharma',
};

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Prototypes', href: '#prototypes' },
  { name: 'Process', href: '#process' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export const CATEGORIES = [
  'All',
  'Cafe',
  'Restaurant',
  'Gym',
  'Salon',
  'Clinic',
  'Hotel',
  'Real Estate',
  'Bakery',
  'Portfolio',
  'E-commerce',
  'Education',
  'Agency',
  'Fashion',
  'Travel',
  'Photography',
];

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  },
};
