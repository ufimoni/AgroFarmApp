import { axiosInstance} from './index';

export const createFarm = async (payload) =>{
    try{
  const response = await axiosInstance.post('/api/farm/create', payload);
   return response.data;
    }catch(error){
    return error;
    }
}
export const getAllFarms = async () =>{
    try{
   const response = await axiosInstance.get('/api/farm/get-all-farms');
   return response.data;
    }catch(error){
        return error;
    }
}