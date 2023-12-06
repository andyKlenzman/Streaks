import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Streak } from '../../shared/interfaces/streak.interface';
import { useEffect, useState } from 'react';
import DeleteButton from './buttons/DeleteButton';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import PendingStreakButton from './buttons/PendingStreakButton';
import { selectOpenStreak } from '../../store/selectors/selectOpenStreak';
import { openStreak } from '../../store/slices/uiSlice';
import { parseTime, getTimeUntilStreakBroken } from '../../utils/timeUtils';

const PendingListItem = ({ title, count, time, id }: Streak) => {
  const dispatch = useAppDispatch();
  const openStreakId = useAppSelector(selectOpenStreak);
  const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const handleTimeOperations = () => {
    const dueDate = getTimeUntilStreakBroken(time);
    const { hours, minutes, seconds } = parseTime(dueDate);
    setRemainingTime({ hours, minutes, seconds });

    if (dueDate.getTime() <= 0) {
      dispatch(changeStreakStatus({ id: id, status: 'broken' }));
    }
  };
  const handlePress = () => {
    dispatch(openStreak(id));
  };

  useEffect(() => {
    handleTimeOperations();
    const interval = setInterval(() => {
      handleTimeOperations();
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <TouchableOpacity onPress={handlePress} role="listitem" accessibilityLabel={`pending streak`}>
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textMain}>
            {title}
          </Text>
          <Text style={styles.textSecondary}>
            {remainingTime.hours} hr {remainingTime.minutes} min {remainingTime.seconds} sec
          </Text>
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

export default PendingListItem;

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
    flexShrink: 1, // Allow text to shrink if it exceeds available space
    // Adjust the percentage based on your layout needs
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
