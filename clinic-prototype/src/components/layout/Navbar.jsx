import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStethoscope, FaBars, FaTimes } from 'react-icons/fa';
import { cn } from '../../utils/cn';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Packages', path: '/packages' },
  { name: 'Doctors', path: '/doctors' },
  { name: 'Test Reports', path: '/reports' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <FaStethoscope className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-text-primary tracking-tight">
              ABC <span className="text-primary">Clinic</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary relative py-2',
                      location.pathname === link.path ? 'text-primary' : 'text-slate-600'
                    )}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <Link
                to="/reports"
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                Download Report
              </Link>
              <Link
                to="/contact"
                className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all"
              >
                Book Appointment
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-slate-600 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { height: 'auto', opacity: 1, display: 'block' },
          closed: { height: 0, opacity: 0, transitionEnd: { display: 'none' } },
        }}
        className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
      >
        <ul className="flex flex-col px-4 py-4 gap-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={cn(
                  'block px-4 py-3 rounded-xl text-base font-medium transition-colors',
                  location.pathname === link.path
                    ? 'bg-primary/5 text-primary'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <div className="border-t border-slate-100 my-2 pt-4 flex flex-col gap-3 px-4">
            <Link
              to="/reports"
              className="text-center py-3 rounded-xl font-medium text-slate-600 border border-slate-200"
            >
              Download Report
            </Link>
            <Link
              to="/contact"
              className="text-center py-3 rounded-xl font-semibold text-white bg-primary shadow-md"
            >
              Book Appointment
            </Link>
          </div>
        </ul>
      </motion.div>
    </header>
  );
}
