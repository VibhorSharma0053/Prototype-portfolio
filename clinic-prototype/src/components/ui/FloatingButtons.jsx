import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt, FaCalendarCheck, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function FloatingButtons() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {showTopBtn && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-700 transition-colors"
        >
          <FaArrowUp />
        </motion.button>
      )}

      <a 
        href="tel:+919876543210" 
        className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:scale-110 transition-transform text-xl"
        title="Call Us"
      >
        <FaPhoneAlt />
      </a>
      
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noreferrer"
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:scale-110 transition-transform text-2xl"
        title="WhatsApp Us"
      >
        <FaWhatsapp />
      </a>
      
      <Link 
        to="/contact" 
        className="hidden md:flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-bold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:scale-105 transition-transform"
      >
        <FaCalendarCheck /> Book Appointment
      </Link>
    </div>
  );
}
