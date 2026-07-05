import { motion, AnimatePresence } from 'motion/react';

const LoadingScreen = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-surface-900 via-surface-800 to-primary-950"
        >
          {/* Background blobs */}
          <div className="blob blob-blue absolute top-1/4 left-1/4 h-72 w-72 animate-blob" />
          <div className="blob blob-purple absolute right-1/4 bottom-1/4 h-64 w-64 animate-blob" style={{ animationDelay: '2s' }} />

          {/* VS Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative mb-8"
          >
            <div className="animate-pulse-glow flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500">
              <span className="font-heading text-4xl font-bold text-white">VS</span>
            </div>
          </motion.div>

          {/* Loading dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2.5 w-2.5 rounded-full bg-accent-400"
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 font-body text-sm tracking-widest text-white/40 uppercase"
          >
            Loading Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
