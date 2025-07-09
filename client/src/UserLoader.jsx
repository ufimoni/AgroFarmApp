// src/App.jsx or src/components/UserLoader.jsx (then use it inside App.jsx)

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './redux/userSlice';
import axios from 'axios';

const UserLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(clearUser());
        return;
      }

      try {
        // Use your backend endpoint that returns user info based on the token
        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.success) {
          dispatch(setUser({
            profile: response.data.user,
            role: response.data.user.role
          }));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        console.error('Error loading user:', error);
        dispatch(clearUser());
      }
    };

    loadUser();
  }, [dispatch]);

  return null; // This component just runs the effect and does not render anything
};

export default UserLoader;
