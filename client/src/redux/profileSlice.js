
// src/redux/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMyProfile,
  createProfile,
  getProfileByUserId,
  updateProfile,
  deleteProfile,
  uploadProfileImage,
} from '../api/profile';

export const fetchMyProfile = createAsyncThunk(
  'profile/fetchMyProfile',
  async (_, thunkAPI) => {
    try {
      const response = await getMyProfile();
      if (response.success) return response.data;
      return thunkAPI.rejectWithValue(response.message || 'Failed to fetch profile');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchSelectedProfile = createAsyncThunk(
'profile/fetchSelectedProfile',
async(userId, thunkAPI) =>{
  try{
   const response = await getProfileByUserId(userId);
   if(success.response){
    return response.data
   }
     return thunkAPI.rejectWithValue(response.message || 'Failed to fetch selected profile');
  }catch(error){
    return thunkAPI.rejectWithValue(error.message)
  }
}
)

export const saveProfile = createAsyncThunk(
  'profile/saveProfile',
  async (profileData, thunkAPI) => {
    try {
      const response = await createProfile(profileData);
      if (response.success) return response.data;
      return thunkAPI.rejectWithValue(response.message || 'Profile creation failed');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const modifyProfile = createAsyncThunk(
  'profile/modifyProfile',
  async (updates, thunkAPI) => {
    try {
      const response = await updateProfile(updates);
      if (response.success) return response.data;
      return thunkAPI.rejectWithValue(response.message || 'Profile update failed');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeProfile = createAsyncThunk(
  'profile/removeProfile',
  async (_, thunkAPI) => {
    try {
      const response = await deleteProfile();
      if (response.success) return response.data;
      return thunkAPI.rejectWithValue(response.message || 'Profile deletion failed');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const uploadImage = createAsyncThunk(
  'profile/uploadImage',
  async (formData, thunkAPI) => {
    try {
      const response = await uploadProfileImage(formData);
      if (response.success) return response.data;
      return thunkAPI.rejectWithValue(response.message || 'Image upload failed');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
    clearSelectedProfile: (state) => {
    state.selectedProfile = null;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(modifyProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchSelectedProfile.pending, (state) => {
           state.loading = true;
           state.error = null;
      })
      .addCase(fetchSelectedProfile.fulfilled, (state, action) =>{
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchSelectedProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeProfile.fulfilled, (state) => {
        state.profile = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;

