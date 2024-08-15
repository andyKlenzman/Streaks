import { RootState } from '../store';

export const selectAllAuthData = (state: RootState) => {
  return state.auth;
};
