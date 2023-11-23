import { View , TouchableOpacity, TextInput, Text, Button } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Formik } from 'formik';
import { StreakFormInput } from "../../shared/interfaces/streak.interface";
import { addNewStreak } from "../../store/slices/streaksSlice";
import * as Yup from 'yup';
import { FormikHelpers } from "formik";
import { StyleSheet } from "react-native";


const CreateStreakForm = () => {
    const dispatch = useAppDispatch();

    const initialValues:StreakFormInput = {
      title: "",
      partner: ""
    };

    const validationSchema = Yup.object({
      title: Yup.string().max(50, 'Title must be at most 50 characters').required('Title is requried'),
      partner: Yup.string().email('Invalid email')
    });

  

    const onSubmit = async (
      values: StreakFormInput,
      { resetForm }: FormikHelpers<StreakFormInput>
    ) => {
      try {
        dispatch(addNewStreak(values));
        resetForm();
      } catch (error) {
      }
    };

return (
    <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text>Streak name</Text>
          {touched.title && errors.title && <Text style={{ color: 'red' }}>{errors.title}</Text>}
        </View>
        <TextInput
          onChangeText={handleChange('title')}
          onBlur={handleBlur('title')}
          value={values.title}
          style={styles.input}
          placeholder={"Enter streak name here"}
        />

        <View style={styles.labelContainer}>
          <Text>Invite Partner with email</Text>
          {touched.partner && errors.partner && <Text style={{ color: 'red' }}>{errors.partner}</Text>}
        </View>
        <TextInput
          onChangeText={handleChange('partner')}
          onBlur={handleBlur('partner')}
          value={values.partner}
          style={styles.input}
          placeholder={"Enter partner's email here"}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} >
            <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
       
      )

} 

export default CreateStreakForm




const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  labelContainer: {
    flexDirection:"row", justifyContent:"space-between", width:"100%", marginBottom:10
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
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop:15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});


