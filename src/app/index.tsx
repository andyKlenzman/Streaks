import { Redirect, Link } from 'expo-router';
import ListContainer from '../components/list/ListContainer';
import { Button } from 'react-native';
import { useAppDispatch } from '../../hooks';
import { updateAuth } from '../store/slices/authSlice';
import { useNavigation } from 'expo-router';
import { signOut, deleteUser } from 'firebase/auth'; // Import deleteUser
import { auth } from '../firebase/fbInit';
import { store } from '../store/store';

const HomeLayout = () => {
  const isDevelopment = process.env.EXPO_PUBLIC_ENV === 'development';
  const dispatch = useAppDispatch();
  const navigation = useNavigation();


  console.log(store.getState())

  if (isDevelopment) {
    // persistor.purge();
    // console.log('AsyncStorage Purged');
  }

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(updateAuth({email: "", uid:"", isSignedIn: false}));
      navigation.navigate('AuthHome');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const deleteAccount = async () => {
    try {
      // Get the current user
      const user = auth.currentUser;

      if (user) {
        // Delete the user's account
        await deleteUser(user);

        // Optionally sign out after account deletion
        dispatch(updateAuth({email: "", uid: "", isSignedIn: false}));
        navigation.navigate('AuthHome');
      } else {
        console.error('No user is currently signed in.');
      }
    } catch (error) {
      console.error('Account deletion error:', error);
      // Handle account deletion errors (e.g., show a user-friendly message)
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
        color='red'
        onPress={logOut}
      />
      <Button
        title='Delete Account'
        color='red'
        onPress={deleteAccount}  // Updated onPress to call deleteAccount
      />
    </>
  );
};

export default HomeLayout;
