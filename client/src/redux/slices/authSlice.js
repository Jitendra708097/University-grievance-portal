import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';
import toast from 'react-hot-toast';

// Check localStorage for persisted user
const userFromStorage = localStorage.getItem('uni_user') 
  ? JSON.parse(localStorage.getItem('uni_user')) 
  : null;

const initialState = {
  user: userFromStorage,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// --- Thunks ---

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      // Ensure this matches your backend endpoint
      const response = await api.post('/auth/register', userData); 
      if (response.data) {
        localStorage.setItem('uni_user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/auth/login', userData);
    if (response.data) {
      localStorage.setItem('uni_user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error(error);
  }
  localStorage.removeItem('uni_user');
});

// --- Slice ---

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success(`Welcome, ${action.payload.name}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        toast.success('Logged out successfully');
      })
      builder
  .addCase(registerUser.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(registerUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.user = action.payload;
    toast.success(`Account created! Welcome, ${action.payload.name}`);
  })
  .addCase(registerUser.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    toast.error(action.payload);
  });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;