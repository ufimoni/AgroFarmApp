import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import { setRoleBasedUsers } from "../redux/userSlice";
import { getUserByRole } from "../api/user";
import toast from 'react-hot-toast'

const userRoleFilter = () =>{
//// we dispatch this
const dispatch = useDispatch();

/// create a role click to handle the role functions
const handleRoleClick = async (role) =>{
 try{
dispatch(showLoader());
const response = await getUserByRole(role)
dispatch(hideLoader());
if(response.success){
    console.log('users with role is fetched..');
    dispatch(setRoleBasedUsers(response.data))
    toast.success(`Users with role ${role} fetched and sorted successfully`);
}else{
    toast.error(`Failed to fetch users with ${role}`);
}

 }catch(error){
  dispatch(hideLoader())
  toast.error(error.message || "Oops something went wrong while sfetching and sorting users");
 }

}; //// handle role function
  return handleRoleClick;
}
/// export the function
export default userRoleFilter;