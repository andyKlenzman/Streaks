import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useAppDispatch } from '../../hooks';
import { logOut, deleteAccount } from '../logic/auth/authActions';

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  // Minimal array of actions
  const buttons = [
    { label: 'Sign Up', onPress: () => navigation.navigate('/signup') },
    { label: 'Login', onPress: () => navigation.navigate('/login') },
    { label: 'Logout', onPress: () => logOut(dispatch, navigation) },
    { label: 'Delete Account', onPress: () => deleteAccount(dispatch, navigation) },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
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
