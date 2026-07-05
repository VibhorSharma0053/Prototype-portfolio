import api from './api';

export const authService = {
  /**
   * Login with username and password
   */
  login: async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    return data;
  },

  /**
   * Verify current token
   */
  verify: async () => {
    const { data } = await api.get('/auth/verify');
    return data;
  },
};
