// src/pages/shared/FarmManagersPage.jsx
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from './../../../redux/loaderSlice';
import { setRoleBasedUsers } from './../../../redux/userSlice';
import { getUserByRole } from './../../../api/user';
import toast from 'react-hot-toast';
import UserListPage from './userLists';

const Farmers = () => {
  const dispatch = useDispatch();
const users = useSelector((state) => state.user.roleBasedUsers || []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(showLoader());
        const response = await getUserByRole('farmer');
        dispatch(hideLoader());

        if (response.success) {
          dispatch(setRoleBasedUsers(response.users));
          toast.success('Farmers loaded successfully');
        } else {
          toast.error('Failed to load Farmers');
        }
      } catch (error) {
        dispatch(hideLoader());
        toast.error(error.message || 'Error loading Farmers');
      }
    };

    fetchUsers();
  }, [dispatch]);

  // Example handlers for buttons
  const handleStartChat = (user) => {
    console.log('Start chat with', user.name);
    // TODO: Integrate chat logic here
  };

  const handleViewProfile = (user) => {
    console.log('View profile of', user.firstname);
    
    // TODO: Route to profile page (to be implemented)
   
  };

  return (
    <UserListPage 
      users={users} 
      title="Farmers"
      onStartChat={handleStartChat}
      onViewProfile={handleViewProfile}
    />
  );
};

export default Farmers;


//// This is the lists of farm managers