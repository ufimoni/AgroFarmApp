import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedUser, getAllUsers } from './../api/user.js' // since it is in js not jsx
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from "./../redux/loaderSlice.js";
import toast from 'react-hot-toast';
import { setUser,setAllUsers } from './../redux/userSlice.js';


function ProtecedRoute({ children }){
 const navigate = useNavigate();
 const dispatch = useDispatch();

  const getLoginUser = async () =>{
    let response = null;
   try{
      dispatch(showLoader());
      console.log("Fetching logged-in user...");
      response = await getLoggedUser();
      console.log("Response from getLoggedUser:", response);
      dispatch(hideLoader());
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        toast.error(response.message);
        navigate('/login');
      }
   }catch(error){
     console.log("Error to fetch User..");
     toast.error(error.message);
     navigate('/login')
   }

  }
  const GetallUsers = async () =>{
    let response = null;
    try{
      dispatch(showLoader())
     console.log("Fetching logged-in user...");
      response = await getAllUsers();
      console.log("Response from getLoggedUser:", response);
      dispatch(hideLoader());
      if(response.success){
        toast.success(response.message);
        dispatch(setAllUsers(response.data));
      }
      else{
        toast.error(response.message);
        navigate('/login')
      }
    }catch(error){
     dispatch(hideLoader())
     console.log("Error fetchng get all users:", error);
      toast.error(error.message);
      navigate('/login');
    }
  }


 useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token in localStorage:", token);
    if (token) {
      getLoginUser();
      GetallUsers();
    } else {
      navigate('/login');
    }
  }, [navigate]);

/// return a div
    return(
        <div>
            {children}
        </div>
    )
}
export default ProtecedRoute;