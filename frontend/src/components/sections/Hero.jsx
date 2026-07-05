import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SiReact, SiFastapi, SiMongodb } from 'react-icons/si';
import { HiOutlineArrowRight, HiOutlineSparkles } from 'react-icons/hi2';
import { useMousePosition } from '../../hooks/useMousePosition';
import { SITE_DESCRIPTION, ANIMATION_VARIANTS } from '../../utils/constants';
import { scrollToElement } from '../../utils/helpers';

const TYPING_ROLES = ['Full-Stack Developer', 'UI/UX Designer', 'Software Engineer', 'Freelancer'];

const Hero = () => {
  const { x, y } = useMousePosition();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingTimeout = useRef(null);

  // Typing effect
  useEffect(() => {
    const currentRole = TYPING_ROLES[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          typingTimeout.current = setTimeout(() => {
            setDisplayedText(currentRole.slice(0, displayedText.length + 1));
          }, 80);
        } else {
          typingTimeout.current = setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          typingTimeout.current = setTimeout(() => {
            setDisplayedText(displayedText.slice(0, -1));
          }, 40);
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
        }
      }
    };

    handleTyping();
    return () => clearTimeout(typingTimeout.current);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20"
    >
      {/* Background Blobs */}
      <div className="blob blob-blue absolute top-20 left-10 h-80 w-80 animate-blob" />
      <div
        className="blob blob-purple absolute right-10 bottom-20 h-96 w-96 animate-blob"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="blob blob-cyan absolute top-1/2 right-1/4 h-72 w-72 animate-blob"
        style={{ animationDelay: '4s' }}
      />

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* LEFT SIDE */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={ANIMATION_VARIANTS.staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={ANIMATION_VARIANTS.staggerItem} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <HiOutlineSparkles className="h-4 w-4 text-accent-400" />
              <span className="text-sm font-medium text-white/70">Premium Web Development</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={ANIMATION_VARIANTS.staggerItem}
              className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span className="gradient-text">Premium Websites</span>{' '}
              <span className="text-white">That Help Local Businesses</span>{' '}
              <span className="gradient-text">Grow</span>
            </motion.h1>

            {/* Typing subtitle */}
            <motion.div
              variants={ANIMATION_VARIANTS.staggerItem}
              className="mt-4 flex items-center justify-center gap-2 lg:justify-start"
            >
              <span className="text-lg text-white/50">I&apos;m a</span>
              <span className="font-heading text-xl font-semibold text-accent-400 sm:text-2xl">
                {displayedText}
                <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-accent-400" style={{ height: '1.2em' }} />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={ANIMATION_VARIANTS.staggerItem}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/50 lg:mx-0 lg:text-lg"
            >
              {SITE_DESCRIPTION}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={ANIMATION_VARIANTS.staggerItem}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <button
                onClick={() => scrollToElement('prototypes')}
                className="btn-gradient group flex items-center gap-2 rounded-xl px-8 py-4 text-base"
              >
                View Prototypes
                <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToElement('contact')}
                className="btn-outline flex items-center gap-2 rounded-xl px-8 py-4 text-base"
              >
                Hire Me
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={ANIMATION_VARIANTS.staggerItem}
              className="mt-8 flex items-center justify-center gap-6 lg:justify-start"
            >
              {[
                { value: '50+', label: 'Projects' },
                { value: '30+', label: 'Happy Clients' },
                { value: '3+', label: 'Years' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/20">•</span>}
                  <span className="font-heading text-lg font-bold text-white">{stat.value}</span>
                  <span className="text-sm text-white/40">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE — 3D Floating Cards */}
          <motion.div
            className="hidden flex-1 lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="perspective-1000 relative mx-auto h-[500px] w-full max-w-lg"
            >
              {/* Card 1: Code Snippet */}
              <motion.div
                className="glass-card preserve-3d absolute top-4 left-4 w-72 rounded-2xl p-5"
                animate={{
                  y: [0, -12, 0],
                  rotateX: y * 5,
                  rotateY: x * 5,
                }}
                transition={{
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                  rotateX: { duration: 0.3 },
                  rotateY: { duration: 0.3 },
                }}
              >
                <div className="mb-3 flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-white/30">index.jsx</span>
                </div>
                <pre className="font-mono text-xs leading-relaxed">
                  <span className="text-secondary-400">const</span>{' '}
                  <span className="text-accent-300">website</span>{' '}
                  <span className="text-white/50">=</span>{' '}
                  <span className="text-green-400">&apos;awesome&apos;</span>
                  {'\n'}
                  <span className="text-secondary-400">const</span>{' '}
                  <span className="text-accent-300">design</span>{' '}
                  <span className="text-white/50">=</span>{' '}
                  <span className="text-green-400">&apos;premium&apos;</span>
                  {'\n\n'}
                  <span className="text-secondary-400">function</span>{' '}
                  <span className="text-primary-300">buildSite</span>
                  <span className="text-white/50">()</span>{' '}
                  <span className="text-white/50">{'{'}</span>
                  {'\n'}
                  {'  '}
                  <span className="text-secondary-400">return</span>{' '}
                  <span className="text-accent-300">magic</span>
                  <span className="text-white/50">();</span>
                  {'\n'}
                  <span className="text-white/50">{'}'}</span>
                </pre>
              </motion.div>

              {/* Card 2: UI Preview */}
              <motion.div
                className="glass-card preserve-3d absolute top-32 right-0 w-64 rounded-2xl p-5"
                animate={{
                  y: [0, -10, 0],
                  rotateX: y * 3,
                  rotateY: x * 3,
                }}
                transition={{
                  y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                  rotateX: { duration: 0.3 },
                  rotateY: { duration: 0.3 },
                }}
              >
                <div className="mb-3 text-xs font-medium text-white/40">UI Preview</div>
                {/* Mini website layout */}
                <div className="space-y-2 rounded-lg border border-white/10 bg-surface-700/50 p-3">
                  <div className="h-2 w-16 rounded bg-gradient-to-r from-primary-500 to-accent-500" />
                  <div className="flex gap-2">
                    <div className="h-12 flex-1 rounded bg-white/5" />
                    <div className="h-12 flex-1 rounded bg-white/5" />
                  </div>
                  <div className="h-2 w-full rounded bg-white/5" />
                  <div className="h-2 w-3/4 rounded bg-white/5" />
                  <div className="flex gap-2 pt-1">
                    <div className="h-5 w-14 rounded bg-gradient-to-r from-primary-500 to-secondary-500" />
                    <div className="h-5 w-14 rounded border border-white/10" />
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Tech Stack */}
              <motion.div
                className="glass-card preserve-3d absolute bottom-8 left-12 w-60 rounded-2xl p-5"
                animate={{
                  y: [0, -8, 0],
                  rotateX: y * 4,
                  rotateY: x * 4,
                }}
                transition={{
                  y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 },
                  rotateX: { duration: 0.3 },
                  rotateY: { duration: 0.3 },
                }}
              >
                <div className="mb-3 text-xs font-medium text-white/40">Tech Stack</div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#61DAFB]/10">
                      <SiReact className="h-6 w-6 text-[#61DAFB]" />
                    </div>
                    <span className="text-[10px] text-white/40">React</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#009688]/10">
                      <SiFastapi className="h-6 w-6 text-[#009688]" />
                    </div>
                    <span className="text-[10px] text-white/40">FastAPI</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#47A248]/10">
                      <SiMongodb className="h-6 w-6 text-[#47A248]" />
                    </div>
                    <span className="text-[10px] text-white/40">MongoDB</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-accent-400"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
