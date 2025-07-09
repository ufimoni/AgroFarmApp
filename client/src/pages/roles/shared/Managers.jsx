import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from './../../../redux/loaderSlice';
import { useNavigate } from 'react-router-dom';
import { setRoleBasedUsers } from './../../../redux/userSlice';
import { getUserByRole } from './../../../api/user';
import toast from 'react-hot-toast';
import { setAllChats, setSelectedChat } from '../../../redux/chatSlice';
import { CreateChats } from '../../../api/chat';
import UserListPage from './userLists';

const FarmManagers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allChats = useSelector((state) => state.chat?.allChats || []);
  const currentUser = useSelector((state) => state.user.profile);
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
 const handleStartChat = async (selectedUser) => {
  console.log('handleStartChat triggered with:', selectedUser);

  if (!selectedUser) {
    toast.error('No user selected');
    return;
  }

  if (!currentUser || !currentUser._id) {
    toast.error('Current user not loaded');
    return;
  }

  const members = [currentUser._id, selectedUser._id];

  const response = await CreateChats({ members });
  console.log({ members });
  console.log('Chat creation response:', response);

  if (response.success && response.data) {
    const chatData = {
      ...response.data,
      chatId: response.data._id, // ✅ Explicitly attach chatId
    };

    // Prevent duplicate chat entries
    const alreadyExists = allChats.some((chat) => chat._id === chatData._id);
    if (!alreadyExists) {
      dispatch(setAllChats([...allChats, chatData]));
    }

    // Store selected chat in Redux
    dispatch(setSelectedChat(chatData));

    toast.success('Chat started! Redirecting...');


    

    let chatPath = '';
    switch (currentUser.role) {
      case 'farm-manager':
        chatPath = '/manager/chat';
        break;
      case 'farmer':
        chatPath = '/farmer/chat';
        break;
      case 'agro-expert':
        chatPath = '/expert/chat';
        break;
      default:
        toast.error('Unknown role');
        return;
    }

    console.log('🔁 Navigating to:', chatPath, 'with chatId:', chatData.chatId);

    navigate(chatPath, {
      state: {
        chat: chatData,
        selectedUser,
      },
    });
  } else {
    toast.error('Could not create chat');
  }
};
 

  const handleViewProfile = (user) => {
    navigate(`/uniqueprofile/${user._id}`);
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

export default FarmManagers;
