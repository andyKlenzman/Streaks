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
      const currentUtcTime = new Date().toISOString()

      const newStreak: Streak = {
        id: uuid.v4(),
        title: action.payload.title,
        count: 0,
        status: 'pending',
        time: currentUtcTime
      };
      state.push(newStreak);
    },
    deleteStreak:(state, action: PayloadAction<string>) => {
      const index = state.findIndex((streak) => streak.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    changeStreakStatus:(state, action: PayloadAction<object>) => {
      const index = state.findIndex((streak) => streak.id === action.payload.id);
      if (index !== -1) {
        const updatedStreak = { ...state[index], status:action.payload.status};
        state[index] = updatedStreak;
      }
    },
    completeStreak:(state, action: PayloadAction<string>) => {
      const currentUtcTime = new Date().toISOString()

      const index = state.findIndex((streak) => streak.id === action.payload)
      if (index !== -1) {
        const updatedStreak = { ...state[index], time:currentUtcTime, count : state[index].count + 1  };
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

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.streaks;

export default streaksSlice.reducer;
