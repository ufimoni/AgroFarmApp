import { axiosInstance} from './index'

export const SignupUser = async (user) =>{
    try{
      const response = await axiosInstance.post('/api/auth/signup', user);
      return response.data
    }catch(error){
        return error;
    }
}

export const LoginUser = async (user) =>{
    try{
    const response = await axiosInstance.post('/api/auth/login', user);
    return response.data
    }catch(error){
    return error;
    }
}
export const logoutUser = async (user) =>{
    try{
     const response = await axiosInstance.post('/api/auth/login', user);
    }catch(error){
        return error;
    }
}