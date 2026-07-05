import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import { SITE_NAME } from '../utils/constants';

const ErrorPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <Helmet>
        <title>Something Went Wrong | {SITE_NAME}</title>
      </Helmet>

      {/* Decorative Blobs */}
      <div className="blob bg-red-500/20 w-96 h-96 top-1/4 left-1/4" />
      <div className="blob bg-orange-500/20 w-96 h-96 bottom-1/4 right-1/4" />

      <motion.div 
        className="text-center relative z-10 px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card max-w-lg mx-auto p-8 md:p-12 rounded-3xl relative backdrop-blur-xl border border-red-500/20">
          <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <HiOutlineExclamationTriangle className="w-10 h-10 text-red-400" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Something Went Wrong
          </h1>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            We encountered an unexpected error while trying to process your request. 
            Please try again later or return to the homepage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="px-8"
            >
              Try Again
            </Button>
            <Link to="/">
              <Button variant="gradient" className="w-full sm:w-auto px-8">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
