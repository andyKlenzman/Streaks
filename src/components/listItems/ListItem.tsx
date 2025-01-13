import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { listItemStyles as styles } from './listItemStyles';

const ListItem = ({
  title,
  count,
  subtitle,
  renderRightActions,
  renderActionButton,
  onSwipeableOpen,
  onSwipeableClose,
  backgroundColor
}) => {
  return (
    <ReanimatedSwipeable
      renderRightActions={renderRightActions}
      overshootFriction={8}
      onSwipeableOpen={onSwipeableOpen}
      onSwipeableClose={onSwipeableClose}
    >
      <View style={[styles.parentContainer, { backgroundColor }]}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textMain}>
            {title}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.textSecondary}>{subtitle}</Text>
          <View style={styles.dayCountAndButtonContainer}>
            <Text style={styles.dayCount}>{count}</Text>
            {renderActionButton && renderActionButton()}
          </View>
        </View>
      </View>
    </ReanimatedSwipeable>
  );
};

export default ListItem;

// Optionally add styles for swipeable actions
const actionStyles = StyleSheet.create({
  rightAction: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'red',
    height: '100%',
    padding: 20,
  },
});
