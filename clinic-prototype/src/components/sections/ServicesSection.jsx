import { motion } from 'framer-motion';
import { services } from '../../data/services';
import * as Icons from 'react-icons/fa';

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Premium Services</h2>
          <p className="text-slate-600 text-lg">Comprehensive healthcare and diagnostic services designed around your needs.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon] || Icons.FaStethoscope;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
                
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-primary text-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors relative z-10">
                  <IconComponent />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed relative z-10">{service.description}</p>
                
                <div className="mt-6 flex items-center text-primary font-medium text-sm gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10 cursor-pointer">
                  Learn more <Icons.FaArrowRight className="text-xs" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
