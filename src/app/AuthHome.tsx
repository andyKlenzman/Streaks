import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useNavigation } from 'expo-router';

const AuthPage = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Tiny Streaks</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Link style={[styles.button, styles.blueButton]} href="/AuthSignup">
          <Text style={styles.buttonText}>Sign Up</Text>
        </Link>
        <Link style={[styles.button, styles.redButton]} href="/AuthLogin">
          <Text style={styles.buttonText}>Login</Text>
        </Link>
      </View>
    </View>
  );
};

export default AuthPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '10%',
  },
  logoContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: "10%",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    borderRadius: 5,
  },
  blueButton: {
    backgroundColor: 'blue',
  },
  redButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
