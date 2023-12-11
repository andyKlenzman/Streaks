import { Stack } from 'expo-router';
import CreateStreakForm from '../../../components/form/CreateStreakForm';

export default function index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Create New Streak' }}></Stack.Screen>
      <CreateStreakForm />
    </>
  );
}
