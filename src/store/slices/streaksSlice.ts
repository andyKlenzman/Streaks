import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Streak, Streaks } from '../../shared/interfaces/streak.interface';
import { StreakFormInput } from '../../shared/interfaces/streak.interface';
import uuid from 'react-native-uuid';


const initialState: Streaks = [
];
export const streaksSlice = createSlice({
  name: 'streaks',
  initialState,
  reducers: {
    addNewStreak: (state, action: PayloadAction<StreakFormInput>) => {
      const newTime = new Date
      console.log(typeof newTime)
      const newStreak: Streak = {
        id: uuid.v4(),
        title: action.payload.title,
        count: 0,
        status: 'pending',
        time: newTime
      };
      state.push(newStreak);
    },
    deleteStreak:(state, action: PayloadAction<string>) => {
      const index = state.findIndex((streak) => streak.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addNewStreak, deleteStreak } = streaksSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.streaks;

export default streaksSlice.reducer;
