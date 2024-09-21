import { Text, View, StyleSheet } from 'react-native';
import { Streak } from '../../shared/interfaces/general.interface';
import DeleteButton from './buttons/DeleteButton';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectOpenStreak } from '../../store/selectors/selectOpenStreak';
import { openStreak } from '../../store/slices/uiSlice';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { listItemStyles as styles } from './listItemStyles';
import PendingStreakButton from './buttons/PendingStreakButton';

const NewListItem = ({ title, count, id }: Streak) => {
  const dispatch = useAppDispatch();
  const openStreakId = useAppSelector(selectOpenStreak);

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
          <Text style={styles.textSecondary}>press to start streak</Text>
          <View style={styles.dayCountAndButtonContainer}>
            <Text style={styles.dayCount}>{count}</Text>
            <PendingStreakButton id={id} />
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default NewListItem;
