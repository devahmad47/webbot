import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: null,
    signupStatus: 'idle', // or 'pending', 'succeeded', 'failed'
    signupError: null,
  },
  reducers: {
    addAdmin: (state, action) => {
      state.admin = action.payload;
    },
    // Actions related to signup process
    signupRequest: (state) => {
      state.signupStatus = 'pending';
      state.signupError = null;
    },
    signupSuccess: (state, action) => {
      state.signupStatus = 'succeeded';
      state.admin = action.payload;
    },
    signupFailure: (state, action) => {
      state.signupStatus = 'failed';
      state.signupError = action.payload;
    },
  },
});

export const { addAdmin, signupRequest, signupSuccess, signupFailure } = authSlice.actions;

export const selectAdmin = (state) => state.admin.admin;
export const selectSignupStatus = (state) => state.admin.signupStatus;
export const selectSignupError = (state) => state.admin.signupError;

export default authSlice.reducer;
