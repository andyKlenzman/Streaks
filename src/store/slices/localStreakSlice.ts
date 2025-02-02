import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Streak, LocalStreakStatus, LocalStreaks } from '../../shared/interfaces/streak.interface';
import { AppDispatch } from '../store';
import uuid from 'react-native-uuid';

const initialState: LocalStreaks = {
  streaks: [],
};

// Helper function to find a streak by ID
const findStreakById = (state: LocalStreaks, id: string) => {
  const index = state.streaks.findIndex((streak) => streak.streakUUID === id);
  if (index === -1) 
  {
    console.error(`Streak with ID ${id} not found.`);
    return null;
  }
  return index;
};

const determineStreakStatus = (streak: Streak): Streak['status'] => {
  const now = new Date().getTime();
  const lastCompletedTime = new Date(streak.lastTimeCompleted).getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (streak.status === 'isBroken') {
    return 'isBroken'; // Streak is permanently broken
  }

  if (now - lastCompletedTime > twentyFourHours) 
  {
    return 'isBroken'; // Streak expired
  }

  if (streak.count > 0) {
    return 'isActive'; // Streak is actively being maintained
  }

  return 'isReady'; // Streak is ready to start
};






export const localStreakSlice = createSlice({
  name: 'localStreaks',
  initialState,
  reducers: {
    // Create a new streak
    createLocalStreak: (state, action: PayloadAction<Omit<Streak, 'streakUUID' | 'lastTimeCompleted' | 'count' | 'status'>>) => {
      const newStreak: Streak = {
        streakUUID: uuid.v4() as string,
        creatorUUID: '',
        partnerUUID: '',
        title: action.payload.title,
        count: 0,
        lastTimeCompleted: new Date().toISOString(),
        status: 'isReady',
        isShared: false,
      };
      state.streaks.push(newStreak);
    },

    deleteLocalStreak: (state, action: PayloadAction<string>) => {
      const index = findStreakById(state, action.payload);
      if (index !== null) state.streaks.splice(index, 1);
    },

    // Change the status of a streak by ID
    changeLocalStreakStatusById: (state, action: PayloadAction<{ id: string; status: LocalStreakStatus }>) => {
      const { id, status } = action.payload;
      const index = findStreakById(state, id);
      if (index !== null) state.streaks[index].status = status;
    },

    // Update the status of a streak by recalculating it
    updateLocalStreakStatusById: (state, action: PayloadAction<string>) => {
      const index = findStreakById(state, action.payload);
      if (index !== null) {
        const streak = state.streaks[index];
        state.streaks[index].status = determineStreakStatus(streak);
      }
    },

    // Batch update all streak statuses
    updateAllStreakStatuses: (state) => {
      state.streaks = state.streaks.map((streak) => ({
        ...streak,
        status: determineStreakStatus(streak),
      }));
    },

    // Increment streak count and update timestamp
    incrementLocalStreakCountById: (state, action: PayloadAction<string>) => {
      const index = findStreakById(state, action.payload);
      if (index !== null) {
        const currentUtcTimestamp = new Date().toISOString();
        state.streaks[index] = {
          ...state.streaks[index],
          count: state.streaks[index].count + 1,
          lastTimeCompleted: currentUtcTimestamp,
          status: 'isActive', // Update status directly here
        };
      }
    },

    // Update the last completion time of a streak
    updateLocalStreakLastTimeCompletedById: (state, action: PayloadAction<{ id: string; timestamp: string }>) => {
      const { id, timestamp } = action.payload;
      const index = findStreakById(state, id);
      if (index !== null) state.streaks[index].lastTimeCompleted = timestamp;
    },

     retryLocalStreakById: (state, action: PayloadAction<{ id: string;}>) => {
      const { id } = action.payload;
      
      const index = findStreakById(state, action.payload);
      if (index !== null) {
        
        state.streaks[index] = {
          ...state.streaks[index],
          count: 0,
          lastTimeCompleted: new Date().toISOString(),
          status: 'isReady', // Update status directly here
        };
      }
    },

  },
});

// Thunk to complete a streak
export const completeLocalStreakById = (id: string) => (dispatch: AppDispatch) => {
  dispatch(incrementLocalStreakCountById(id));
};

// Thunk to periodically update all streak statuses
export const updateAllStreakStatusesThunk = () => (dispatch: AppDispatch) => {
  dispatch(localStreakSlice.actions.updateAllStreakStatuses());
};

// Export actions and reducer
export const {
  createLocalStreak,
  deleteLocalStreak,
  changeLocalStreakStatusById,
  updateLocalStreakStatusById,
  updateAllStreakStatuses,
  incrementLocalStreakCountById,
  updateLocalStreakLastTimeCompletedById,
  retryLocalStreakById
} = localStreakSlice.actions;

export default localStreakSlice.reducer;
