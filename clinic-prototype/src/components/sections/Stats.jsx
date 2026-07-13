import { motion } from 'framer-motion';
import { stats } from '../../data/stats';

export default function Stats() {
  return (
    <section className="py-16 bg-primary relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`text-center ${idx % 2 !== 0 && idx !== 0 ? 'border-l border-white/20' : ''}`}
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                {stat.value}<span className="text-accent">{stat.suffix}</span>
              </div>
              <div className="text-blue-100 font-medium text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
