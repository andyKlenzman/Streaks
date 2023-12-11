import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Streak } from '../../shared/interfaces/streak.interface';
import DeleteButton from './buttons/DeleteButton';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import PendingStreakButton from './buttons/PendingStreakButton';
import { selectOpenStreak } from '../../store/selectors/selectOpenStreak';
import { openStreak } from '../../store/slices/uiSlice';

const NewListItem = ({ title, count, id }: Streak) => {
  const dispatch = useAppDispatch();
  const openStreakId = useAppSelector(selectOpenStreak);

  const handlePress = () => {
    dispatch(openStreak(id));
  };

  return (
    <TouchableOpacity onPress={handlePress} role="listitem" accessibilityLabel={`pending streak`}>
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textMain}>
            {title}
          </Text>
          <Text style={styles.textSecondary}>Do your behavior and set your streak!</Text>
        </View>
        <View style={styles.dayCountAndButtonContainer}>
          <Text style={styles.dayCount}>{count}</Text>
          <PendingStreakButton id={id} />
        </View>
      </View>
      {/* EXTENDED MENU */}
      {openStreakId === id ? (
        <View style={styles.bottomContainer}>
          <DeleteButton id={id} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default NewListItem;

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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textContainer: {
    maxWidth: '70%',
  },
  textMain: {
    fontSize: 24,
    fontWeight: '600',
    flexShrink: 1,
  },
  textSecondary: {
    fontSize: 20,
    color: 'grey',
  },
  dayCountAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayCount: {
    fontSize: 24,
    marginRight: 15,
  },
});
