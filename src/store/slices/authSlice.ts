import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Auth {
  isSignedIn: boolean;
  email: string; // Optional email field
}


const initialState: Auth = {
  isSignedIn:false,
  email: ""
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<{ email: string, isSignedIn: boolean }>) => {
      state.email = action.payload.email;
      state.isSignedIn = action.payload.isSignedIn;
    },
    logOut: (state) => {
      state.email = "";
      state.isSignedIn = false;
    },
  },
});

export const { logOut, updateAuth } = authSlice.actions;
export default authSlice.reducer;