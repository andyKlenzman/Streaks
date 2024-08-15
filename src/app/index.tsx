import { Redirect, Link } from 'expo-router';
import ListContainer from '../components/list/ListContainer';
import { Button } from 'react-native';
import { useAppDispatch } from '../../hooks';
import { updateAuth } from '../store/slices/authSlice';
import { useNavigation } from 'expo-router';
import { signOut } from 'firebase/auth'; // Update import path for Firebase Auth
import { auth } from '../firebase/fbInit';

const HomeLayout = () => {
  const isDevelopment = process.env.EXPO_PUBLIC_ENV === 'development';
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  if (isDevelopment) {
    // persistor.purge();
    // console.log('AsyncStorage Purged');
  }

  const logOut = async () => {
    try {
      // Await the sign-out process to complete
      await signOut(auth);
      
      // Update the app state
      dispatch(updateAuth({ email: "", isSignedIn: false }));

      // Navigate to the AuthHome screen
      navigation.navigate('AuthHome');
    } catch (error) {
      console.error('Sign out error:', error);
      // Handle sign out errors (e.g., show a user-friendly message)
    }
  };

  return (
    <>
      <ListContainer />
      <Link
        href="/create"
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: 'blue',
          color: 'white',
          borderRadius: 5,
        }}
      >
        Create
      </Link>
      <Button
        title='Logout'
        color='red' // Button component's color prop should be used instead of style
        onPress={logOut}
      />
    </>
  );
};

export default HomeLayout;
