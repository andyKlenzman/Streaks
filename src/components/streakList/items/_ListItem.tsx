import React, { useRef, useEffect } from 'react';
import { Text, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { openStreak } from '../../../store/slices/uiSlice';
import DeleteButton from '../buttons/DeleteButton';
import { listItemStyles as styles } from '../styles/listItemStyles';

const ListItem = ({
  title,
  count,
  subtitle,
  actionButton,
  backgroundColor,
  streak,
}) => {
  const dispatch = useAppDispatch();
  const openStreakId = useAppSelector((state) => state.ui);

  // Ref to programmatically control closing
  const swipeableRef = useRef<ReanimatedSwipeable>(null);

  // Automatically close this item if a different streak is opened
  useEffect(() => {
    if (openStreakId && openStreakId !== streak.streakUUID) {
      swipeableRef.current?.close();
    }
  }, [openStreakId, streak.streakUUID]);

  return (
    <View>
      <ReanimatedSwipeable
        ref={swipeableRef}
        renderRightActions={() => (
          <View style={styles.deleteButtonContainer}>
            <DeleteButton streakUUID={streak.streakUUID} />
          </View>
        )}
        rightThreshold={0}

        overshootLeft={false}
        overshootRight={false}
        onSwipeableOpenStartDrag={() => dispatch(openStreak(streak.streakUUID))}
        onSwipeableClose={() => dispatch(openStreak(''))}
      >
        <View style={[styles.parentContainer, { backgroundColor }]}>
          {/* Top row (centered title) */}
          <View style={styles.topContainer}>
            <Text
              style={styles.textMain}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          </View>

          {/* Bottom row (subtitle on left, count + optional button on right) */}
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


export default ListItem;
// listItemStyles.ts
import { StyleSheet } from 'react-native';

export const listItemStyles = StyleSheet.create({
  parentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  topContainer: {
    // Center the title horizontally and reduce spacing
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  bottomContainer: {
    // Place subtitle on the left, day count & action button on the right
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textMain: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  textSecondary: {
    fontSize: 14,
    color: '#666',
  },
  dayCountAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayCount: {
    marginRight: 8,
    fontSize: 14,
    color: '#333',
  },
  deleteButtonContainer: {
    // Style for the delete area
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    backgroundColor: '#e74c3c',
  },
});
