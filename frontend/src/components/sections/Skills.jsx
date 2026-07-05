import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { skillCategories } from '../../data/skills';
import SectionHeader from '../ui/SectionHeader';
import { ANIMATION_VARIANTS } from '../../utils/constants';

const SkillBar = ({ name, icon: Icon, level, inView }) => {
  return (
    <div className="group">
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-white/50 transition-colors group-hover:text-accent-400" />
          <span className="text-sm font-medium text-white/70">{name}</span>
        </div>
        <span className="text-xs text-white/40">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-24">
      <div className="container-custom">
        <SectionHeader
          title="My Skills & Technologies"
          subtitle="The tools and technologies I use to bring ideas to life"
        />

        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={ANIMATION_VARIANTS.staggerItem}
              ref={(el) => (cardRefs.current[categoryIndex] = el)}
              data-index={categoryIndex}
              className="glass-card rounded-2xl p-8"
            >
              {/* Category Header */}
              <div className="mb-5 flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="font-heading text-lg font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    inView={visibleCards.has(categoryIndex)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
