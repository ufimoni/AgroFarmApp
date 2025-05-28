import { useEffect } from "react";
import { useSelector } from "react-redux";
import userRoleFilter from './../../../hooks/userRoleFilter.js'

import './userLists.module.scss'
import UserListPage from "./userLists";

const Farmers = () =>{
    const handleRoleClick = userRoleFilter();
    const users = useSelector(state => state.user.roleBasedUsers || []);
 useEffect(()=>{
    handleRoleClick('farmers');
 }, [handleRoleClick]);

 return (
    <div className="container mt-4">
        <h3 className="mb-4">Lists of Farmers available</h3>
   <UserListPage users={users}/>
    </div>
 )
    

}
export default Farmers;


//// This is the lists of farm managers