import Ionicons from '@expo/vector-icons/Ionicons';

import { buttonStyles as styles } from '../styles/buttonStyles';

const CompleteButton = () => {
  return <Ionicons name="checkmark-circle" size={46} color="green" style={styles.successIcon} />;
};

export default CompleteButton;
