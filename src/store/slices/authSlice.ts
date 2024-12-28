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
    updateAuth: (state, action: PayloadAction<{ email: string, isSignedIn: boolean, uuid: string }>) => {
      state.authEmail = action.payload.email;
      state.authUUID =action.payload.uuid;
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