import { axiosInstance } from "./index";

export const CreateChats = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/chat/create-new-chat', payload );
    return response.data;
  } catch (error) {
    console.error('Error creating chat:', error.response?.data || error.message);
    return { success: false, message: error.message };
  }
};


export const getAllchats = async () =>{
    try{
        //// get the api from the backend
        const response = await axiosInstance.get('/api/chat/get-all-chats')
        return response.data
    }catch(error){

        console.log(error);
        return error;
    }
}
//// memeber is from the backend


// api/chat.js

export const getOrCreateChatWithUser = async (receiverId) => {
  try {
    const response = await axiosInstance.get(`/api/chat/get-or-create-chat/${receiverId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting or creating chat:', error);
    return { success: false, message: error.message };
  }
};
