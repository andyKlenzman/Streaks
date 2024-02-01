import Ionicons from '@expo/vector-icons/Ionicons';

import { buttonStyles as styles } from '../buttonStyles';

const CompleteButton = () => {
  return <Ionicons name="md-checkmark-circle" size={46} color="green" style={styles.successIcon} />;
};

export default CompleteButton;
