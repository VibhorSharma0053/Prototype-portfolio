import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../../data/faqs';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-lg">Find answers to common questions about our services.</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-primary shadow-md' : 'border-slate-200'}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-semibold text-slate-900 pr-8">{faq.question}</span>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {openIndex === index ? <FaMinus className="text-sm" /> : <FaPlus className="text-sm" />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
