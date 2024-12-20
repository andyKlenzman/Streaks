import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {
  createUserWithEmailAndPassword,
} from 'firebase/auth'; // Update import path for Firebase Auth
import { auth } from '../firebase/fbInit';
import { useNavigation } from 'expo-router/src/useNavigation';
import parseUserInfo from '../logic/auth/parseUserInfo';
import { useAppDispatch } from '../../hooks';
import { updateAuth } from '../store/slices/authSlice';


const AuthSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();


  const handleSignup = async () => {
    console.log(email, password);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        dispatch(updateAuth({email: user.email, uid:user.uid, isSignedIn: true}))
        navigation.navigate('index');

    } catch (error) {
        console.error("ERROR", error.code, error.message);
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Go Bitch</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AuthSignup;
