import { axiosInstance } from './index';
//// we are creating the profile here 
////// Create profile
export const createProfile = async (profileData) => {
  try {
    const response = await axiosInstance.post('/api/profile/create', profileData);
    return response.data;
  } catch (error) {
    return error;
  }
}

// Get Logged-In User's Profile
export const getMyProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/profile/me');
    return response.data;
  } catch (error) {
    return error;
  }
};

// Get All Active Profiles 
///// This is an admin checker
export const getAllProfiles = async () => {
  try {
    const response = await axiosInstance.get('/api/profile/All-profiles');
    return response.data;
  } catch (error) {
    return error;
  }
};


export const getProfileByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/profile/Specific-profile/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Update Profile
export const updateProfile = async (userId, updates) => {
  try {
    const response = await axiosInstance.put(`/api/profile/update-profile/${userId}`, updates);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Upload Profile Image
export const uploadProfileImage = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/profile/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// Soft Delete Profile
export const deleteProfile = async (userId) => {
  try {
    const response = await axiosInstance.delete( `/api/profile/delete-profile/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
