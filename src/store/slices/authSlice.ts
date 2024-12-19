import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Auth {
  isSignedIn: boolean;
  email: string;
  uuid: string;
}


const initialState: Auth = {
  isSignedIn:false,
  email: "",
  uuid: ""

}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<{ email: string, isSignedIn: boolean, uuid: string }>) => {
      state.email = action.payload.email;
      state.uuid =action.payload.uuid;
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