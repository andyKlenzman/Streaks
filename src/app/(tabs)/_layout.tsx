import { Provider } from 'react-redux';
import { store, persistor } from '../../store/store';
import Tabs from 'expo-router/tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
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
        {/* <ThemeProvider value={DarkTheme}> */}
        <Tabs
          screenOptions={{
            headerShown: false,
            // tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            // tabBarStyle: { backgroundColor: '#FFFFFF', height: 60 },
            tabBarActiveTintColor: '#2282FF',
            tabBarInactiveTintColor: '#999999',
          }}>
          <Tabs.Screen
            name="streaks"
            options={{
              headerShown: false,
              tabBarLabel: 'Streaks',
              title: 'Streaks',
              tabBarIcon: () => (
                <FontAwesome size={28} style={{ marginBottom: -3 }} name="list" color="#2282FF" />
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              headerShown: false,
              tabBarLabel: 'Create',
              title: 'Create',
              tabBarIcon: () => (
                <FontAwesome size={28} style={{ marginBottom: -3 }} name="plus" color="#2282FF" />
              ),
            }}
          />
        </Tabs>
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
  );
};
export default TabsLayout;
