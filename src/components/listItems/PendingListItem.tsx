import { Text, View, StyleSheet } from 'react-native';
import { Streak } from '../../shared/interfaces/general.interface';
import { useEffect, useState } from 'react';
import DeleteButton from './buttons/DeleteButton';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import PendingStreakButton from './buttons/PendingStreakButton';
import { selectOpenStreak } from '../../store/selectors/selectOpenStreak';
import { openStreak } from '../../store/slices/uiSlice';
import { parseTime, getTimeUntilStreakBroken } from '../../utils/timeUtils';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { listItemStyles as styles } from './listItemStyles';

const PendingListItem = ({ title, count, lastTimeUpdated: time, id }: Streak) => {
  const dispatch = useAppDispatch();
  const openStreakId = useAppSelector(selectOpenStreak);
  const [subtitle, setSubtitle] = useState({ timeLeft: 0, timeInterval: 'hours' });

  const handleTimeOperations = () => {
    const dateObj = new Date(time);
    const dueDate = getTimeUntilStreakBroken(dateObj);
    const { hours, minutes } = parseTime(dueDate);

    if (hours > 1) {
      setSubtitle({ timeLeft: hours, timeInterval: 'hours' });
    } else if (hours === 1) {
      setSubtitle({ timeLeft: hours, timeInterval: 'hours' });
    } else {
      setSubtitle({ timeLeft: minutes, timeInterval: 'minutes' });
    }

    if (dueDate.getTime() <= 0) {
      dispatch(changeStreakStatus({ id: id, status: 'broken' }));
    }
  };

  useEffect(() => {
    handleTimeOperations();
    const interval = setInterval(() => {
      handleTimeOperations();
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (id !== openStreakId) {
    }
  }, [openStreakId]);

  const renderRightActions = () => {
    // Your content for right swipe
    return (
      <View style={styles.deleteButtonContainer}>
        <DeleteButton id={id} />
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootFriction={8}
      onSwipeableOpen={() => dispatch(openStreak(id))}
      onSwipeableClose={() => dispatch(openStreak(''))}>
      <View style={styles.parentContainer}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textMain}>
            {title}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.textSecondary}>
            {subtitle.timeLeft} {subtitle.timeInterval} left
          </Text>
          <View style={styles.dayCountAndButtonContainer}>
            <Text style={styles.dayCount}>{count}</Text>
            <PendingStreakButton id={id} />
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default PendingListItem;
