import { motion } from 'motion/react';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { services } from '../../data/services';
import SectionHeader from '../ui/SectionHeader';
import { ANIMATION_VARIANTS } from '../../utils/constants';

const ServiceCard = ({ title, description, icon: Icon, color }) => {
  return (
    <motion.div
      variants={ANIMATION_VARIANTS.staggerItem}
      className="glass-card group cursor-pointer rounded-2xl p-8"
    >
      {/* Icon */}
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="mb-2 font-heading text-lg font-semibold text-white transition-colors group-hover:text-accent-400">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-white/50">
        {description}
      </p>

      {/* Learn More */}
      <div className="flex items-center gap-1.5 text-sm font-medium text-accent-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span>Learn More</span>
        <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="section-gradient-2 relative py-24">
      <div className="container-custom">
        <SectionHeader
          title="Services I Offer"
          subtitle="Comprehensive web development services tailored for your business needs"
        />

        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
