import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  interests: [],
  gender: '',
  genderPreference: 'any',
  isPremium: false,
  trialTimeRemaining: 180 // 3 minutes in seconds
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setInterests: (state, action) => {
      state.interests = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setGenderPreference: (state, action) => {
      state.genderPreference = action.payload;
    },
    setPremium: (state, action) => {
      state.isPremium = action.payload;
    },
    updateTrialTime: (state, action) => {
      state.trialTimeRemaining = action.payload;
    }
  }
});

export const { 
  setUser, 
  setInterests, 
  setGender, 
  setGenderPreference, 
  setPremium, 
  updateTrialTime 
} = userSlice.actions;

export default userSlice.reducer;