import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import SectionHeader from '../ui/SectionHeader';
import { testimonials } from '../../data/testimonials';
import { getInitials } from '../../utils/helpers';
import { useIsMobile, useIsTablet } from '../../hooks/useMediaQuery';
import { ANIMATION_VARIANTS } from '../../utils/constants';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const itemsPerPage = isMobile ? 1 : isTablet ? 2 : 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [totalPages, isPaused]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    const start = currentIndex * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden section-gradient-2">
      <div className="container-custom relative z-10">
        <SectionHeader 
          title="What My Clients Say" 
          subtitle="Don't just take my word for it. Here's what business owners have to say about working with me."
        />

        <motion.div 
          className="mt-16 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={ANIMATION_VARIANTS.fadeInUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden px-4 -mx-4 pb-12 pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {getVisibleTestimonials().map((testimonial) => (
                  <div key={testimonial.id} className="glass-card p-10 rounded-2xl h-full flex flex-col relative group">
                    <FaQuoteLeft className="absolute top-6 right-6 text-6xl text-white/5 group-hover:text-primary-500/10 transition-colors duration-300" />
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-white/20'}`} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-white/80 leading-relaxed mb-8 flex-grow relative z-10 italic">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {getInitials(testimonial.name)}
                      </div>
                      <div>
                        <h4 className="text-white font-bold font-heading">{testimonial.name}</h4>
                        <p className="text-sm text-primary-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index 
                    ? 'w-8 h-2 bg-gradient-to-r from-primary-500 to-accent-500' 
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
