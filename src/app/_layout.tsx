import { Stack } from 'expo-router/stack';
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/fbInit';
import { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { updateAuth } from '../store/slices/authSlice';
import { useAppDispatch } from '../../hooks';
import { purgeState } from '../store/store';

function AuthListener() 
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [isNavReady, setNavReady] = useState(false);



  useEffect(() => {
    if (navigation && !isNavReady) 
    {
      setNavReady(true);
    }
  }, [navigation, isNavReady]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) 
      {
        console.log("user present in on auth change ",user)
        dispatch(updateAuth({ email: user.email, isSignedIn: true }));
      } else 
      {
        console.log("No user in onAuthStateChanged")
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (isNavReady) 
    {
      const authData = store.getState().auth;
      if (!authData.isSignedIn) 
      {
        
        navigation.navigate('AuthHome');
      }
    }
  }, [isNavReady, navigation]);

  return null;
}

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <AuthListener />
          <Stack />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
