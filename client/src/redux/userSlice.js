import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,       // Will hold the full user object
    role: null,          // User's role string
    allUsers: [],
    roleBasedUsers: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;          // full user object
      state.role = action.payload?.role || null;
    },
    clearUser: (state) => {
      state.profile = null;
      state.role = null;
      state.allUsers = [];
      state.roleBasedUsers = [];
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setRoleBasedUsers: (state, action) => {
      state.roleBasedUsers = action.payload;
    },
  },
});

export const { setUser, clearUser, setAllUsers, setRoleBasedUsers } = userSlice.actions;
export default userSlice.reducer;
