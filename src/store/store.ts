import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from 
'@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['streaks'],
}


const persistedReducer = persistReducer(persistConfig, rootReducer);


// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//    stateReconciler" 
//   whitelist: ['key1', 'key2'],
//   blacklist: ['key3', 'key4'],
// };

export let store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]

  })

export let persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;