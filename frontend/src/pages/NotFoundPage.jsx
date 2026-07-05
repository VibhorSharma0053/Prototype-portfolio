import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import Button from '../components/ui/Button';
import { SITE_NAME } from '../utils/constants';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <Helmet>
        <title>Page Not Found | {SITE_NAME}</title>
      </Helmet>

      {/* Decorative Blobs */}
      <div className="blob blob-purple w-96 h-96 top-1/4 left-1/4 opacity-30" />
      <div className="blob blob-cyan w-96 h-96 bottom-1/4 right-1/4 opacity-30" />

      <motion.div 
        className="text-center relative z-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-[120px] md:text-[180px] font-heading font-black leading-none bg-clip-text text-transparent bg-gradient-to-br from-primary-400 via-secondary-500 to-accent-400 drop-shadow-2xl opacity-90">
          404
        </h1>
        
        <div className="glass-card max-w-lg mx-auto p-8 md:p-10 rounded-3xl mt-[-40px] md:mt-[-60px] relative backdrop-blur-xl border-t border-white/20">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Lost in Cyberspace
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            The page you are looking for doesn't exist or has been moved. Let's get you back to the home page.
          </p>
          
          <Link to="/">
            <Button variant="gradient" size="lg" className="w-full sm:w-auto px-8">
              Return Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
