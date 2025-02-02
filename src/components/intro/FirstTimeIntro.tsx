import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const FirstTimeIntro = ({ onDismiss }: { onDismiss: () => void }) => {
    return (
      <Modal animationType="fade" transparent={false} visible={true}>
        <View style={styles.container}>
          {/* Fire Logo */}
          <Ionicons name="flame-outline" size={80} color="#666" style={styles.logo} />
          
          {/* Welcome Text */}
          <Text style={styles.title}>Welcome to StreakTracker!</Text>

          {/* Explanation */}
          <Text style={styles.description}>
            This app helps you stay consistent by tracking your daily progress.
          </Text>
  
          {/* Bullet Points */}
          <View style={styles.bulletContainer}>
            <Text style={styles.bullet}>🔥 Track your daily streaks</Text>
            <Text style={styles.bullet}>📅 Streaks expire at 2 AM</Text>
            <Text style={styles.bullet}>🎯 Reach your goals step by step</Text>
          </View>
  
          {/* Dismiss Button */}
          <Pressable onPress={onDismiss} style={styles.button}>
            <Text style={styles.buttonText}>Got it!</Text>
          </Pressable>
        </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', 
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    logo: {
      marginBottom: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#333', // Dunkler für bessere Lesbarkeit
      textAlign: 'center',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: '#555', // Etwas helleres Grau für Balance
      textAlign: 'center',
      marginBottom: 20,
    },
    bulletContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    bullet: {
      fontSize: 16,
      color: '#444', // Etwas dunkler als vorher
      marginBottom: 8,
    },
    button: {
      backgroundColor: '#ddd', // Neutraler Ton
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
    buttonText: {
      color: '#333',
      fontSize: 16,
      fontWeight: 'bold',
    },
});
