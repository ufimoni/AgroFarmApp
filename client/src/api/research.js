import { axiosInstance } from './index';

export const postArticle = async (data)=>{
    try{
   const response = await axiosInstance.post('/api/research/add-articles', data);
    }catch(error){
        
    }
}

export const searchArticles = async ()=>{
    try{
   const response = await axiosInstance.get('/api/research/seach articles')
    }catch(error){
        
    }
}