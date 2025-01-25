import React from 'react';
import { Text, View, Animated } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { listItemStyles as styles } from '../styles/listItemStyles';
import { useAppDispatch } from '../../../../hooks';
import { openStreak } from '../../../store/slices/uiSlice';
import DeleteButton from '../buttons/DeleteButton';


const ListItem = ({
  title,
  count,
  subtitle,
  actionButton,
  backgroundColor,
  streak
}) => {
  const dispatch = useAppDispatch();



  return (
    <View>
      <ReanimatedSwipeable
        renderRightActions={() => (
          <View style={styles.deleteButtonContainer}>
            <DeleteButton streakUUID={streak.streakUUID} />
          </View>
        )}
        // Keep the swipe from going beyond a certain distance
        rightThreshold={80}
        // Disable overshoot
        overshootLeft={false}
        overshootRight={false}
        // Adjust friction so it doesn’t fling too far
        friction={1}
        onSwipeableOpen={() => dispatch(openStreak(streak.streakUUID))}
        onSwipeableClose={() => dispatch(openStreak(''))}
      >
        <View style={[styles.parentContainer, { backgroundColor }]}>
          <View style={styles.textContainer}>
            <Text 
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.textMain}
            >
              {title}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.textSecondary}>{subtitle}</Text>
            <View style={styles.dayCountAndButtonContainer}>
              <Text style={styles.dayCount}>{count}</Text>
              {actionButton && actionButton()}
            </View>
          </View>
        </View>
      </ReanimatedSwipeable>
    </View>
  );
};

export default ListItem;
