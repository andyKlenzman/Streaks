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
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigation } from 'expo-router';
import { createLocalStreak } from '../store/slices/localStreakSlice';
import { selectAuthUUID } from '../store/selectors/authSelectors';

type StreakFormInput = {
  title: string;
};

const CreateStreak = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);
  const [allowError, setAllowError] = useState(false);
  const creatorUUID = useAppSelector(selectAuthUUID);



  useEffect(() => {

    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timeout);

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
      dispatch(createLocalStreak({ ...values, creatorUUID }));
      resetForm();
      navigation.goBack();
    } catch (error) {
      console.error(error); // Handle error if needed
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
          enableReinitialize // Automatically reset the form when initialValues change
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
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
                  }}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  style={styles.input}
                  placeholder="Enter intention here"
                  maxLength={40}
                  onSubmitEditing={handleSubmit} // Submit when "Done" is pressed on keyboard
                />
                <Text style={styles.characterCount}>
                  {values.title.length}/40
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.submitButton}
                >
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

export default CreateStreak;

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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
