import { motion } from 'motion/react';
import { 
  HiOutlineBolt, 
  HiOutlineSparkles, 
  HiOutlineDevicePhoneMobile, 
  HiOutlineMagnifyingGlass, 
  HiOutlineCurrencyDollar, 
  HiOutlineChatBubbleOvalLeftEllipsis, 
  HiOutlineCodeBracket, 
  HiOutlineChartBar 
} from 'react-icons/hi2';
import SectionHeader from '../ui/SectionHeader';
import { ANIMATION_VARIANTS } from '../../utils/constants';

const benefits = [
  {
    title: 'Fast Delivery',
    description: 'Efficient workflows ensuring your website is launched on time without compromising quality.',
    icon: HiOutlineBolt,
    color: 'text-yellow-400',
  },
  {
    title: 'Modern UI/UX',
    description: 'Beautiful, premium designs with glassmorphism, smooth animations, and intuitive navigation.',
    icon: HiOutlineSparkles,
    color: 'text-purple-400',
  },
  {
    title: 'Responsive Design',
    description: 'Flawless experience across all devices—desktops, tablets, and smartphones.',
    icon: HiOutlineDevicePhoneMobile,
    color: 'text-blue-400',
  },
  {
    title: 'SEO Friendly',
    description: 'Built with technical SEO best practices to help your business rank higher on Google.',
    icon: HiOutlineMagnifyingGlass,
    color: 'text-green-400',
  },
  {
    title: 'Affordable Pricing',
    description: 'Premium quality websites at competitive rates tailored for local businesses.',
    icon: HiOutlineCurrencyDollar,
    color: 'text-emerald-400',
  },
  {
    title: 'Easy Communication',
    description: 'Direct, transparent, and prompt communication throughout the entire project.',
    icon: HiOutlineChatBubbleOvalLeftEllipsis,
    color: 'text-pink-400',
  },
  {
    title: 'Clean Code',
    description: 'Maintainable, scalable, and bug-free code using industry standard practices.',
    icon: HiOutlineCodeBracket,
    color: 'text-cyan-400',
  },
  {
    title: 'Future Scalability',
    description: 'Architecture designed to grow with your business and accommodate future features.',
    icon: HiOutlineChartBar,
    color: 'text-orange-400',
  },
];

const WhyChooseMe = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-surface-900">
      {/* Decorative Blobs */}
      <div className="blob blob-purple w-96 h-96 -top-48 -left-48" />
      <div className="blob blob-cyan w-96 h-96 -bottom-48 -right-48" />

      <div className="container-custom relative z-10">
        <SectionHeader 
          title="Why Choose Me" 
          subtitle="What sets me apart and why local businesses trust me with their digital presence."
        />

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div 
                key={index}
                variants={ANIMATION_VARIANTS.staggerItem}
                className="glass-card p-10 rounded-2xl hover:glow-blue transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
