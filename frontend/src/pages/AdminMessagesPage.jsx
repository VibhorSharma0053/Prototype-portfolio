import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { HiOutlineTrash, HiOutlineEnvelope, HiOutlinePhone, HiOutlineXMark } from 'react-icons/hi2';
import { contactService } from '../services/contactService';
import Skeleton from '../components/ui/Skeleton';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { formatDate } from '../utils/helpers';
import { SITE_NAME } from '../utils/constants';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // View Modal state
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  // Delete Modal state
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await contactService.getAll();
      setMessages(data || []);
    } catch (error) {
      toast.error('Failed to load messages');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openViewModal = (msg) => {
    setSelectedMessage(msg);
    setIsViewModalOpen(true);
    // Here we might want to mark it as read via API
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedMessage(null);
  };

  const openDeleteModal = (msg) => {
    setMessageToDelete(msg);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setMessageToDelete(null);
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;
    
    setIsDeleting(true);
    try {
      await contactService.delete(messageToDelete.id || messageToDelete._id);
      toast.success('Message deleted');
      setMessages(prev => prev.filter(m => (m.id || m._id) !== (messageToDelete.id || messageToDelete._id)));
      closeDeleteModal();
      
      // If we're deleting the currently viewed message, close that too
      if (selectedMessage && (selectedMessage.id || selectedMessage._id) === (messageToDelete.id || messageToDelete._id)) {
        closeViewModal();
      }
    } catch (error) {
      toast.error('Failed to delete message');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Messages | Admin | {SITE_NAME}</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Contact Messages</h1>
        <p className="text-white/60">View inquiries from potential clients.</p>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="py-4 px-6 text-sm font-medium text-white/50 w-1/4">Sender</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50 w-1/5">Business Type</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50 w-1/3">Message Preview</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50 w-1/6">Date</th>
                <th className="py-4 px-6 text-sm font-medium text-white/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 px-6">
                      <Skeleton width="120px" height="20px" className="mb-2" />
                      <Skeleton width="150px" height="14px" />
                    </td>
                    <td className="py-4 px-6"><Skeleton width="100px" height="20px" rounded="full" /></td>
                    <td className="py-4 px-6"><Skeleton width="100%" height="20px" /></td>
                    <td className="py-4 px-6"><Skeleton width="80px" height="20px" /></td>
                    <td className="py-4 px-6"><Skeleton width="32px" height="32px" rounded="lg" className="ml-auto" /></td>
                  </tr>
                ))
              ) : messages.length > 0 ? (
                messages.map(msg => {
                  const id = msg.id || msg._id;
                  const isRead = msg.read;
                  
                  return (
                    <tr 
                      key={id} 
                      className={`border-b border-white/5 transition-colors cursor-pointer ${isRead ? 'hover:bg-white/[0.02]' : 'bg-primary-900/10 hover:bg-primary-900/20'}`}
                      onClick={() => openViewModal(msg)}
                    >
                      <td className="py-4 px-6">
                        <p className={`text-white mb-1 ${!isRead && 'font-bold'}`}>{msg.name}</p>
                        <div className="flex items-center gap-1 text-xs text-white/50">
                          <HiOutlineEnvelope className="w-3 h-3" />
                          <span className="truncate max-w-[150px]">{msg.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {msg.businessType ? (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-white/5 text-white/70">
                            {msg.businessType}
                          </span>
                        ) : (
                          <span className="text-white/30 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-white/70">
                        <p className="truncate max-w-[300px]">{msg.message}</p>
                      </td>
                      <td className="py-4 px-6 text-sm text-white/50">
                        {formatDate(msg.createdAt)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={(e) => { e.stopPropagation(); openDeleteModal(msg); }}
                          className="p-2 rounded-lg bg-transparent text-white/40 hover:bg-red-500/20 hover:text-red-300 transition-colors" 
                          title="Delete"
                        >
                          <HiOutlineTrash className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-white/50">
                    No messages yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Message Modal */}
      {selectedMessage && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
          title="Message Details"
          size="lg"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 mb-6 pb-6 border-b border-white/10">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white/50 mb-1">From</h4>
                <p className="text-lg font-bold text-white">{selectedMessage.name}</p>
                <div className="mt-2 space-y-1">
                  <a href={`mailto:${selectedMessage.email}`} className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300">
                    <HiOutlineEnvelope className="w-4 h-4" /> {selectedMessage.email}
                  </a>
                  {selectedMessage.phone && (
                    <a href={`tel:${selectedMessage.phone}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
                      <HiOutlinePhone className="w-4 h-4" /> {selectedMessage.phone}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white/50 mb-1">Details</h4>
                <div className="space-y-2 mt-2">
                  <p className="text-sm text-white/80">
                    <span className="text-white/40 inline-block w-24">Received:</span> 
                    {formatDate(selectedMessage.createdAt)}
                  </p>
                  <p className="text-sm text-white/80">
                    <span className="text-white/40 inline-block w-24">Business:</span> 
                    {selectedMessage.businessType || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-white/50 mb-3">Message</h4>
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <button 
                onClick={() => openDeleteModal(selectedMessage)}
                className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
              >
                <HiOutlineTrash className="w-4 h-4" /> Delete Message
              </button>
              
              <Button onClick={closeViewModal} variant="outline" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Message"
        size="md"
      >
        <div className="p-6">
          <p className="text-white/80 mb-6">
            Are you sure you want to delete the message from <strong className="text-white">{messageToDelete?.name}</strong>? 
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

export default AdminMessagesPage;
