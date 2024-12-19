import { signOut, deleteUser } from 'firebase/auth'; 
import { auth } from '../../firebase/fbInit';
import { updateAuth } from '../../store/slices/authSlice';



export const logOut = async (dispatch, navigation) => {
  try {
    await signOut(auth);
    dispatch(updateAuth({email: "", uuid: "", isSignedIn: false}));
    
    navigation.navigate('AuthHome');
  } catch (error) {
    console.error('Sign out error:', error);
  }
};

export const deleteAccount = async (dispatch, navigation) => {
  try {
    const user = auth.currentUser;

    if (user) {
      await deleteUser(user);
      dispatch(updateAuth({email: "", uuid: "", isSignedIn: false}));
      navigation.navigate('AuthHome');
    } else {
      console.error('No user is currently signed in.');
    }
  } catch (error) {
    console.error('Account deletion error:', error);
  }
};
