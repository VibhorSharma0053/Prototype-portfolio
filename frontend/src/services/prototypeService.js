import api from './api';

export const prototypeService = {
  /**
   * Get all prototypes with optional filtering
   */
  getAll: async (params = {}) => {
    const { data } = await api.get('/prototypes', { params });
    return data;
  },

  /**
   * Get featured prototypes
   */
  getFeatured: async () => {
    const { data } = await api.get('/prototypes/featured');
    return data;
  },

  /**
   * Get single prototype by slug
   */
  getBySlug: async (slug) => {
    const { data } = await api.get(`/prototypes/${slug}`);
    return data;
  },

  /**
   * Create new prototype (admin)
   */
  create: async (prototypeData) => {
    const { data } = await api.post('/prototypes', prototypeData);
    return data;
  },

  /**
   * Update prototype (admin)
   */
  update: async (id, prototypeData) => {
    const { data } = await api.put(`/prototypes/${id}`, prototypeData);
    return data;
  },

  /**
   * Delete prototype (admin)
   */
  delete: async (id) => {
    const { data } = await api.delete(`/prototypes/${id}`);
    return data;
  },

  /**
   * Upload image (admin)
   */
  uploadImage: async (file, type = 'thumbnail') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    const { data } = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
