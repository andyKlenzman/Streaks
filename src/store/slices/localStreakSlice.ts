/** This file handles the Redux actions for local streaks. Shared 
 * Streaks are handled in a seperate slice. 
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Streak, LocalStreakStatus, LocalStreaks } from '../../shared/interfaces/streak.interface';
import { AppDispatch } from '../store';
import uuid from 'react-native-uuid';


const initialState: LocalStreaks = {
  streaks: [], 
};

export const localStreakSlice = createSlice({
  name: 'localStreaks',
  initialState,
  reducers: 
  {
    createLocalStreak: (state, action: PayloadAction<Streak>) => {
      
      const newStreak: Streak = {
        streakUUID: uuid.v4(),
        creatorUUID: action.payload.creatorUUID,
        partnerUUID: "",
        title: action.payload.title,
        count: 0,
        lastTimeCompleted: new Date().toISOString(),
        status: "isReady",
        isShared: false,
      };


      state.streaks.push(newStreak);
    },

    deleteLocalStreak: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.streaks.findIndex((streak: Streak) => streak.streakUUID === id);
      if (index == -1) {
        console.error(`Streak with ID ${action.payload} not found.`); 
        return;
      }
      state.streaks.splice(index, 1);
    },

    changeLocalStreakStatusById: (state, action: PayloadAction<{ id: string; status: LocalStreakStatus }>) => {
      const { id, status } = action.payload;

      const index = state.streaks.findIndex((streak: Streak) => streak.streakUUID === id);
      if (index == -1) {
        console.error(`Streak with ID ${action.payload} not found.`); 
        return;
      }

      state.streaks[index].status = status;
    },

    incrementLocalStreakCountById: (state, action: PayloadAction<string>) => {
      const currentUtcTimestamp = new Date().toISOString();
      const index = state.streaks.findIndex((streak: Streak) => streak.streakUUID === action.payload);
      if (index == -1) {
        console.error(`Streak with ID ${action.payload} not found.`); 
        return;
      }

      const updatedStreak = {
        ...state.streaks[index],
        lastTimeCompleted: currentUtcTimestamp,
        count: state.streaks[index].count + 1,
        status: 'complete',
      };
      
      state.streaks[index] = updatedStreak;

    },

    updateLocalStreakLastTimeCompletedById: (state, action: PayloadAction<{ id: string; timestamp: string }>) => {
        const {id, timestamp } = action.payload;
        
        const index = state.streaks.findIndex((streak: Streak) => streak.streakUUID === id);
        if (index == -1) {
          console.error(`Streak with ID ${action.payload} not found.`); 
          return;
        }
                
        state.streaks[index].lastTimeCompleted = timestamp;
 


    },
  },
});



// Increments the count by one and updates lastCompletedTime to current time.
export const completeLocalStreakById = (id: string) => (dispatch: AppDispatch) => {
    const currentUtcTimestamp = new Date().toISOString();
  
    dispatch(incrementLocalStreakCountById(id));
  
    dispatch(updateLocalStreakLastTimeCompletedById({ id, timestamp: currentUtcTimestamp }));
  };


// Export actions and reducer
export const { createLocalStreak, deleteLocalStreak, changeLocalStreakStatusById, incrementLocalStreakCountById, retryLocalStreakById } = localStreakSlice.actions;

export default localStreakSlice.reducer;