import {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut, deleteAccount } from '../logic/auth/authActions';
import { selectIsSignedIn } from '../store/selectors/authSelectors';

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const isSignedIn = useAppSelector(selectIsSignedIn);



  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Settings',
    });
  }, []);




  const buttons = isSignedIn
    ? [
        { label: 'Logout', onPress: () => logOut(dispatch) },
        { label: 'Delete Account', onPress: () => deleteAccount(dispatch, navigation) },
      ]
    : [
        { label: 'Sign Up', onPress: () => navigation.navigate('signup') },
        { label: 'Login', onPress: () => navigation.navigate('login') },
      ];

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        {isSignedIn ? 'Auth status: Signed in' : 'Auth status: Not signed in. Sign in to enable shared streaks.'}
      </Text>
      {buttons.map((btn) => (
        <TouchableOpacity
          key={btn.label}
          style={styles.button}
          onPress={btn.onPress}
        >
          <Text style={styles.buttonText}>{btn.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    color: 'gray',
  },
  button: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
