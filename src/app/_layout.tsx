import React, { useEffect, useState, useRef  } from 'react';
import { Stack } from 'expo-router/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/fbInit';
import { store, persistor } from '../store/store';
import { useAppDispatch } from '../../hooks';
import { updateAuth } from '../store/slices/authSlice';
import * as Notifications from 'expo-notifications';




// keeps the auth state in sync
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




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };
}








// updates the status of streaks periodically
import { updateAllStreakStatusesThunk } from '../store/slices/localStreakSlice';
const StreakUpdater = () => {
  const dispatch = useAppDispatch();

  dispatch(updateAllStreakStatusesThunk());


  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateAllStreakStatusesThunk());
    }, 300000); // 5 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
};







export default function Layout() {


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  // useEffect(() => {
  //   registerForPushNotificationsAsync()
  //     .then(token => setExpoPushToken(token ?? ''))
  //     .catch((error: any) => setExpoPushToken(`${error}`));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(notificationListener.current);
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
        

          <StreakUpdater />
          <AuthListener /> 
          <Stack />
  
        </SafeAreaView>

      </PersistGate>
    </Provider>
  );
}
