import React, { useState, useRef, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { createLocalStreak } from '../store/slices/localStreakSlice';
import ListContainer from '../components/streakList/ListContainer';
import { useNavigation } from 'expo-router';
import EmptyStreaksScreen from '../components/noStreaksScreen/EmptyScreen';
import { selectAllLocalStreaks } from '../store/selectors/localStreakSelectors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirstTimeIntro } from '../components/intro/FirstTimeIntro';
import { hideIntro, resetIntro } from '../store/slices/uiSlice';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');



const HomeLayout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const [isCreating, setIsCreating] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showIntro = useSelector((state: RootState) => state.ui.showIntro); // Read intro state from Redux


  const streaks = useSelector(selectAllLocalStreaks); 

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const inputRef = useRef<TextInput | null>(null);

  // for testing
  // React.useEffect(() => {

  //   dispatch(resetIntro())
    
  // }, []);



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
        title: trimmedValue
      })
    );
    closeCreateOverlay();
  };

  return (
    <View style={styles.container}>
      {showIntro && <FirstTimeIntro onDismiss={() => dispatch(hideIntro())} />}
      {/* Main content */}
      
      <View style={styles.listContainer}>
        {streaks?.length > 0 ? <ListContainer /> : <EmptyStreaksScreen />}
      </View>

      <View style={styles.footer}>
        <View style={styles.row}>

      {/* Settings button  */}
          {/* <Pressable
            onPress={() => navigation.navigate('settings')}
            style={({ pressed }) => [
              styles.settingsButton,
              { opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Ionicons name="settings-sharp" size={24} color="white" />
          </Pressable> */}

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
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#0099ff',
    borderRadius: 10,
    alignItems: 'center',
    width: "100%",


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
    backgroundColor: '#0099ff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    // usw.
  },
});
