import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch farms from backend
export const fetchFarms = createAsyncThunk(
  'farms/fetchFarms',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/farm/get-all-farms', { withCredentials: true });
      if (response.data.success) {
        return response.data.farms;
      } else {
        return thunkAPI.rejectWithValue('Failed to fetch farms');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const farmSlice = createSlice({
  name: 'farms',
  initialState: {
    farms: [],
    loading: false,
    error: null,
  },
  reducers: {
    // any other sync reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFarms.fulfilled, (state, action) => {
        state.loading = false;
        state.farms = action.payload;
      })
      .addCase(fetchFarms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load farms';
      });
  },
});

export default farmSlice.reducer;
