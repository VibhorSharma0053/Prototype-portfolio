import { motion } from 'motion/react';
import { ANIMATION_VARIANTS } from '../../utils/constants';

const SectionHeader = ({ title, subtitle, centered = true }) => {
  return (
    <motion.div
      variants={ANIMATION_VARIANTS.fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`mb-24 ${centered ? 'text-center' : 'text-left'}`}
    >
      {/* Accent line */}
      <div className={`mb-4 ${centered ? 'flex justify-center' : ''}`}>
        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
      </div>

      {/* Title */}
      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
