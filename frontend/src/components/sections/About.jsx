import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  HiOutlineRocketLaunch,
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineCpuChip,
} from 'react-icons/hi2';
import SectionHeader from '../ui/SectionHeader';
import { ANIMATION_VARIANTS } from '../../utils/constants';

const stats = [
  { icon: HiOutlineBriefcase, value: 50, suffix: '+', label: 'Projects Completed', color: 'text-primary-400' },
  { icon: HiOutlineUsers, value: 30, suffix: '+', label: 'Happy Clients', color: 'text-secondary-400' },
  { icon: HiOutlineRocketLaunch, value: 3, suffix: '+', label: 'Years Experience', color: 'text-accent-400' },
  { icon: HiOutlineCpuChip, value: 15, suffix: '+', label: 'Technologies', color: 'text-primary-300' },
];

const useCountUp = (target, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, shouldStart]);

  return count;
};

const StatCard = ({ icon: Icon, value, suffix, label, color, inView }) => {
  const count = useCountUp(value, 2000, inView);

  return (
    <motion.div
      variants={ANIMATION_VARIANTS.staggerItem}
      className="glass-card flex flex-col items-center rounded-2xl p-6 text-center"
    >
      <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <span className="font-heading text-3xl font-bold text-white">
        {count}
        {suffix}
      </span>
      <span className="mt-1 text-sm text-white/50">{label}</span>
    </motion.div>
  );
};

const About = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-gradient-1 relative py-24" ref={sectionRef}>
      <div className="container-custom">
        <SectionHeader
          title="About Me"
          subtitle="Get to know the developer behind the designs"
        />

        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text Content */}
          <motion.div
            variants={ANIMATION_VARIANTS.slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-heading text-2xl font-semibold text-white">
              Hi, I&apos;m{' '}
              <span className="gradient-text">Vibhor Sharma</span>
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-white/60">
              <p>
                I&apos;m a passionate full-stack web developer and freelancer based in India,
                specializing in creating premium websites for local businesses. I combine clean code
                with stunning design to build digital experiences that convert visitors into customers.
              </p>
              <p>
                With expertise in React, FastAPI, and MongoDB, I craft responsive, high-performance
                web applications from the ground up. Whether it&apos;s a sleek cafe website, a dynamic
                restaurant platform, or a professional business portal, I deliver solutions that
                look amazing and work flawlessly.
              </p>
              <p>
                My approach is simple: understand the business, design with purpose, develop with
                precision, and deliver results that exceed expectations. Every pixel is intentional,
                every interaction is smooth, and every website is built to grow your business.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['React', 'FastAPI', 'MongoDB', 'Tailwind CSS', 'UI/UX', 'Responsive'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            variants={ANIMATION_VARIANTS.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} inView={inView} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
