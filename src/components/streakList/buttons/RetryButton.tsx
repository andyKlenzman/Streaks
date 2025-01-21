import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppDispatch } from '../../../../hooks';
import { retryLocalStreakById } from '../../../store/slices/localStreakSlice';
import { buttonStyles as styles } from '../styles/buttonStyles';

interface ListButtonProps {
  id: string;
}

const RetryButton: FC<ListButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();



  
  const handleClick = () => {
    dispatch(retryLocalStreakById(id));
  };

  return (
    <TouchableOpacity style={styles.retryButton} onPress={handleClick}>
      <Ionicons name="refresh" size={24} color="green" />
    </TouchableOpacity>
  );
};

export default RetryButton;
