import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

const CompleteButton = () => {
  return (
    <TouchableOpacity style={styles.successIcon}>
      <Ionicons name="md-checkmark-circle" size={32} color="green" />
    </TouchableOpacity>
  );
};

export default CompleteButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    padding: 7,
    margin: 5,
  },

  successIcon: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    padding: 7,
    margin: 5,
  },
});
