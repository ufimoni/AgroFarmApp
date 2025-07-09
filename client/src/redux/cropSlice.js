import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCrop, getAllCrops } from './../api/crop'; // ✅ import it

// Upload a new crop
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


export const fetchAllCrops = createAsyncThunk(
  'crop/fetchAllCrops',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllCrops();
      return data.crops || [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch crops');
    }
  }
);

// Crop slice
const cropSlice = createSlice({
  name: 'crop',
  initialState: {
    loading: false,
    error: null,
    success: false,
    crops: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Upload Crop
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
      })

      // Fetch All Crops
      .addCase(fetchAllCrops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCrops.fulfilled, (state, action) => {
        state.loading = false;
        state.crops = action.payload;
      })
      .addCase(fetchAllCrops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cropSlice.reducer;
