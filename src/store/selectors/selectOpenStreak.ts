import { RootState } from '../store';

export const selectOpenStreak = (state: RootState) => {
  return state.ui.activeStreakId;
};
