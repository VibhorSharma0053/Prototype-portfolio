import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiChevronDown } from 'react-icons/hi2';
import SectionHeader from '../ui/SectionHeader';
import { faqData } from '../../data/faq';
import { ANIMATION_VARIANTS } from '../../utils/constants';

const FAQItem = ({ faq, isOpen, toggleOpen }) => {
  return (
    <motion.div 
      variants={ANIMATION_VARIANTS.staggerItem}
      className="mb-6"
    >
      <button
        onClick={toggleOpen}
        className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-300 ${
          isOpen 
            ? 'bg-gradient-to-r from-primary-900/40 to-secondary-900/40 border border-primary-500/30' 
            : 'glass hover:bg-white/10'
        }`}
      >
        <h3 className="text-lg font-heading font-semibold text-left text-white pr-8">
          {faq.question}
        </h3>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
          isOpen ? 'bg-primary-500 text-white rotate-180' : 'bg-white/10 text-white/70'
        }`}>
          <HiChevronDown className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-2 text-white/70 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState(1); // First item open by default

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <SectionHeader 
          title="Frequently Asked Questions" 
          subtitle="Everything you need to know about my services, pricing, and development process."
        />

        <motion.div 
          className="mt-16 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          {faqData.map((faq) => (
            <FAQItem 
              key={faq.id} 
              faq={faq} 
              isOpen={openId === faq.id} 
              toggleOpen={() => handleToggle(faq.id)} 
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={ANIMATION_VARIANTS.fadeInUp}
        >
          <p className="text-white/60">
            Still have questions? <a href="#contact" className="text-accent-400 hover:text-accent-300 underline underline-offset-4 font-medium transition-colors">Contact me directly</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
