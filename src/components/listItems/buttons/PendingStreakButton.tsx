import { TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useAppDispatch } from '../../../../hooks';
import { completeStreak } from '../../../store/slices/streaksSlice';

interface ListButtonProps {
  id: string;
}

const PendingStreakButton: FC<ListButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(completeStreak(id));
  };

  return (
    <TouchableOpacity style={styles.pendingButton} onPress={handleClick}>
      <MaterialCommunityIcons name="timer-sand-complete" size={32} color="#2282FF" />
    </TouchableOpacity>
  );

  // <TouchableOpacity style={styles.successIcon} onPress={handleClick}>
  //     <Ionicons name="md-checkmark-circle" size={32} color="green" />
  //   </TouchableOpacity>
};

export default PendingStreakButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    padding: 7,
    margin: 5,
  },

  pendingButton: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    padding: 7,
    margin: 5,
  },

  successIcon: {
    borderRadius: 50,
    padding: 7,
    margin: 5,
  },
});
