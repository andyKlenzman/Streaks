import { TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StreakStatus } from '../../shared/interfaces/streak.interface';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

interface ListButtonProps {
  status: StreakStatus;
}

const ListButton: FC<ListButtonProps> = ({ status }) => {
  let icon;
  const handleClick = () => {};

  if (status === 'complete') {
    icon = (
      <TouchableOpacity style={styles.successIcon} onPress={handleClick}>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      </TouchableOpacity>
    );
  }
  if (status === 'broken') {
    icon = (
      <>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Ionicons name="md-refresh" size={32} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Ionicons name="md-trash" size={32} color="red" />
        </TouchableOpacity>
      </>
    );
  }
  if (status === 'pending') {
    icon = (
      <TouchableOpacity style={styles.pendingButton} onPress={handleClick}>
        <MaterialCommunityIcons name="timer-sand-complete" size={32} color="blue" />
      </TouchableOpacity>
    );
  }
  return icon;
};

export default ListButton;

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
