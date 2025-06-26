// redux/slices/cropSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCrop } from './../api/crop';

export const uploadCrop = createAsyncThunk(
  'crop/uploadCrop',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await createCrop(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to upload crop');
    }
  }
);

const cropSlice = createSlice({
  name: 'crop',
  initialState: {
    loading: false,
    error: null,
    success: false,
    crops: [], // future use
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadCrop.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadCrop.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.crops.push(action.payload.data); // optional
      })
      .addCase(uploadCrop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default cropSlice.reducer;
