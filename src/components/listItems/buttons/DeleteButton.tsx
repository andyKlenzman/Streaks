import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { deleteStreak, deleteStreakBackend } from '../../../store/slices/streaksSlice';
import { useAppDispatch } from '../../../../hooks';

interface DeleteButtonProps {
  id: string | number[];
}

const DeleteButton: FC<DeleteButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(deleteStreakBackend(id));
  };

  return (
    <TouchableOpacity style={styles.pendingButton} onPress={handleClick}>
      <Ionicons name="md-trash" size={32} color="white" />
    </TouchableOpacity>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
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
