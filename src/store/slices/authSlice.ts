import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Auth {
  isSignedIn: boolean;
  email: string;
  uid: string;
}


const initialState: Auth = {
  isSignedIn:false,
  email: "",
  uid: ""

}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<{ email: string, isSignedIn: boolean, uid: string }>) => {
      state.email = action.payload.email;
      state.uuid =action.payload.uid;
      state.isSignedIn = action.payload.isSignedIn;

    },
    logOut: (state) => {
      state.email = "";
      state.uuid ="";
      state.isSignedIn = false;
    },
  },
});

export const { logOut, updateAuth } = authSlice.actions;
export default authSlice.reducer;