/**
 * Auth Slice handles all data that is specific to the user
 * account and their preferences. 
 * 
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Auth {
  isSignedIn: boolean;
  authEmail: string;
  authUUID: string;
  enableNotifications: boolean;
}

const initialState: Auth = {
  isSignedIn: false,
  authEmail: "",
  authUUID: "",
  enableNotifications: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (
      state,
      action: PayloadAction<{ authEmail: string; isSignedIn: boolean; authUUID: string ; enableNotifications: boolean}>
    ) => {
      state.authEmail = action.payload.authEmail;
      state.authUUID = action.payload.authUUID;
      state.isSignedIn = action.payload.isSignedIn;
      // state.enableNotifications = state.enableNotifications; // feature not yet implemented. 
      state.enableNotifications = false;
    },
    logOut: (state) => {
      state.authEmail = "";
      state.authUUID = "";
      state.isSignedIn = false;
      state.enableNotifications = false;
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.enableNotifications = action.payload;
    },
  },
});

export const { logOut, updateAuth, setNotifications } = authSlice.actions;
export default authSlice.reducer;
