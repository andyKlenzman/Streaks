import { Text, TouchableOpacity, View } from 'react-native';
import ListButton from '../list/ListButton';
import { Streak } from '../../shared/interfaces/streak.interface';
import { StyleSheet } from 'react-native';
import DeleteButton from '../list/DeleteButton';
import RetryButton from './buttons/RetryButton';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { openStreak } from '../../store/slices/uiSlice';
import { selectOpenStreak } from '../../store/selectors/selectOpenStreak';
const BrokenListItem = ({ title, count, status, time, id }: Streak) => {
  const dispatch = useAppDispatch();
  const openStreakId = useAppSelector(selectOpenStreak);



  const handlePress = () => {
    dispatch(openStreak(id))

  }
  return (
    <TouchableOpacity onPress={handlePress} role="listitem" accessibilityLabel={'broken streak'}>
      <View style={styles.topContainer}>
      <View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textMain}>{title}</Text>
        <Text style={styles.textSecondary}>broken</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.dayCount}>{count}</Text>
        <RetryButton id={id} />
        </View>
      </View>
      {openStreakId === id ? (
        <View style={styles.bottomContainer}>
          <DeleteButton id={id} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default BrokenListItem;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // backgroundColor: 'lightblue',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textContainer: {
    flexDirection: 'row', // or 'column' based on your layout needs
    alignItems: 'center',

  },
  textMain: {
    fontSize: 24,
    fontWeight: '600',
    flex: 1,
    flexShrink: 1,
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
