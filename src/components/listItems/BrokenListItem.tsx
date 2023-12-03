import { Text, View } from 'react-native';
import ListButton from '../list/ListButton';
import { Streak } from '../../shared/interfaces/streak.interface';
import { StyleSheet } from 'react-native';
import DeleteButton from '../list/DeleteButton';

const BrokenListItem = ({ title, count, status, time, id }: Streak) => {
  return (
    <View style={styles.container} role="listitem" accessibilityLabel={'broken streak'}>
      <Text style={styles.text}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.dayCount}>{count}</Text>
        <ListButton status={status} />
        <DeleteButton id={id} />
      </View>
    </View>
  );
};

export default BrokenListItem;

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
    backgroundColor: 'dark-grey',
  },
  text: {
    fontSize: 24,
  },
  dayCount: {
    fontSize: 24,
    marginRight: 15,
  },
});
