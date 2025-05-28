// src/pages/shared/FarmManagersPage.jsx
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from './../../../redux/loaderSlice';
import { setRoleBasedUsers } from './../../../redux/userSlice';
import { getUserByRole } from './../../../api/user';
import toast from 'react-hot-toast';
import UserListPage from './userLists';

const AgroExperts = () => {
  const dispatch = useDispatch();
const users = useSelector((state) => state.user.roleBasedUsers || []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(showLoader());
        const response = await getUserByRole('farm-manager');
        dispatch(hideLoader());

        if (response.success) {
          dispatch(setRoleBasedUsers(response.users));
          toast.success('Farm Managers loaded successfully');
        } else {
          toast.error('Failed to load Farm Managers');
        }
      } catch (error) {
        dispatch(hideLoader());
        toast.error(error.message || 'Error loading Farm Managers');
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
    console.log('View profile of', user.name);
    // TODO: Route to profile page (to be implemented)
  };

  return (
    <UserListPage 
      users={users} 
      title="Farm Managers"
      onStartChat={handleStartChat}
      onViewProfile={handleViewProfile}
    />
  );
};

export default AgroExperts;
//// This is the lists of farm managers