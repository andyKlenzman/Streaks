import { TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useAppDispatch } from '../../../../hooks';
import { completeStreak } from '../../../store/slices/streaksSlice';
import { retryStreak } from '../../../store/slices/streaksSlice';
interface ListButtonProps {
  id: string;
}

const RetryButton: FC<ListButtonProps> = ({id}) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(retryStreak(id))
  };

    return (
      <TouchableOpacity style={styles.pendingButton} onPress={handleClick}>
        <Ionicons name="md-refresh" size={32} color="green" />
      </TouchableOpacity>
    );

};

export default RetryButton;

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
