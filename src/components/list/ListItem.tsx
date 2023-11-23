import { Text, View } from 'react-native';
import ListButton from './ListButton';
import { StreakStatus } from '../../shared/interfaces/streak.interface';
import { StyleSheet } from 'react-native';

interface ListItemProps {
  title: string;
  count: number;
  status: StreakStatus;
} /* use `interface` if exporting so that consumers can extend */

const ListItem = ({ title, count, status }: ListItemProps) => {
  let conditionalStyles;
  if (status === 'pending') {
    conditionalStyles = { backgroundColor: 'lightgrey' };
  } else if (status === 'broken') {
    conditionalStyles = { backgroundColor: 'darkgrey' };
  } else if (status === 'complete') {
    conditionalStyles = { backgroundColor: 'white' };
  }
  return (
    <View style={[styles.container, conditionalStyles]}>
      <Text style={styles.text}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.dayCount}>{count}</Text>
        <ListButton status={status} />
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    fontSize: 24,
  },
  dayCount: {
    fontSize: 24,
    marginRight: 15,
  },
});
