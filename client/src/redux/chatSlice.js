import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  farmerChats: {},
  managerChats: {},
  expertChats: {},
  allChats: [],
  selectedChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setFarmerChat(state, action) {
      const { userId, messages } = action.payload;
      state.farmerChats[userId] = messages;
    },
    setManagerChat(state, action) {
      const { userId, messages } = action.payload;
      state.managerChats[userId] = messages;
    },
    setExpertChat(state, action) {
      const { userId, messages } = action.payload;
      state.expertChats[userId] = messages;
    },
    setAllChats(state, action) {
      state.allChats = action.payload;
    },
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
  },
});

export const {
  setFarmerChat,
  setManagerChat,
  setExpertChat,
  setAllChats,
  setSelectedChat
} = chatSlice.actions;

export default chatSlice.reducer;

