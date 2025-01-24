import axios from 'axios';

const API_URL = 'http://localhost:9000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 obtiene una lista de todos los usuarios
*/
export const userApi = {
  getUsers: async (page = 1, limit = 10, searchQuery = '') => {
    try {
      const params = new URLSearchParams({
        _page: page,
        _limit: limit,
        ...(searchQuery && { q: searchQuery }),
      });
      
      const response = await api.get(`/api/users?${params}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Error al obtener usuarios: ${error.response.data.message || 'Error del servidor'}`);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error(`Error de conexión: ${error.message}`);
      }
    }
  },

  /**
   Crea un usuario
  */
  createUser: async (userData) => {
    try {
      const response = await api.post('/api/users', userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Error al crear usuario: ${error.response.data.message || 'Error del servidor'}`);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error(`Error de conexión: ${error.message}`);
      }
    }
  },

  /**
   Elimina un usuario
  */
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Error al eliminar usuario: ${error.response.data.message || 'Error del servidor'}`);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error(`Error de conexión: ${error.message}`);
      }
    }
  },
};