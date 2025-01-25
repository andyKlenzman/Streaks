import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  LayoutAnimation,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { createLocalStreak } from '../store/slices/localStreakSlice';
import ListContainer from '../components/streakList/ListContainer';
import { useNavigation } from 'expo-router';





const HomeLayout = () => {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput | null>(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const runLayoutAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  // handles when the create button is pressed
  const handleCreatePress = () => {
    runLayoutAnimation();
    setIsCreating(true);
  };


  const handleAddItem = () => {
    if (!inputValue.trim()) return;
    dispatch(createLocalStreak({ title: inputValue.trim(), creatorUUID: 'some-static-uuid' }));
    setInputValue('');
    setIsCreating(false);
    Keyboard.dismiss();
    runLayoutAnimation();
  };

  //slight delay in the  animation
  useEffect(() => {
    if (isCreating) 
    {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isCreating]);


  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const handleKeyboardHide = event => {
    setIsCreating(false)
    runLayoutAnimation();
    console.log("yo")

  };






  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={'padding'}
      keyboardVerticalOffset={20}  //ToDo: machen dynamisch
    >
      <View style={styles.inner}>
        {/* ——— Scrollable List Area ——— */}
        <View
          style={[
            styles.listContainer,
            isCreating && { opacity: 0.5 },
          ]}
          pointerEvents={isCreating ? 'none' : 'auto'}
        >
          <ListContainer />
        </View>

        {/* ——— Footer ——— */}
        <View style={styles.footer}>
          {isCreating ? (
            <View style={styles.inputContainer}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Enter streak name"
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={handleAddItem}
                returnKeyType="done"
              />
              <TouchableOpacity style={styles.enterButton} onPress={handleAddItem}>
                <Ionicons name="checkmark-sharp" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.row}>
              <TouchableOpacity style={styles.createButton} onPress={handleCreatePress}>
                <Text style={styles.createButtonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingsButton}>
                <Ionicons name="settings-sharp" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  inner: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#3498db',
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButton: {
    width: 50,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  enterButton: {
    marginLeft: 10,
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
