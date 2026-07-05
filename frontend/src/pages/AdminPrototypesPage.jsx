import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineMagnifyingGlass, HiOutlinePlus } from 'react-icons/hi2';
import { prototypeService } from '../services/prototypeService';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Skeleton from '../components/ui/Skeleton';
import { useDebounce } from '../hooks/useDebounce';
import { SITE_NAME } from '../utils/constants';

const AdminPrototypesPage = () => {
  const [prototypes, setPrototypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [prototypeToDelete, setPrototypeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchPrototypes();
  }, [debouncedSearch]);

  const fetchPrototypes = async () => {
    setLoading(true);
    try {
      // In a real app with proper admin endpoints, we might fetch differently
      // For now we'll use the main endpoint but we need all items
      const res = await prototypeService.getAll({ 
        q: debouncedSearch,
        limit: 100 // Get all for admin
      });
      setPrototypes(res.data || []);
    } catch (error) {
      toast.error('Failed to load prototypes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (prototype) => {
    setPrototypeToDelete(prototype);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPrototypeToDelete(null);
  };

  const handleDelete = async () => {
    if (!prototypeToDelete) return;
    
    setIsDeleting(true);
    try {
      await prototypeService.delete(prototypeToDelete.id || prototypeToDelete._id);
      toast.success('Prototype deleted successfully');
      setPrototypes(prev => prev.filter(p => (p.id || p._id) !== (prototypeToDelete.id || prototypeToDelete._id)));
      closeDeleteModal();
    } catch (error) {
      toast.error('Failed to delete prototype');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Manage Prototypes | Admin | {SITE_NAME}</title>
      </Helmet>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Prototypes</h1>
          <p className="text-white/60">Manage your portfolio items.</p>
        </div>
        
        <Link to="/admin/prototypes/new">
          <Button variant="gradient" className="flex items-center gap-2">
            <HiOutlinePlus className="w-5 h-5" />
            <span>Add New</span>
          </Button>
        </Link>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
              <HiOutlineMagnifyingGlass className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-accent-400 transition-colors"
              placeholder="Search prototypes..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5">
                <th className="py-4 px-6 text-sm font-medium text-white/50 w-16">Image</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50">Title & Business</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50">Category</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50">Status</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50">Featured</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 px-6"><Skeleton width="48px" height="48px" /></td>
                    <td className="py-4 px-6">
                      <Skeleton width="150px" height="20px" className="mb-2" />
                      <Skeleton width="100px" height="14px" />
                    </td>
                    <td className="py-4 px-6"><Skeleton width="80px" height="20px" /></td>
                    <td className="py-4 px-6"><Skeleton width="60px" height="24px" rounded="full" /></td>
                    <td className="py-4 px-6"><Skeleton width="40px" height="24px" rounded="full" /></td>
                    <td className="py-4 px-6 text-right flex justify-end gap-2 mt-4">
                      <Skeleton width="32px" height="32px" rounded="lg" />
                      <Skeleton width="32px" height="32px" rounded="lg" />
                    </td>
                  </tr>
                ))
              ) : prototypes.length > 0 ? (
                prototypes.map(prototype => {
                  const id = prototype.id || prototype._id;
                  return (
                    <tr key={id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="w-12 h-12 rounded bg-white/10 overflow-hidden">
                          {prototype.thumbnail ? (
                            <img src={prototype.thumbnail} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20">
                              No Img
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-white font-medium mb-1">{prototype.title}</p>
                        <p className="text-xs text-white/50">{prototype.businessName}</p>
                      </td>
                      <td className="py-4 px-6 text-white/70">{prototype.category}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          prototype.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/60'
                        }`}>
                          {prototype.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {prototype.featured ? (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
                            Yes
                          </span>
                        ) : (
                          <span className="text-white/30 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/admin/prototypes/edit/${id}`}>
                            <button className="p-2 rounded-lg bg-white/5 text-primary-400 hover:bg-white/10 hover:text-primary-300 transition-colors" title="Edit">
                              <HiOutlinePencilSquare className="w-5 h-5" />
                            </button>
                          </Link>
                          <button 
                            onClick={() => openDeleteModal(prototype)}
                            className="p-2 rounded-lg bg-white/5 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors" 
                            title="Delete"
                          >
                            <HiOutlineTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-white/50">
                    <p className="mb-4">No prototypes found matching your criteria.</p>
                    <Link to="/admin/prototypes/new">
                      <Button variant="outline" size="sm">Add Your First Prototype</Button>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Prototype"
        size="md"
      >
        <div className="p-6">
          <p className="text-white/80 mb-6">
            Are you sure you want to delete <strong className="text-white">"{prototypeToDelete?.title}"</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-4">
            <Button variant="ghost" onClick={closeDeleteModal} disabled={isDeleting}>
              Cancel
            </Button>
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white border-none" 
              onClick={handleDelete}
              loading={isDeleting}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminPrototypesPage;
