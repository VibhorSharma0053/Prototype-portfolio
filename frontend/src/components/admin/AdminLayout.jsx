import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import {
  HiOutlineSquares2X2,
  HiOutlineCube,
  HiOutlinePlusCircle,
  HiOutlineEnvelope,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3,
  HiXMark,
  HiOutlineChevronLeft,
} from 'react-icons/hi2';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: HiOutlineSquares2X2 },
  { name: 'Prototypes', href: '/admin/prototypes', icon: HiOutlineCube },
  { name: 'Add New', href: '/admin/prototypes/new', icon: HiOutlinePlusCircle },
  { name: 'Messages', href: '/admin/messages', icon: HiOutlineEnvelope },
];

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href) => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/8">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center text-white font-heading font-bold text-lg">
            VS
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-sm">Admin Panel</h2>
            <p className="text-xs text-white/40">{user?.username || 'Admin'}</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-300 group
                ${
                  active
                    ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white border border-white/10'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                  active ? 'text-accent-400' : 'text-white/40 group-hover:text-white/70'
                }`}
              />
              <span>{item.name}</span>
              {active && (
                <motion.div
                  layoutId="admin-active"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-400"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/8 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          <HiOutlineChevronLeft className="w-5 h-5" />
          <span>Back to Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full"
        >
          <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-800 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 fixed inset-y-0 left-0 z-40">
        <div className="w-full glass-card border-r border-white/8 rounded-none">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden"
            >
              <div className="w-full h-full glass-card border-r border-white/8 rounded-none bg-surface-800">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 glass border-b border-white/8 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <HiOutlineBars3 className="w-6 h-6" />
          </button>
          <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center text-white font-heading font-bold text-sm">
            VS
          </div>
          <span className="font-heading font-semibold text-white text-sm">Admin</span>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
