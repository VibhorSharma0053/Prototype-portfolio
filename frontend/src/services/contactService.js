import api from './api';

export const contactService = {
  /**
   * Submit contact form
   */
  submit: async (contactData) => {
    const { data } = await api.post('/contact', contactData);
    return data;
  },

  /**
   * Get all messages (admin)
   */
  getAll: async () => {
    const { data } = await api.get('/messages');
    return data;
  },

  /**
   * Delete message (admin)
   */
  delete: async (id) => {
    const { data } = await api.delete(`/messages/${id}`);
    return data;
  },
};
