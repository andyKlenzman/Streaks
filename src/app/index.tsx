import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { createLocalStreak } from '../store/slices/localStreakSlice';
import ListContainer from '../components/streakList/ListContainer';
import { useNavigation } from 'expo-router';


import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import *  as Constant from 'expo-constants'


const { height: SCREEN_HEIGHT } = Dimensions.get('window');



const HomeLayout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isCreating, setIsCreating] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Animation value
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  // Reference to the TextInput
  const inputRef = useRef<TextInput | null>(null);

  //////////////////////////////////////////////////////////////
//// NOTIFICATIONS
//////////////////////////////////////////////////////////////


async function registerForPushNotificationsAsync() {

  // checks it is not a simulator
  if (Device.isDevice) 
  {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}



function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}



// Function to schedule a local notification
async function scheduleLocalNotification() 
{
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Scheduled Notification', // can make custom messages here, can"t wait until I can update and fuck w people 
      body: 'This is a notification scheduled based on a condition.',
    },
    trigger: {
      seconds: 3600, // Schedule to trigger in 1 hour - make conditional based on time to go. Only schedule when they have a streak going.
    },
  });
}

// Example condition check
function checkConditionAndSchedule() 
{ // IF streak exists, one of is active, and they have asked for notifications.

  const conditionMet = /* your condition logic */;
  if (conditionMet) {
    scheduleLocalNotification();
  }
}


  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  React.useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', closeCreateOverlay);
    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  const openCreateOverlay = () => {
    setIsCreating(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      inputRef.current?.focus();
    });
  };

  const closeCreateOverlay = () => {
    Keyboard.dismiss();
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsCreating(false);
      setInputValue('');
    });
  };

  const handleAddItem = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    dispatch(
      createLocalStreak({
        title: trimmedValue,
        creatorUUID: 'some-static-uuid',
      })
    );
    closeCreateOverlay();
  };

  return (
    <View style={styles.container}>
      {/* Main content */}
      <View style={styles.listContainer}>
        <ListContainer />
      </View>

      <View style={styles.footer}>
        <View style={styles.row}>
          <Pressable
            onPress={() => navigation.navigate('settings')}
            style={({ pressed }) => [
              styles.settingsButton,
              { opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Ionicons name="settings-sharp" size={24} color="white" />
          </Pressable>

          <Pressable
            onPress={openCreateOverlay}
            style={({ pressed }) => [
              styles.createButton,
              { opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Text style={styles.createButtonText}>Create</Text>
          </Pressable>
        </View>
      </View>

      {/* overlay */}
      {isCreating && (
        <Animated.View
          style={[
            styles.overlayContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.overlayInner}>
            {/* Header: Title and Close Button */}
            <View style={styles.headerRow}>
              <Text style={styles.overlayTitle}>Create a New Streak</Text>
              <Pressable onPress={closeCreateOverlay}>
                <Ionicons name="close" size={36} color="#333" />
              </Pressable>
            </View>

            {/* Text Input */}
            <TextInput
              ref={inputRef}
              style={styles.minimalInput}
              placeholder="Streak Title"
              placeholderTextColor="#aaa"
              value={inputValue}
              onChangeText={(text) => setInputValue(text.slice(0, 50))}
              onSubmitEditing={handleAddItem}
              returnKeyType="done"
              maxLength={50}
            />

            {/* Character counter */}
            <Text style={styles.charCount}>{inputValue.length}/50</Text>

            {/* Checkmark button */}
            <Pressable
              onPress={handleAddItem}
              style={({ pressed }) => [
                styles.enterButton,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Ionicons name="checkmark-sharp" size={24} color="white" />
            </Pressable>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', 
  },
  listContainer: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#eee', 
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsButton: {
    width: 60,
    height: 60,
    backgroundColor: '#636e72', // Slightly darker grey-blue
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#3498db',
    borderRadius: 8,
    alignItems: 'center',
    width: 265,


  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* Overlay */
  overlayContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    // Start fully at the bottom (animated in)
    bottom: 0,
    backgroundColor: '#fff',
  },
  overlayInner: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,

  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Titel links, X rechts
    alignItems: 'center',
    marginBottom: 15,                 // Abstand nach unten
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  overlayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  minimalInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    marginTop: 5,          
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  enterButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    // usw.
  },
});
