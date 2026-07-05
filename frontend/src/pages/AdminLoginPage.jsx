import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { SITE_NAME } from '../utils/constants';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center p-4 relative overflow-hidden">
      <Helmet>
        <title>Admin Login | {SITE_NAME}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Decorative Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="blob blob-blue w-96 h-96 top-0 left-0" />
        <div className="blob blob-purple w-96 h-96 bottom-0 right-0" />
      </div>

      <motion.div 
        className="glass-card w-full max-w-md p-8 md:p-10 rounded-2xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white font-heading font-bold text-2xl mb-4 shadow-lg">
            VS
          </div>
          <h1 className="text-2xl font-heading font-bold text-white mb-2">Admin Access</h1>
          <p className="text-white/60 text-sm">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm mb-6 text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                <HiOutlineUser className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400 transition-colors"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                <HiOutlineLockClosed className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400 transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            variant="gradient" 
            className="w-full py-3"
            loading={isLoading}
            disabled={isLoading || !username || !password}
          >
            Sign In
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
