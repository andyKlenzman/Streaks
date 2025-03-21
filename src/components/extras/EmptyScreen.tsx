import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyStreaksScreen = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="flame-outline" size={80} color="#ccc" style={styles.icon} />
      <Text style={styles.title}>No Streaks Yet</Text>
      <Text style={styles.subtitle}>
        This is where your streaks will go. 
      </Text>
      <Text style={styles.subtitle}>
        Create a new streak to get started!
      </Text>
    </View>
  );
};

export default EmptyStreaksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
