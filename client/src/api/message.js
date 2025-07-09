import {axiosInstance} from './index';
export const createNewMessage = async ( message ) =>{
    try{
        //// get the api from the backend
        const response = await axiosInstance.post('/api/message/new-message', message) /// where the member object is an array.
        return response.data
    }catch(error){
        console.log(error);
        return error;
    }
}

export const getAllMessage = async ( chatId ) =>{
    try{
        //// get the api from the backend
        const response = await axiosInstance.get(`/api/message/get-All-Messages/${chatId}`) /// where the member object is an array.
        return response.data
    }catch(error){
        console.log(error);
        return error;
    }
}

export const fetchChatsByRole = async (role) => {
  try {
    const response = await axiosInstance.get(`/api/chat/chats-by-role/${role}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};