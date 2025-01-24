import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../api/users';
import { notification } from 'antd';

/**
 Función helper para mostrar notificaciones
 */ 
const showNotification = (type, message, description = '') => {
  notification[type]({
    message,
    description,
    placement: 'topRight',
    duration: 4,
  });
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, limit, searchQuery }, { rejectWithValue }) => {
    try {
      return await userApi.getUsers(page, limit, searchQuery);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userApi.createUser(userData);
      showNotification('success', 'Usuario creado', 'El usuario ha sido creado exitosamente');
      return response;
    } catch (error) {
      showNotification('error', 'Error', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await userApi.deleteUser(userId);
      showNotification('success', 'Usuario eliminado', 'El usuario ha sido eliminado exitosamente');
      return userId;
    } catch (error) {
      showNotification('error', 'Error', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    searchQuery: '',
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        showNotification('error', 'Error al cargar usuarios', action.payload);
      })
      
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = state.users.filter(user => user.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setSearchQuery, clearError } = usersSlice.actions;
export default usersSlice.reducer;