import React from 'react';
import { Text, View } from 'react-native';
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

  const renderRightActions = () => {
    return (
      <View style={styles.deleteButtonContainer}>
        <DeleteButton streakUUID={streak.streakUUID} />
      </View>
    );
  };
  
  return (
    <View >
      <ReanimatedSwipeable
        renderRightActions={renderRightActions}
        overshootFriction={12}
        onSwipeableOpen={() => dispatch(openStreak(streak.streakUUID))}
        onSwipeableClose={() => dispatch(openStreak(''))}
      >
        <View style={[styles.parentContainer, { backgroundColor: backgroundColor} ]}>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textMain}>
              {title}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.textSecondary}>{subtitle}</Text>
            <View style={styles.dayCountAndButtonContainer}>
              <Text style={styles.dayCount}>{count}</Text>
              {actionButton()}
            </View>
          </View>
        </View>
      </ReanimatedSwipeable>
    </View>
  );
  
};

export default ListItem;


