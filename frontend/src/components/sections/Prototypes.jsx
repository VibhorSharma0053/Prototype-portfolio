import { useState } from 'react';
import { motion } from 'motion/react';
import { HiOutlineArrowRight, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';
import SectionHeader from '../ui/SectionHeader';
import { ANIMATION_VARIANTS } from '../../utils/constants';
import { scrollToElement } from '../../utils/helpers';

const MOCK_PROTOTYPES = [
  {
    id: '1',
    title: 'The Urban Café',
    businessName: 'The Urban Café',
    category: 'Cafe',
    description: 'A modern, warm website for a premium urban café with online ordering, menu display, and reservation system.',
    thumbnail: null,
    technologies: ['React', 'Tailwind CSS', 'FastAPI'],
    previewURL: '#',
    liveURL: '#',
  },
  {
    id: '2',
    title: 'Spice Route Restaurant',
    businessName: 'Spice Route',
    category: 'Restaurant',
    description: 'Elegant dining website featuring an interactive menu, table reservations, and a gallery of signature dishes.',
    thumbnail: null,
    technologies: ['React', 'GSAP', 'MongoDB'],
    previewURL: '#',
    liveURL: '#',
  },
  {
    id: '3',
    title: 'FitZone Gym',
    businessName: 'FitZone Gym',
    category: 'Gym',
    description: 'High-energy fitness website with class schedules, membership plans, trainer profiles, and progress tracking.',
    thumbnail: null,
    technologies: ['React', 'Tailwind CSS', 'Node.js'],
    previewURL: '#',
    liveURL: '#',
  },
  {
    id: '4',
    title: 'Glow Beauty Salon',
    businessName: 'Glow Salon',
    category: 'Salon',
    description: 'Luxurious salon website with service catalog, online booking, stylist portfolios, and client testimonials.',
    thumbnail: null,
    technologies: ['React', 'FastAPI', 'Tailwind CSS'],
    previewURL: '#',
    liveURL: '#',
  },
  {
    id: '5',
    title: 'HealthFirst Clinic',
    businessName: 'HealthFirst',
    category: 'Clinic',
    description: 'Professional healthcare website with doctor profiles, appointment booking, patient portal, and health resources.',
    thumbnail: null,
    technologies: ['React', 'MongoDB', 'FastAPI'],
    previewURL: '#',
    liveURL: '#',
  },
  {
    id: '6',
    title: 'BrightStar Agency',
    businessName: 'BrightStar',
    category: 'Agency',
    description: 'Bold creative agency website showcasing portfolio, team members, client case studies, and service packages.',
    thumbnail: null,
    technologies: ['React', 'GSAP', 'Tailwind CSS'],
    previewURL: '#',
    liveURL: '#',
  },
];

const FILTER_CATEGORIES = ['All', 'Cafe', 'Restaurant', 'Gym', 'Salon', 'Clinic', 'Agency'];

const categoryGradients = {
  Cafe: 'from-amber-500 to-orange-500',
  Restaurant: 'from-red-500 to-rose-500',
  Gym: 'from-green-500 to-emerald-500',
  Salon: 'from-pink-500 to-fuchsia-500',
  Clinic: 'from-blue-500 to-cyan-500',
  Agency: 'from-violet-500 to-purple-500',
};

const Prototypes = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPrototypes = activeFilter === 'All'
    ? MOCK_PROTOTYPES
    : MOCK_PROTOTYPES.filter((p) => p.category === activeFilter);

  return (
    <section id="prototypes" className="relative py-24">
      <div className="container-custom">
        <SectionHeader
          title="Website Prototypes"
          subtitle="Browse interactive previews of websites I've built for various businesses"
        />

        {/* Filter Pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white shadow-lg shadow-primary-500/20'
                  : 'border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Prototypes Grid */}
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPrototypes.map((prototype) => (
            <motion.div
              key={prototype.id}
              variants={ANIMATION_VARIANTS.staggerItem}
              layout
              className="glass-card card-lift group overflow-hidden rounded-2xl"
            >
              {/* Thumbnail */}
              <div className="img-zoom-container relative h-48 overflow-hidden bg-gradient-to-br from-surface-600 to-surface-700">
                {prototype.thumbnail ? (
                  <img
                    src={prototype.thumbnail}
                    alt={prototype.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className={`rounded-xl bg-gradient-to-br ${categoryGradients[prototype.category] || 'from-primary-500 to-secondary-500'} p-4 opacity-30`}>
                      <span className="text-4xl font-bold text-white">{prototype.businessName.charAt(0)}</span>
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`rounded-full bg-gradient-to-r ${categoryGradients[prototype.category] || 'from-primary-500 to-secondary-500'} px-3 py-1 text-xs font-semibold text-white shadow-lg`}>
                    {prototype.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-2 font-heading text-lg font-semibold text-white group-hover:text-accent-400 transition-colors">
                  {prototype.businessName}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-white/50">
                  {prototype.description}
                </p>

                {/* Tech Badges */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {prototype.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button className="btn-gradient flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium">
                    View Details
                    <HiOutlineArrowRight className="h-3 w-3" />
                  </button>
                  <button className="btn-outline flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium">
                    Live Preview
                    <HiOutlineArrowTopRightOnSquare className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => scrollToElement('prototypes')}
            className="btn-outline group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base"
          >
            View All Prototypes
            <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Prototypes;
