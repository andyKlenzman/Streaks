import { TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { deleteStreak } from '../../store/slices/streaksSlice';
import { useAppDispatch } from '../../../hooks';

interface DeleteButtonProps {
  id: string | number[];
}

const DeleteButton: FC<DeleteButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(deleteStreak(id));
  };

  return (
    <TouchableOpacity style={styles.pendingButton} onPress={handleClick}>
      <Ionicons name="md-trash" size={32} color="blue" />
    </TouchableOpacity>
  );
};

export default DeleteButton;

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
