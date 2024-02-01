import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppDispatch } from '../../../../hooks';
import { retryStreak } from '../../../store/slices/streaksSlice';
import { buttonStyles as styles } from '../buttonStyles';

interface ListButtonProps {
  id: string;
}

const RetryButton: FC<ListButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(retryStreak(id));
  };

  return (
    <TouchableOpacity style={styles.retryButton} onPress={handleClick}>
      <Ionicons name="md-refresh" size={24} color="green" />
    </TouchableOpacity>
  );
};

export default RetryButton;
