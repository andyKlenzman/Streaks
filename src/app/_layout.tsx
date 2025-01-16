import React, { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/fbInit';
import { store, persistor } from '../store/store';
import { useAppDispatch } from '../../hooks';
import { updateAuth } from '../store/slices/authSlice';

function AuthListener() {
  const dispatch = useAppDispatch();

  // Monitor auth state and update Redux
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User signed in:', user);
        dispatch(
          updateAuth({
            authEmail: user.email || '',
            isSignedIn: true,
            authUUID: user.uid,
          })
        );
      } else {
        console.log('No user signed in');
        dispatch(
          updateAuth({
            authEmail: '',
            isSignedIn: false,
            authUUID: '',
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}




import { updateAllStreakStatusesThunk } from '../store/slices/localStreakSlice';

const StreakUpdater = () => {
  const dispatch = useAppDispatch();

  dispatch(updateAllStreakStatusesThunk());


  useEffect(() => {
    // Update streak statuses every 5 minutes
    const interval = setInterval(() => {
      dispatch(updateAllStreakStatusesThunk());
    }, 300000); // 5 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
};







export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* AuthListener keeps the state in sync */}
          <StreakUpdater />
          <AuthListener />
          <Stack />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
