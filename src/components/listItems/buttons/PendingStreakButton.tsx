import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch } from '../../../../hooks';
import { completeStreak } from '../../../store/slices/streaksSlice';
import { buttonStyles as styles } from '../buttonStyles';

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
      <MaterialCommunityIcons name="timer-sand-complete" size={24} color="#2282FF" />
    </TouchableOpacity>
  );
};

export default PendingStreakButton;
