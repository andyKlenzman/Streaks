import { Text, View } from 'react-native';
import ListButton from '../list/ListButton';
import { Streak } from '../../shared/interfaces/streak.interface';
import { StyleSheet } from 'react-native';
import DeleteButton from '../list/DeleteButton';
import RetryButton from './buttons/RetryButton';

const BrokenListItem = ({ title, count, status, time, id }: Streak) => {
  return (
    <View style={styles.container} role="listitem" accessibilityLabel={'broken streak'}>
      <View>
        <Text style={styles.textMain}>{title}</Text>
        <Text style={styles.textSecondary}>broken</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.dayCount}>{count}</Text>
        {/* <ListButton status={status} /> */}
        <RetryButton id={id} />
        {/* <DeleteButton id={id} /> */}
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
  textMain: {
    fontSize: 24,
    fontWeight: '600',
  },
  textSecondary: {
    fontSize: 20,
    color: 'grey',
  },
  dayCount: {
    fontSize: 24,
    marginRight: 15,
  },
});
