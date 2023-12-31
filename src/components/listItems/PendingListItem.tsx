import { Text, TouchableOpacity, View } from 'react-native';
import { Streak } from '../../shared/interfaces/streak.interface';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteButton from '../list/DeleteButton';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import PendingStreakButton from './buttons/PendingStreakButton';
import { selectOpenStreak } from '../../store/selectors/selectOpenStreak';
import { openStreak } from '../../store/slices/uiSlice';
import { calculateRemainingTime } from '../../utils/calculateRemainingTime';
import { calculateDueDate } from '../../utils/calculateRemainingTime';
import { parseDate } from '../../utils/calculateRemainingTime';
const PendingListItem = ({ title, count, status, time, id }: Streak) => {
  const [remainingTime, setRemainingTime] = useState({ date: 0, hours: 0, mins: 0, secs: 0 });
  const [dueDate, setDueDate] = useState('');
  const openStreakId = useAppSelector(selectOpenStreak);

  const dispatch = useAppDispatch();
  const handleTimeOperations = () => {
    const dueDate = calculateDueDate(time);
    const { timeDeltaObj, timeDeltaUTC } = calculateRemainingTime(dueDate);

    const { date, hours, mins, secs } = parseDate(timeDeltaObj);
    setRemainingTime({ date, hours, mins, secs });
    setDueDate(dueDate.toString());
    if (timeDeltaUTC <= 0) {
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
            {remainingTime.date} day {remainingTime.hours} hr {remainingTime.mins} min{' '}
            {remainingTime.secs} sec
          </Text>
          <Text style={styles.textSecondary}>{dueDate}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
    // backgroundColor: 'lightblue',
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
  dayCount: {
    fontSize: 24,
    marginRight: 15,
  },
});
