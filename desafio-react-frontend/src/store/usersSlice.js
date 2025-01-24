import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../api/users';

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, limit, searchQuery }) => {
    return await userApi.getUsers(page, limit, searchQuery);
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData) => {
    return await userApi.createUser(userData);
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    await userApi.deleteUser(userId);
    return userId;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export const { setCurrentPage, setSearchQuery } = usersSlice.actions;
export default usersSlice.reducer;