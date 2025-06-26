import { axiosInstance } from './index';

export const createCrop = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/crops/create', formData, {

      withCredentials: true, // if your auth uses cookies
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Request failed' };
  }
};

export const getAllCrops = async () =>{
  try{
    const response = await axiosInstance.get('/api/crops/get-all-crops');
    
    return response.data
  }catch(error){
    return error.response?.data
  }
}
