import { Text, View, StyleSheet } from 'react-native';
import { Streak } from '../../shared/interfaces/streak.interface';
import { useEffect } from 'react';
import DeleteButton from './buttons/DeleteButton';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectOpenStreak } from '../../store/selectors/selectOpenStreak';
import { openStreak } from '../../store/slices/uiSlice';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RetryButton from './buttons/RetryButton';
import { listItemStyles as styles } from './listItemStyles';

const BrokenListItem = ({ title, count, id }: Streak) => {
  const dispatch = useAppDispatch();
  const openStreakId = useAppSelector(selectOpenStreak);

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
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textMain}>
            {title}
          </Text>
          <Text style={styles.textSecondary}>broken</Text>
        </View>
        <View style={styles.dayCountAndButtonContainer}>
          <Text style={styles.dayCount}>{count}</Text>
          <RetryButton id={id} />
        </View>
      </View>
    </Swipeable>
  );
};

export default BrokenListItem;
