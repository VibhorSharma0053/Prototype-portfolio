import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { HiOutlineBars3, HiOutlineXMark, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { NAV_LINKS } from '../../utils/constants';
import { scrollToElement } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  // Shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', '')).filter(Boolean);
    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    scrollToElement(id);
    setMobileMenuOpen(false);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass rounded-none shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 transition-transform duration-300 group-hover:scale-110">
            <span className="font-heading text-lg font-bold text-white">VS</span>
          </div>
          <span className="gradient-text hidden font-heading text-xl font-bold sm:inline">
            Vibhor
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative rounded-lg px-3 py-2 font-body text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-accent-400'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-accent-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-all hover:border-white/20 hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <HiOutlineSun className="h-4 w-4" />
            ) : (
              <HiOutlineMoon className="h-4 w-4" />
            )}
          </button>

          {/* Admin Link */}
          <Link
            to="/login"
            className="hidden rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-body text-sm font-medium text-white/70 transition-all hover:border-accent-400/50 hover:text-accent-400 sm:inline-block"
          >
            Admin
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-all hover:text-white lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <HiOutlineXMark className="h-5 w-5" />
            ) : (
              <HiOutlineBars3 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 h-full w-72 border-l border-white/10 bg-surface-800/95 backdrop-blur-xl lg:hidden"
            >
              <div className="flex h-full flex-col p-6">
                {/* Close Button */}
                <div className="mb-8 flex justify-end">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/70 hover:text-white"
                  >
                    <HiOutlineXMark className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, index) => {
                    const sectionId = link.href.replace('#', '');
                    const isActive = activeSection === sectionId;
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`rounded-lg px-4 py-3 font-body text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-accent-500/10 text-accent-400'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {link.name}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Mobile Admin Link */}
                <div className="mt-auto">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center font-body text-sm font-medium text-white/70 transition-all hover:text-accent-400"
                  >
                    Admin Panel
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
