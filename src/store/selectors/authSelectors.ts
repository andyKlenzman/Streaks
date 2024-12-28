import { RootState } from '../store';

export const selectAllAuthData = (state: RootState) => {
  return state.auth;
};


export const selectAuthUUID = (state: RootState) => {
  return state.auth.authUUID;
};
