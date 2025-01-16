import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Auth {
  isSignedIn: boolean;
  authEmail: string;
  authUUID: string;
}


const initialState: Auth = {
  isSignedIn:false,
  authEmail: "",
  authUUID: ""
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<{ authEmail: string, isSignedIn: boolean, authUUID: string }>) => {
      state.authEmail = action.payload.authEmail;
      state.authUUID =action.payload.authUUID;
      state.isSignedIn = action.payload.isSignedIn;

    },
    logOut: (state) => {
      state.authEmail = "";
      state.authUUID ="";
      state.isSignedIn = false;
    },
  },
});

export const { logOut, updateAuth } = authSlice.actions;
export default authSlice.reducer;