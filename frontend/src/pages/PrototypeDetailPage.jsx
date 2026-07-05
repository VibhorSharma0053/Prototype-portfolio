import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import {
  HiOutlineGlobeAlt,
  HiOutlineCodeBracket,
  HiOutlineCalendarDays,
  HiOutlineTag,
  HiOutlineDevicePhoneMobile,
  HiOutlineDeviceTablet,
  HiOutlineComputerDesktop,
  HiOutlineArrowsPointingOut,
  HiOutlineChevronRight,
  HiOutlineCheckCircle,
  HiOutlineLightBulb,
  HiOutlineSparkles,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineChatBubbleLeftRight,
  HiOutlineXMark,
  HiOutlineBuildingStorefront,
} from 'react-icons/hi2';
import { prototypeService } from '../services/prototypeService';
import { SITE_NAME, ANIMATION_VARIANTS } from '../utils/constants';
import { formatDate, getImageUrl } from '../utils/helpers';
import Skeleton, { SkeletonText } from '../components/ui/Skeleton';
import Modal from '../components/ui/Modal';

const PrototypeDetailPage = () => {
  const { slug } = useParams();
  const [prototype, setPrototype] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [previewSize, setPreviewSize] = useState('desktop');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchPrototype = async () => {
      setLoading(true);
      try {
        const data = await prototypeService.getBySlug(slug);
        setPrototype(data.prototype || data.data || data);
      } catch (error) {
        console.error('Failed to fetch prototype:', error);
        if (error.response?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrototype();
    window.scrollTo(0, 0);
  }, [slug]);

  const previewSizes = [
    { key: 'desktop', label: 'Desktop', icon: HiOutlineComputerDesktop },
    { key: 'tablet', label: 'Tablet', icon: HiOutlineDeviceTablet },
    { key: 'mobile', label: 'Mobile', icon: HiOutlineDevicePhoneMobile },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container-custom">
          <div className="mb-6">
            <Skeleton height="16px" width="200px" />
          </div>
          <Skeleton height="400px" rounded="rounded-2xl" className="mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton height="36px" width="70%" />
              <SkeletonText lines={5} />
              <Skeleton height="200px" rounded="rounded-xl" />
            </div>
            <div className="space-y-4">
              <Skeleton height="300px" rounded="rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !prototype) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-8xl font-heading font-black gradient-text mb-4">404</div>
          <h2 className="text-2xl font-heading font-semibold text-white mb-2">Prototype Not Found</h2>
          <p className="text-white/40 mb-8">The prototype you're looking for doesn't exist or has been removed.</p>
          <Link to="/prototypes" className="btn-gradient px-6 py-3 rounded-xl text-sm font-semibold">
            Browse Prototypes
          </Link>
        </motion.div>
      </div>
    );
  }

  const gallery = prototype.gallery || prototype.screenshots || [];
  const features = prototype.features || [];
  const challenges = prototype.challenges || [];

  return (
    <>
      <Helmet>
        <title>{prototype.title} — {SITE_NAME}</title>
        <meta name="description" content={prototype.description?.substring(0, 160)} />
        <meta property="og:title" content={`${prototype.title} — ${SITE_NAME}`} />
        <meta property="og:description" content={prototype.description?.substring(0, 160)} />
        {prototype.thumbnail && (
          <meta property="og:image" content={getImageUrl(prototype.thumbnail)} />
        )}
      </Helmet>

      {/* Hero Banner */}
      <section className="relative pt-24 pb-0 overflow-hidden">
        <div className="absolute inset-0">
          {prototype.thumbnail && (
            <img
              src={getImageUrl(prototype.thumbnail)}
              alt=""
              className="w-full h-full object-cover opacity-15 blur-sm"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-surface-800/60 via-surface-800/90 to-surface-800" />
        </div>

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
            <HiOutlineChevronRight className="w-3 h-3" />
            <Link to="/prototypes" className="hover:text-white/70 transition-colors">Prototypes</Link>
            <HiOutlineChevronRight className="w-3 h-3" />
            <span className="text-white/70">{prototype.title}</span>
          </nav>

          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            initial="hidden"
            animate="visible"
            className="pb-12"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {prototype.featured && (
                <span className="px-3 py-1 text-xs font-semibold bg-accent-500/20 text-accent-400 rounded-full flex items-center gap-1 border border-accent-500/30">
                  <HiOutlineSparkles className="w-3 h-3" />
                  Featured
                </span>
              )}
              <span className="px-3 py-1 text-xs font-medium bg-primary-500/20 text-primary-300 rounded-full border border-primary-500/30">
                {prototype.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-3">
              {prototype.title}
            </h1>

            {prototype.businessName && (
              <p className="text-lg text-accent-400 font-medium flex items-center gap-2">
                <HiOutlineBuildingStorefront className="w-5 h-5" />
                {prototype.businessName}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-heading font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full" />
                  About This Project
                </h2>
                <div className="glass-card rounded-2xl p-6">
                  <p className="text-white/60 leading-relaxed whitespace-pre-line">
                    {prototype.description}
                  </p>
                </div>
              </motion.div>

              {/* Features */}
              {features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-heading font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full" />
                    Key Features
                  </h2>
                  <div className="glass-card rounded-2xl p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                          <HiOutlineCheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white/60">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Technology Stack */}
              {prototype.technologies && prototype.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-xl font-heading font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full" />
                    Technology Stack
                  </h2>
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex flex-wrap gap-2">
                      {prototype.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 text-sm bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-white/8 rounded-xl text-white/70 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Screenshot Gallery */}
              {gallery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-xl font-heading font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full" />
                    Screenshots
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gallery.map((img, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-xl overflow-hidden cursor-pointer aspect-video bg-surface-600"
                        onClick={() => setSelectedImage(getImageUrl(img))}
                      >
                        <img
                          src={getImageUrl(img)}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Challenges & Solutions */}
              {challenges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-xl font-heading font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full" />
                    Challenges & Solutions
                  </h2>
                  <div className="space-y-4">
                    {challenges.map((item, index) => (
                      <div key={index} className="glass-card rounded-2xl p-6">
                        <div className="flex items-start gap-3 mb-3">
                          <HiOutlineLightBulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-semibold text-white mb-1">{item.challenge || item.title}</h3>
                            <p className="text-sm text-white/50">{item.solution || item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Responsive Preview */}
              {prototype.previewURL && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-heading font-semibold text-white flex items-center gap-2">
                      <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full" />
                      Live Preview
                    </h2>
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/8">
                      {previewSizes.map(({ key, label, icon: Icon }) => (
                        <button
                          key={key}
                          onClick={() => setPreviewSize(key)}
                          className={`
                            flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300
                            ${previewSize === key ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}
                          `}
                          title={label}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="hidden sm:inline">{label}</span>
                        </button>
                      ))}
                      <button
                        onClick={() => setIsFullscreen(true)}
                        className="flex items-center px-3 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 transition-colors"
                        title="Fullscreen"
                      >
                        <HiOutlineArrowsPointingOut className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className={`preview-frame ${previewSize}`}>
                      <iframe
                        src={prototype.previewURL}
                        title={`${prototype.title} Preview`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Quick Info Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card rounded-2xl p-6 space-y-5"
                >
                  <h3 className="text-sm font-heading font-semibold text-white/70 uppercase tracking-wider">
                    Project Details
                  </h3>

                  <div className="space-y-4">
                    {prototype.businessType && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/40">Business Type</span>
                        <span className="text-sm text-white/70 font-medium px-3 py-1 bg-secondary-500/10 rounded-full border border-secondary-500/20">
                          {prototype.businessType}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/40 flex items-center gap-2">
                        <HiOutlineTag className="w-4 h-4" />
                        Category
                      </span>
                      <span className="text-sm text-white/70 font-medium">{prototype.category}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/40 flex items-center gap-2">
                        <HiOutlineCalendarDays className="w-4 h-4" />
                        Date
                      </span>
                      <span className="text-sm text-white/70 font-medium">
                        {formatDate(prototype.createdAt || prototype.date || new Date())}
                      </span>
                    </div>

                    {prototype.status && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/40">Status</span>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          prototype.status === 'published'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                          {prototype.status}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Technologies in sidebar */}
                  {prototype.technologies && prototype.technologies.length > 0 && (
                    <div className="pt-4 border-t border-white/8">
                      <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wider">Tech Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {prototype.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs bg-white/5 border border-white/8 rounded-lg text-white/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  {prototype.liveURL && (
                    <a
                      href={prototype.liveURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 btn-gradient rounded-xl text-sm font-semibold"
                    >
                      <HiOutlineGlobeAlt className="w-4 h-4" />
                      View Live Site
                    </a>
                  )}

                  {prototype.githubURL && (
                    <a
                      href={prototype.githubURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 btn-outline rounded-xl text-sm font-medium"
                    >
                      <HiOutlineCodeBracket className="w-4 h-4" />
                      View Source Code
                    </a>
                  )}

                  <Link
                    to="/#contact"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-all duration-300"
                  >
                    <HiOutlineChatBubbleLeftRight className="w-4 h-4" />
                    Hire Me For Similar
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="pb-20 border-t border-white/5 pt-16">
        <div className="container-custom">
          <h2 className="text-2xl font-heading font-bold text-white mb-8">
            Related <span className="gradient-text">Projects</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-primary-900/50 to-secondary-900/50 flex items-center justify-center">
                  <HiOutlineGlobeAlt className="w-10 h-10 text-white/10" />
                </div>
                <div className="p-5">
                  <span className="text-xs text-accent-400 font-medium">Coming Soon</span>
                  <h3 className="text-base font-heading font-semibold text-white/60 mt-1">
                    More projects coming soon
                  </h3>
                  <p className="text-xs text-white/30 mt-2">Stay tuned for more exciting prototypes.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} size="xl">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Screenshot Preview"
            className="w-full rounded-lg"
          />
        )}
      </Modal>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {isFullscreen && prototype.previewURL && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              <HiOutlineXMark className="w-6 h-6" />
            </button>
            <iframe
              src={prototype.previewURL}
              title={`${prototype.title} Fullscreen Preview`}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PrototypeDetailPage;
