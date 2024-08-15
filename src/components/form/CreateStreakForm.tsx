import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../hooks';
import { addNewStreak } from '../../store/slices/streaksSlice';
import { StreakFormInput } from '../../shared/interfaces/streak.interface';
import { useNavigation } from 'expo-router';

const CreateStreakForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);
  const [allowError, setAllowError] = useState(false);

  // Reset error state when component is unfocused
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => setAllowError(false));
    return unsubscribe;
  }, [navigation]);

  // Focus the input when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const initialValues: StreakFormInput = { title: '' };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(40, 'Name must be at most 40 characters')
      .required('Required'),
  });

  const onSubmit = async (
    values: StreakFormInput,
    { resetForm }: FormikHelpers<StreakFormInput>
  ) => {
    try {
      dispatch(addNewStreak(values));
      resetForm();
      navigation.navigate('index');
    } catch (error) {
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <View style={styles.labelContainer}>
                <Text>Set your intention</Text>
                {touched.title && errors.title && allowError && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={inputRef}
                  onChangeText={(text) => {
                    setAllowError(true);
                    setFieldValue('title', text);
                    setFieldTouched('title', true, false);
                  }}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  style={styles.input}
                  placeholder="Enter intention here"
                  maxLength={40}
                  onSubmitEditing={handleSubmit}
                />
                <Text style={styles.characterCount}>{values.title.length}/40</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreateStreakForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  characterCount: {
    position: 'absolute',
    bottom: -15,
    right: 10,
    color: 'grey',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
