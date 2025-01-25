import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

import { buttonStyles as styles } from '../styles/buttonStyles';

const CompleteButton = () => {
  return (
  
      <Ionicons name="checkmark-circle" size={52} color="green" style={styles.successIcon} />
    );
  };

export default CompleteButton;
