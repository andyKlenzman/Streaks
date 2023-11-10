import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ListContainer from './src/components/list/ListContainer';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ListContainer />
    </SafeAreaView>
  );
}

