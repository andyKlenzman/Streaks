import { CombinedState, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from 
'@react-native-async-storage/async-storage'; //Can only store string data
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import { PreloadedState } from '@reduxjs/toolkit';
import streaksSlice from './slices/streaksSlice';
import { combineReducers } from '@reduxjs/toolkit';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { initialState } from '../../tests/data/testStateData';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
/*
COULD DO:
- run an experiment with setting up the app store with setup function for both test and production environements
- 
 */

const isDevelopment = process.env.EXPO_PUBLIC_ENV === 'development';

const rootReducer = combineReducers({
  streaks: streaksSlice,
});

const persistConfig = {
  key: 'root', //req
  storage: AsyncStorage, //req
  whitelist: ['streaks'], //optional
  stateReconciler: autoMergeLevel2
  // blacklist: ['key3', 'key4'], //for items to disclude
  // statereconciler 
  // debug

}

let persistedReducer  = persistReducer(persistConfig, rootReducer);



export let store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
    preloadedState: isDevelopment ? initialState : undefined 
  })  


export let persistor = persistStore(store) //used in the persist gate in root app layout



export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState
  });
  };
export type AppStore = ReturnType<typeof setupStore> //this the the type returned by return setup store

 /*
 returned to the persistor gate in root layout file in app folder

 How does this function relate to my test environment, will I need to fuck with this? 
 */



 export type RootState = ReturnType<typeof rootReducer>
 export type AppDispatch = typeof store.dispatch;