import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers, PreloadedState } from '@reduxjs/toolkit';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import uiSlice from './slices/uiSlice';
import authSlice from './slices/authSlice';
import localStreakSlice from './slices/localStreakSlice';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

const rootReducer = combineReducers({
  localStreaks: localStreakSlice,
  ui: uiSlice,
  auth: authSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['localStreaks', 'auth', 'ui'], // Persist 'streaks' and 'auth' slices
  blacklist: [],
  stateReconciler: autoMergeLevel1, 
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(thunk),
  preloadedState: undefined,
  devTools: false,
  enhancers: getDefaultEnhancers => getDefaultEnhancers.concat(devToolsEnhancer())
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


// Purge stored state
export const purgeState = async () => {
  try {
    await persistor.purge();
    console.log('Persisted state purged successfully!');
  } catch (error) {
    console.error('Failed to purge persisted state:', error);
  }
};


// TypeScript types
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
