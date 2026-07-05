import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { 
  HiOutlineDocumentText, 
  HiOutlineChatBubbleLeftEllipsis, 
  HiOutlineStar, 
  HiOutlineEye 
} from 'react-icons/hi2';
import { prototypeService } from '../services/prototypeService';
import { contactService } from '../services/contactService';
import Skeleton from '../components/ui/Skeleton';
import { SITE_NAME } from '../utils/constants';

const StatCard = ({ title, value, icon: Icon, colorClass, loading }) => (
  <div className="glass-card p-6 rounded-2xl border border-white/10">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-white/60 font-medium">{title}</h3>
      <div className={`p-2 rounded-lg ${colorClass} bg-opacity-20`}>
        <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
    <div>
      {loading ? (
        <Skeleton width="60px" height="36px" className="mb-1" />
      ) : (
        <span className="text-3xl font-heading font-bold text-white">{value}</span>
      )}
    </div>
  </div>
);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalPrototypes: 0,
    published: 0,
    featured: 0,
    totalMessages: 0
  });
  const [recentPrototypes, setRecentPrototypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [prototypesRes, messagesRes] = await Promise.all([
          prototypeService.getAll({ limit: 5 }), // Just get latest 5 to calculate basic stats
          contactService.getAll()
        ]);

        // In a real app, the API should return these aggregated stats
        // This is a simplified version using whatever we get back
        setStats({
          totalPrototypes: prototypesRes.total || prototypesRes.data?.length || 0,
          published: prototypesRes.data?.filter(p => p.status === 'published').length || 0,
          featured: prototypesRes.data?.filter(p => p.featured).length || 0,
          totalMessages: messagesRes.length || 0
        });

        setRecentPrototypes(prototypesRes.data?.slice(0, 5) || []);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Dashboard | Admin | {SITE_NAME}</title>
      </Helmet>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-white/60">Welcome back to your portfolio admin panel.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/admin/prototypes/new" 
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Add Prototype
          </Link>
          <Link 
            to="/admin/messages" 
            className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
          >
            View Messages
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Prototypes" 
          value={stats.totalPrototypes} 
          icon={HiOutlineDocumentText} 
          colorClass="bg-blue-500 text-blue-400"
          loading={loading}
        />
        <StatCard 
          title="Published" 
          value={stats.published} 
          icon={HiOutlineEye} 
          colorClass="bg-emerald-500 text-emerald-400"
          loading={loading}
        />
        <StatCard 
          title="Featured" 
          value={stats.featured} 
          icon={HiOutlineStar} 
          colorClass="bg-amber-500 text-amber-400"
          loading={loading}
        />
        <StatCard 
          title="Messages" 
          value={stats.totalMessages} 
          icon={HiOutlineChatBubbleLeftEllipsis} 
          colorClass="bg-purple-500 text-purple-400"
          loading={loading}
        />
      </div>

      {/* Recent Prototypes */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-xl font-heading font-semibold text-white">Recent Prototypes</h2>
          <Link to="/admin/prototypes" className="text-sm text-accent-400 hover:text-accent-300">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="py-4 px-6 text-sm font-medium text-white/50">Prototype</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50">Category</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50">Status</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 px-6"><Skeleton width="150px" height="20px" /></td>
                    <td className="py-4 px-6"><Skeleton width="80px" height="20px" /></td>
                    <td className="py-4 px-6"><Skeleton width="60px" height="20px" rounded="full" /></td>
                    <td className="py-4 px-6 text-right"><Skeleton width="40px" height="20px" className="ml-auto" /></td>
                  </tr>
                ))
              ) : recentPrototypes.length > 0 ? (
                recentPrototypes.map(prototype => (
                  <tr key={prototype.id || prototype._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-white/10 overflow-hidden flex-shrink-0">
                          {prototype.thumbnail ? (
                            <img src={prototype.thumbnail} alt={prototype.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20">
                              <HiOutlineDocumentText />
                            </div>
                          )}
                        </div>
                        <span className="text-white font-medium truncate max-w-[200px]">{prototype.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white/70">{prototype.category}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        prototype.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/60'
                      }`}>
                        {prototype.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link 
                        to={`/admin/prototypes/edit/${prototype.id || prototype._id}`}
                        className="text-sm text-primary-400 hover:text-primary-300 font-medium"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-white/50">
                    No prototypes found. Start by creating one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
