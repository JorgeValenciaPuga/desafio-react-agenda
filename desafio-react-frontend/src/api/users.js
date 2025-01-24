// API service for user operations
import axios from 'axios';

const API_URL = 'http://localhost:9000';

export const userApi = {
  // Get users with pagination and search
  getUsers: async (page = 1, limit = 10, searchQuery = '') => {
    const params = new URLSearchParams({
      _page: page,
      _limit: limit,
      ...(searchQuery && { q: searchQuery }),
    });
    
    const response = await axios.get(`${API_URL}/api/users?${params}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await axios.post(`${API_URL}/api/users`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await axios.delete(`${API_URL}/api/users/${userId}`);
    return response.data;
  },
};