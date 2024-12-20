import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers, PreloadedState } from '@reduxjs/toolkit';
import streaksSlice from './slices/streaksSlice';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import uiSlice from './slices/uiSlice';
import authSlice from './slices/authSlice';
import { localStreakSlice } from './slices/localStreakSlice';

const rootReducer = combineReducers({
  streaks: streaksSlice,
  localStreaks: localStreakSlice,
  ui: uiSlice,
  auth: authSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['streaks', 'auth'], // Persist 'streaks' and 'auth' slices
  blacklist: ['ui'],
  stateReconciler: autoMergeLevel1, //wtf macht es eigentlich
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: undefined,
});

// Create persistor
export const persistor = persistStore(store);

// Optional: Setup store function for non-persistent use cases
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// TypeScript types
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
