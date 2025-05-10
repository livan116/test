import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  isConnected: false,
  peerId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setPeerId: (state, action) => {
      state.peerId = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.peerId = null;
    },
  },
});

export const { addMessage, setConnected, setPeerId, clearChat } = chatSlice.actions;
export default chatSlice.reducer;