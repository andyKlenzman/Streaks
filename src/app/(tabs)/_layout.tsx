import { Provider } from 'react-redux';
import { store, persistor } from '../../store/store';
import Tabs from 'expo-router/tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

const TabsLayout = () => {
  const isDevelopment = process.env.EXPO_PUBLIC_ENV === 'development';

  if (isDevelopment) {
    persistor.purge();
    console.log('AsyncStorage Purged');
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="create"
            options={{
              headerShown: false,
              tabBarLabel: 'Create',
              title: 'Create',
              tabBarIcon: () => <FontAwesome size={28} style={{ marginBottom: -3 }} name="plus" />,
            }}
          />
          <Tabs.Screen
            name="home"
            options={{
              headerShown: false,
              tabBarLabel: 'Home',
              title: 'Home',
              tabBarIcon: () => <FontAwesome size={28} style={{ marginBottom: -3 }} name="star" />,
            }}
          />
        </Tabs>
      </PersistGate>
    </Provider>
  );
};
export default TabsLayout;
