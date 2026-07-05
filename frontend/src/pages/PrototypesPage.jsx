import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineEye,
  HiOutlineGlobeAlt,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineFolderOpen,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { prototypeService } from '../services/prototypeService';
import { useDebounce } from '../hooks/useDebounce';
import { CATEGORIES, SITE_NAME, ANIMATION_VARIANTS } from '../utils/constants';
import { truncateText, getImageUrl } from '../utils/helpers';
import { SkeletonCard } from '../components/ui/Skeleton';

const ITEMS_PER_PAGE = 9;

const PrototypesPage = () => {
  const [prototypes, setPrototypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const fetchPrototypes = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        };
        if (debouncedSearch) params.search = debouncedSearch;
        if (selectedCategory !== 'All') params.category = selectedCategory;

        const data = await prototypeService.getAll(params);
        setPrototypes(data.prototypes || data.data || data || []);
        setTotalPages(data.totalPages || Math.ceil((data.total || 0) / ITEMS_PER_PAGE) || 1);
      } catch (error) {
        console.error('Failed to fetch prototypes:', error);
        setPrototypes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrototypes();
  }, [debouncedSearch, selectedCategory, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory]);

  const displayPrototypes = useMemo(() => {
    if (Array.isArray(prototypes)) return prototypes;
    return [];
  }, [prototypes]);

  return (
    <>
      <Helmet>
        <title>All Prototypes — {SITE_NAME}</title>
        <meta
          name="description"
          content="Browse premium website prototypes designed for local businesses. Cafes, restaurants, gyms, salons, and more."
        />
        <meta property="og:title" content={`All Prototypes — ${SITE_NAME}`} />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="blob blob-blue w-96 h-96 -top-48 -right-48 animate-blob" />
          <div className="blob blob-purple w-80 h-80 top-20 -left-40 animate-blob" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-6">
            <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Prototypes</span>
          </nav>

          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
              All <span className="gradient-text">Prototypes</span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl">
              Browse through my collection of premium website prototypes designed for various local businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container-custom">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="relative max-w-lg">
              <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Search prototypes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent-400/50 focus:bg-white/8 transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    selectedCategory === cat
                      ? 'btn-gradient text-white shadow-lg shadow-primary-500/20'
                      : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/8'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Prototypes Grid */}
      <section className="pb-20">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : displayPrototypes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center">
                <HiOutlineFolderOpen className="w-12 h-12 text-white/20" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-white/70 mb-2">
                No prototypes found
              </h3>
              <p className="text-white/40">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={ANIMATION_VARIANTS.staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {displayPrototypes.map((prototype) => (
                    <motion.div
                      key={prototype._id || prototype.slug}
                      variants={ANIMATION_VARIANTS.staggerItem}
                      layout
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="glass-card rounded-2xl overflow-hidden group"
                    >
                      {/* Thumbnail */}
                      <div className="relative overflow-hidden aspect-video">
                        {prototype.thumbnail ? (
                          <img
                            src={getImageUrl(prototype.thumbnail)}
                            alt={prototype.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-900 to-secondary-900 flex items-center justify-center">
                            <HiOutlineGlobeAlt className="w-12 h-12 text-white/20" />
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-800/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {prototype.featured && (
                            <span className="px-2.5 py-1 text-xs font-semibold bg-accent-500/90 text-white rounded-full flex items-center gap-1">
                              <HiOutlineSparkles className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                          <span className="px-2.5 py-1 text-xs font-medium bg-black/50 backdrop-blur-sm text-white/90 rounded-full">
                            {prototype.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <p className="text-xs text-accent-400 font-medium mb-1">
                          {prototype.businessName}
                        </p>
                        <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-accent-300 transition-colors">
                          {prototype.title}
                        </h3>
                        <p className="text-sm text-white/40 mb-4 leading-relaxed">
                          {truncateText(prototype.description || '', 100)}
                        </p>

                        {/* Tech Stack */}
                        {prototype.technologies && prototype.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {prototype.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 text-xs bg-white/5 border border-white/8 rounded-md text-white/50"
                              >
                                {tech}
                              </span>
                            ))}
                            {prototype.technologies.length > 4 && (
                              <span className="px-2 py-0.5 text-xs text-white/30">
                                +{prototype.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Link
                            to={`/prototypes/${prototype.slug}`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 btn-gradient rounded-xl text-sm font-semibold"
                          >
                            <HiOutlineEye className="w-4 h-4" />
                            View Details
                          </Link>
                          {prototype.liveURL && (
                            <a
                              href={prototype.liveURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center px-4 py-2.5 btn-outline rounded-xl text-sm"
                            >
                              <HiOutlineArrowTopRightOnSquare className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-5 py-2.5 btn-outline rounded-xl text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <HiOutlineChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`
                          w-10 h-10 rounded-xl text-sm font-medium transition-all duration-300
                          ${
                            currentPage === page
                              ? 'btn-gradient text-white'
                              : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                          }
                        `}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-5 py-2.5 btn-outline rounded-xl text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next
                    <HiOutlineChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PrototypesPage;
