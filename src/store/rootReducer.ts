
import { combineReducers } from 'redux';
import streaksSlice from './slices/streaksSlice';

const rootReducer = combineReducers({
  streaks: streaksSlice,
});

export default rootReducer;
