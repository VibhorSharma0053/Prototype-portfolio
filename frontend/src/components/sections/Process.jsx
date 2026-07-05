import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  HiOutlineChatBubbleBottomCenterText, 
  HiOutlinePaintBrush, 
  HiOutlineCodeBracket, 
  HiOutlineBugAnt, 
  HiOutlineRocketLaunch 
} from 'react-icons/hi2';
import SectionHeader from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ANIMATION_VARIANTS } from '../../utils/constants';

const processSteps = [
  {
    id: 1,
    title: 'Requirement Discussion',
    description: 'We start by understanding your business goals, target audience, and specific requirements to ensure the final product aligns perfectly with your vision.',
    icon: HiOutlineChatBubbleBottomCenterText,
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'I create stunning, modern designs tailored to your brand. You will get to review and approve the look and feel before development begins.',
    icon: HiOutlinePaintBrush,
  },
  {
    id: 3,
    title: 'Development',
    description: 'Using the latest technologies (React, FastAPI, Tailwind CSS), I build a fast, secure, and fully responsive website with clean, scalable code.',
    icon: HiOutlineCodeBracket,
  },
  {
    id: 4,
    title: 'Testing & Refinement',
    description: 'The website undergoes rigorous testing across different devices and browsers to ensure a flawless, bug-free experience for your users.',
    icon: HiOutlineBugAnt,
  },
  {
    id: 5,
    title: 'Delivery & Launch',
    description: 'Once everything is perfect, we launch the website. I also provide necessary training and ongoing support to keep your site running smoothly.',
    icon: HiOutlineRocketLaunch,
  },
];

const Process = () => {
  const containerRef = useRef(null);
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="container-custom relative z-10">
        <SectionHeader 
          title="My Development Process" 
          subtitle="From concept to launch, a streamlined approach to building your perfect website."
        />

        <div className="mt-20 relative max-w-5xl mx-auto" ref={containerRef}>
          {/* Center Line for Desktop / Left Line for Mobile */}
          <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 transform md:-translate-x-1/2 rounded-full hidden sm:block">
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <motion.div 
                  key={step.id}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={isEven ? ANIMATION_VARIANTS.slideInLeft : ANIMATION_VARIANTS.slideInRight}
                >
                  {/* Step Content */}
                  <div className={`w-full md:w-1/2 sm:pl-24 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 text-left'}`}>
                    <div className="glass-card p-10 rounded-2xl relative group ml-16 sm:ml-0">
                      <div className={`absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-white/10 hidden md:block ${isEven ? 'right-[-4rem]' : 'left-[-4rem]'}`} />
                      <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-accent-400 transition-colors">
                        <span className="text-primary-500 mr-2 opacity-50">0{step.id}.</span>
                        {step.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed text-left md:text-inherit">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-10 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center hidden sm:flex">
                    <div className="w-16 h-16 rounded-full bg-surface-800 border-4 border-surface-800 z-10 flex items-center justify-center relative shadow-xl">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 opacity-20 blur-sm" />
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white relative z-10">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Empty spacer for grid alignment */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
