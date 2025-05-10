import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCameraOn: true,
  isMicOn: true,
  isScreenSharing: false,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    toggleCamera: (state) => {
      state.isCameraOn = !state.isCameraOn;
    },
    toggleMic: (state) => {
      state.isMicOn = !state.isMicOn;
    },
    toggleScreenShare: (state) => {
      state.isScreenSharing = !state.isScreenSharing;
    },
  },
});

export const { toggleCamera, toggleMic, toggleScreenShare } = videoSlice.actions;
export default videoSlice.reducer;