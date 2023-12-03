import { TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useAppDispatch } from '../../../../hooks';
import { completeStreak } from '../../../store/slices/streaksSlice';
interface ListButtonProps {
  id: string;
}

const PendingStreakButton: FC<ListButtonProps> = ({id}) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(completeStreak(id))
    console.log(id)
  };

    return (
      <TouchableOpacity style={styles.pendingButton} onPress={handleClick}>
        <MaterialCommunityIcons name="timer-sand-complete" size={32} color="blue" />
      </TouchableOpacity>
    );

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
    backgroundColor: 'white',
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
