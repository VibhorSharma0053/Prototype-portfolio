import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { prototypeService } from '../services/prototypeService';
import Button from '../components/ui/Button';
import { validatePrototypeForm } from '../utils/validators';
import { CATEGORIES, SITE_NAME } from '../utils/constants';

// A simple mock of an Image Uploader since the component builder might not have finished it
// In a real app, this would use the real ImageUploader component
const SimpleImageInput = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-white/70 mb-2">{label}</label>
    <input 
      type="text" 
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-400"
      placeholder={placeholder || "Enter image URL or path"}
    />
    {value && (
      <div className="mt-2 w-32 h-20 rounded bg-white/10 overflow-hidden">
        <img src={value} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
      </div>
    )}
  </div>
);

const AdminPrototypeFormPage = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    businessName: '',
    category: '',
    description: '',
    technologies: '',
    tags: '',
    previewURL: '',
    githubURL: '',
    liveURL: '',
    featured: false,
    status: 'draft',
    thumbnail: '',
    gallery: [] // simplified as just keeping whatever we had or empty
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchPrototype();
    }
  }, [id]);

  const fetchPrototype = async () => {
    try {
      // In a real app, we'd fetch by ID. The API has getBySlug. Let's assume we can fetch by slug for now.
      // If our API doesn't support getById directly, this might fail, but let's implement the standard pattern.
      // We will actually just fetch all and find the one with matching ID since the backend get by ID is PUT/DELETE only right now.
      const res = await prototypeService.getAll({ limit: 100 });
      const item = res.data?.find(p => (p.id === id || p._id === id));
      
      if (item) {
        setFormData({
          title: item.title || '',
          businessName: item.businessName || '',
          category: item.category || '',
          description: item.description || '',
          technologies: item.technologies ? item.technologies.join(', ') : '',
          tags: item.tags ? item.tags.join(', ') : '',
          previewURL: item.previewURL || '',
          githubURL: item.githubURL || '',
          liveURL: item.liveURL || '',
          featured: item.featured || false,
          status: item.status || 'draft',
          thumbnail: item.thumbnail || '',
          gallery: item.gallery || []
        });
      } else {
        toast.error('Prototype not found');
        navigate('/admin/prototypes');
      }
    } catch (error) {
      toast.error('Failed to load prototype');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data (convert comma separated strings to arrays)
    const payload = {
      ...formData,
      technologies: formData.technologies ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean) : [],
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    };
    
    const { isValid, errors: validationErrors } = validatePrototypeForm(payload);
    
    if (!isValid) {
      setErrors(validationErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing) {
        await prototypeService.update(id, payload);
        toast.success('Prototype updated successfully');
      } else {
        await prototypeService.create(payload);
        toast.success('Prototype created successfully');
      }
      navigate('/admin/prototypes');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save prototype');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-white/50 py-12 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Helmet>
        <title>{isEditing ? 'Edit' : 'Add'} Prototype | Admin | {SITE_NAME}</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">
          {isEditing ? 'Edit Prototype' : 'Add New Prototype'}
        </h1>
        <p className="text-white/60">Fill in the details for your portfolio item.</p>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4 border-b border-white/10 pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Title *</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.title ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-400`}
                />
                {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Business Name *</label>
                <input 
                  type="text" 
                  name="businessName" 
                  value={formData.businessName}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.businessName ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-400`}
                />
                {errors.businessName && <p className="mt-1 text-xs text-red-400">{errors.businessName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Category *</label>
                <select 
                  name="category" 
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full bg-[#1e2330] border ${errors.category ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-400`}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category}</p>}
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-white/70 mb-2">Description *</label>
              <textarea 
                name="description" 
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className={`w-full bg-white/5 border ${errors.description ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-400`}
              />
              {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4 border-b border-white/10 pb-2">Technical Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Technologies (comma separated)</label>
                <input 
                  type="text" 
                  name="technologies" 
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Tailwind, FastAPI..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Tags (comma separated)</label>
                <input 
                  type="text" 
                  name="tags" 
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="modern, dark mode, animation..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-400"
                />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4 border-b border-white/10 pb-2">Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Preview URL</label>
                <input 
                  type="url" 
                  name="previewURL" 
                  value={formData.previewURL}
                  onChange={handleChange}
                  placeholder="https://preview.example.com"
                  className={`w-full bg-white/5 border ${errors.previewURL ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-400`}
                />
                {errors.previewURL && <p className="mt-1 text-xs text-red-400">{errors.previewURL}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Live URL</label>
                <input 
                  type="url" 
                  name="liveURL" 
                  value={formData.liveURL}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className={`w-full bg-white/5 border ${errors.liveURL ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-400`}
                />
                {errors.liveURL && <p className="mt-1 text-xs text-red-400">{errors.liveURL}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">GitHub URL</label>
                <input 
                  type="url" 
                  name="githubURL" 
                  value={formData.githubURL}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className={`w-full bg-white/5 border ${errors.githubURL ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-400`}
                />
                {errors.githubURL && <p className="mt-1 text-xs text-red-400">{errors.githubURL}</p>}
              </div>
            </div>
          </div>

          {/* Media - simplified for now */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4 border-b border-white/10 pb-2">Media</h3>
            <SimpleImageInput 
              label="Thumbnail URL" 
              value={formData.thumbnail}
              onChange={(val) => setFormData(prev => ({ ...prev, thumbnail: val }))}
              placeholder="/uploads/thumbnails/example.jpg or https://..."
            />
          </div>

          {/* Settings */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4 border-b border-white/10 pb-2">Publishing</h3>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="featured" 
                  name="featured" 
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded bg-white/5 border-white/10 text-accent-500 focus:ring-accent-500 focus:ring-offset-surface-900"
                />
                <label htmlFor="featured" className="text-sm font-medium text-white cursor-pointer">
                  Featured (Show on homepage)
                </label>
              </div>
              
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-white">Status:</label>
                <select 
                  name="status" 
                  value={formData.status}
                  onChange={handleChange}
                  className="bg-[#1e2330] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-accent-400 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => navigate('/admin/prototypes')}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="gradient"
              loading={isSaving}
              disabled={isSaving}
            >
              {isEditing ? 'Save Changes' : 'Create Prototype'}
            </Button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AdminPrototypeFormPage;
