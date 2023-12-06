import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = ""

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openStreak:(state, action: PayloadAction<string>) => {
        if(action.payload === state){
          return ''
        }
        return action.payload
      },
  

  },
});

export const {openStreak} = uiSlice.actions;

export default uiSlice.reducer;
