import { Stack } from 'expo-router';
import ListContainer from '../../../components/list/ListContainer';

export default function index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'My Streaks' }} />
      <ListContainer />
    </>
  );
}
