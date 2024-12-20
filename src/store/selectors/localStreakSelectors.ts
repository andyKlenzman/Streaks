import { RootState } from '../store';

export const selectAllStreaks = (state: RootState) => {
  return state.streaks.streaks;
};

export const selectAllLocalStreaks = (state: RootState) => {
  return state.localStreaks.streaks;
};


export const selectAllSharedStreaks = (state: RootState) => {
  return state.streaks.sharedStreaks;
};