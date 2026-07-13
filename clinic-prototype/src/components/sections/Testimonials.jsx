import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../../data/testimonials';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Patients Say</h2>
          <p className="text-slate-600 text-lg">Trusted by thousands of families for their healthcare needs.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10">
            <button onClick={prev} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all">
              <FaChevronLeft />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10">
            <button onClick={next} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all">
              <FaChevronRight />
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 relative">
            <div className="absolute top-8 left-8 text-6xl text-primary/10">
              <FaQuoteLeft />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="p-10 md:p-16 text-center"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl mx-1" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-10">
                  "{testimonials[currentIndex].review}"
                </p>
                
                <div className="flex flex-col items-center">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name} 
                    className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-primary/20"
                  />
                  <h4 className="font-bold text-lg text-slate-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-slate-500">Verified Patient</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === idx ? 'bg-primary w-8' : 'bg-slate-300 hover:bg-slate-400'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
