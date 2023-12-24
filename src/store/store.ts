import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from 
'@react-native-async-storage/async-storage'; //Can only store string data
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import { PreloadedState, combineReducers} from '@reduxjs/toolkit';
import streaksSlice from './slices/streaksSlice';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { initialState } from '../../tests/data/testStateData';
import uiSlice from './slices/uiSlice';


const isDevelopment = process.env.EXPO_PUBLIC_ENV === 'development';

const rootReducer = combineReducers({
  streaks: streaksSlice,
  ui: uiSlice
});

const persistConfig = {
  key: 'root', //req
  storage: AsyncStorage, //req
  whitelist: ['streaks'], //optional
  stateReconciler: autoMergeLevel2,
  blacklist: ['ui'], //for items to disclude
  // debug
}

let persistedReducer  = persistReducer(persistConfig, rootReducer);

export let store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
    //need to define what is happening here
    preloadedState: isDevelopment ? initialState : undefined
  })  

export let persistor = persistStore(store) // used in the persistor gate located at the root app layout

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState
  });
  };
export type AppStore = ReturnType<typeof setupStore> //this the the type returned by return setup store
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;