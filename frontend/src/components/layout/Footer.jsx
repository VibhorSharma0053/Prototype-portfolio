import { motion } from 'motion/react';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineArrowUp } from 'react-icons/hi2';
import { SiGithub, SiInstagram } from 'react-icons/si';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { NAV_LINKS, CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS, SITE_TAGLINE } from '../../utils/constants';
import { scrollToElement } from '../../utils/helpers';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { icon: SiGithub, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: FaLinkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: FaTwitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
    { icon: SiInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  ];

  const quickLinks = NAV_LINKS.slice(0, 5);
  const serviceLinks = [
    'Website Design',
    'Business Websites',
    'Landing Pages',
    'Custom Web Apps',
    'Website Maintenance',
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    scrollToElement(id);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-surface-800 to-surface-950">
      {/* Background accent */}
      <div className="blob blob-purple absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 opacity-5" />

      <div className="container-custom relative py-16">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500">
                <span className="font-heading text-lg font-bold text-white">VS</span>
              </div>
              <span className="gradient-text font-heading text-xl font-bold">Vibhor Sharma</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-white/50">
              {SITE_TAGLINE}. Crafting beautiful, high-performance digital experiences for local businesses.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:border-accent-400/50 hover:text-accent-400 hover:shadow-lg hover:shadow-accent-500/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold tracking-wider text-white/80 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-white/40 transition-colors duration-200 hover:text-accent-400"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold tracking-wider text-white/80 uppercase">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="text-sm text-white/40 transition-colors duration-200 hover:text-accent-400"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold tracking-wider text-white/80 uppercase">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2.5 text-sm text-white/40 transition-colors hover:text-accent-400"
                >
                  <HiOutlineEnvelope className="h-4 w-4 shrink-0 text-primary-400" />
                  <span className="truncate">{CONTACT_EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+91${CONTACT_PHONE}`}
                  className="flex items-center gap-2.5 text-sm text-white/40 transition-colors hover:text-accent-400"
                >
                  <HiOutlinePhone className="h-4 w-4 shrink-0 text-primary-400" />
                  <span>+91 {CONTACT_PHONE}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Copyright + Back to Top */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-white/30">
            © {currentYear} Vibhor Sharma. All rights reserved.
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={handleScrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50 transition-colors hover:border-accent-400/50 hover:text-accent-400"
          >
            <HiOutlineArrowUp className="h-4 w-4" />
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
