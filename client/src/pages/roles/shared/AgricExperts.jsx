// src/pages/shared/FarmManagersPage.jsx
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoader, hideLoader } from './../../../redux/loaderSlice';
import { setRoleBasedUsers } from './../../../redux/userSlice';
import { getUserByRole } from './../../../api/user';
import toast from 'react-hot-toast';
import UserListPage from './userLists';

const AgricExperts= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const users = useSelector((state) => state.user.roleBasedUsers || []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(showLoader());
        const response = await getUserByRole('agro-expert');
        dispatch(hideLoader());

        if (response.success) {
          dispatch(setRoleBasedUsers(response.users));
          toast.success('Agric Experts loaded successfully');
        } else {
          toast.error('Failed to load Agricutural experts');
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
    console.log('Start chat with', user.firstname);
    // TODO: Integrate chat logic here
  };

  const handleViewProfile = (user) => {
    console.log('View profile of', user.firstname);
    // TODO: Route to profile page (to be implemented)
      navigate(`/uniqueprofile/${user._id}`);

  };

  return (
    <UserListPage 
      users={users} 
      title="Agricultural Experts"
      onStartChat={handleStartChat}
      onViewProfile={handleViewProfile}
    />
  );
};

export default AgricExperts; //// This is the lists of farm managers