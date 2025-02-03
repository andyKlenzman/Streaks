import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut, deleteAccount } from '../logic/auth/authActions';
import { setNotifications } from '../store/slices/authSlice';
import * as Notifications from 'expo-notifications';
import { selectIsSignedIn } from '../store/selectors/authSelectors';



import { GoogleAuthProvider } from 'firebase/auth';
import auth from '@react-native-firebase/auth';




export default function SettingsScreen() {



  
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(false);
  const isSignedIn = useAppSelector(selectIsSignedIn)

  const buttons = [
    { label: 'Sign Up', onPress: () => navigation.navigate('/signup') },
    { label: 'Login', onPress: () => navigation.navigate('/login') },
    { label: 'Logout', onPress: () => logOut(dispatch, navigation) },
    { label: 'Delete Account', onPress: () => deleteAccount(dispatch, navigation) },
  ];

  useEffect(() => {
    // You could load the initial `enableNotifications` state from Redux once
    // so the toggle reflects the user's current preference.
    // Example:
    // setIsEnabled(notificationsEnabled);

  }, []);

  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);

    if (newValue) 
    {
      // User wants to ENABLE notifications
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted')
       {
        Alert.alert('Permission Required', 'Notifications permissions not granted!');
        // If permission is denied, revert toggle back off
        setIsEnabled(false);
      } else 
      {
        // Permission was granted
        dispatch(setNotifications(true));
      }
    } else {
      // User wants to DISABLE notifications
      dispatch(setNotifications(false));
    }
  };







  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>




      {/* Auth Functionality*/}




      <Text style={styles.description}>
      {isSignedIn
          ? 'Auth status: Signed in'
          : 'Auth status: Not signed in'}
      </Text>




      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>
          Toggle Push Notifications:
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Text style={styles.description}>
        {isEnabled
          ? 'Push notifications are ON. You will receive updates.'
          : 'Push notifications are OFF. You will not receive updates.'}
      </Text>


      

      {/* Additional settings buttons */}
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
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 10,
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
