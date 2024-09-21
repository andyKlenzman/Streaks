import Swipeable from 'react-native-gesture-handler/Swipeable';
import RetryButton from './buttons/RetryButton';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Streak } from '../../shared/interfaces/general.interface';
import { useEffect } from 'react';
import DeleteButton from './buttons/DeleteButton';
import { changeStreakStatus } from '../../store/slices/streaksSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectOpenStreak } from '../../store/selectors/selectOpenStreak';
import { openStreak } from '../../store/slices/uiSlice';
import CompleteButton from './buttons/CompleteButton';
import { getTimeUntilStatusChange } from '../../utils/timeUtils';
import { listItemStyles as styles } from './listItemStyles';

const CompleteListItem = ({ title, count, lastTimeUpdated: time, id }: Streak) => {
  const dispatch = useAppDispatch();
  const openStreakId = useAppSelector(selectOpenStreak);

  const handleTimeOperations = () => {
    const timeUntilStatusChange = getTimeUntilStatusChange(time);

    //the status of the streak will be changed when time expires, and pending list item will be rendered
    if (timeUntilStatusChange.getTime() <= 0) {
      dispatch(changeStreakStatus({ id: id, status: 'pending' }));
    }
  };

  //this function allows for the list item to open and close to reveal more functionality when selected
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
          <Text style={styles.textSecondary}>complete</Text>

          <View style={styles.dayCountAndButtonContainer}>
            <Text style={styles.dayCount}>{count}</Text>
            <CompleteButton />
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default CompleteListItem;
