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
      action: PayloadAction<{ authEmail: string; isSignedIn: boolean; authUUID: string }>
    ) => {
      state.authEmail = action.payload.authEmail;
      state.authUUID = action.payload.authUUID;
      state.isSignedIn = action.payload.isSignedIn;
      // state.enableNotifications = state.enableNotifications;
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
