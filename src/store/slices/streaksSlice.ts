import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Streak, Streaks, StreakFormInput, StreakStatus } from '../../shared/interfaces/streak.interface';
import uuid from 'react-native-uuid';

const initialState: Streaks = [];


export const streaksSlice = createSlice({
  name: 'streaks',
  initialState,
  reducers: {
    addNewStreak: (state, action: PayloadAction<StreakFormInput>) => { //Here we are giving the object type a type arguement
      const currentUTCTimestamp = new Date().toISOString()
      const newStreak: Streak = {
        id: uuid.v4().toString(),
        title: action.payload.title,
        count: 0,
        status: 'pending',
        time: currentUTCTimestamp,
      };
      state.push(newStreak);
    },
    deleteStreak:(state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.findIndex((streak) => streak.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    changeStreakStatus:(state, action: PayloadAction<{id: string, status: StreakStatus}>) => {
      const {status, id} = action.payload
      const index = state.findIndex((streak) => streak.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], status:status};
      }
    },
    completeStreak:(state, action: PayloadAction<string>) => {
      const currentUtcTime = new Date().toISOString()
      const index = state.findIndex((streak) => streak.id === action.payload)
      if (index !== -1) {
        const updatedStreak = { ...state[index], time:currentUtcTime, count : state[index].count + 1 , status: 'complete' };
        state[index] = updatedStreak;
      }
    },
    retryStreak:(state, action: PayloadAction<string>) => {
      const currentUtcTime = new Date().toISOString()
      const index = state.findIndex((streak) => streak.id === action.payload)
      if (index !== -1) {
        const updatedStreak = { ...state[index], time:currentUtcTime, count : 0, status: "pending"};
        state[index] = updatedStreak;
      }
    },
    
   

  },
});

export const { addNewStreak, deleteStreak, changeStreakStatus, completeStreak, retryStreak } = streaksSlice.actions;



export default streaksSlice.reducer;
