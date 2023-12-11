import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Streak, Streaks, StreakFormInput, StreakStatus } from '../../shared/interfaces/streak.interface';
import uuid from 'react-native-uuid';
import { isValidISOtimestamp } from '../../shared/utils/isISOtimestamp';
const initialState: Streaks = [];


export const streaksSlice = createSlice({
  name: 'streaks',
  initialState,
  reducers: {
    addNewStreak: (state, action: PayloadAction<StreakFormInput>) => { //Here we are giving the object type a type arguement
      const currentUTCTimestamp= new Date().toISOString()
      if (isValidISOtimestamp(currentUTCTimestamp)) {
      const newStreak: Streak = {
        id: uuid.v4().toString(),
        title: action.payload.title,
        count: 0,
        status: 'pending',
        time: currentUTCTimestamp,
      };
      state.push(newStreak);
    }

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
      const currentUtcTimestamp = new Date().toISOString()
      const index = state.findIndex((streak) => streak.id === action.payload)
      if (index !== -1) {
        const updatedStreak: Streak = { ...state[index], time:currentUtcTimestamp, count : state[index].count + 1 , status: 'complete' };
        state[index] = updatedStreak;
      }
    },
    retryStreak:(state, action: PayloadAction<string>) => {
      const currentUtcTimestamp = new Date().toISOString()
      const index = state.findIndex((streak) => streak.id === action.payload)
      if (index !== -1) {
        const updatedStreak: Streak = { ...state[index], time:currentUtcTimestamp, count : 0, status: "pending"};

        state[index] = updatedStreak;
      }
    },
    
   

  },
});

export const { addNewStreak, deleteStreak, changeStreakStatus, completeStreak, retryStreak } = streaksSlice.actions;



export default streaksSlice.reducer;
