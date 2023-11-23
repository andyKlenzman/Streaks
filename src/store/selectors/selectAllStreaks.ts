import { RootState } from '../store';

export const selectAllStreaks = (state: RootState) => {
  return state.streaks;
};
