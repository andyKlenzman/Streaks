import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { listItemStyles as styles } from './listItemStyles';




const ListItem = ({ 
  title, 
  count, 
  subtitle, 
  renderRightActions, 
  renderActionButton, 
  onSwipeableOpen, 
  onSwipeableClose 
}) => {




  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootFriction={8}
      onSwipeableOpen={onSwipeableOpen}
      onSwipeableClose={onSwipeableClose}
    >
      <View style={styles.parentContainer}>
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
    </Swipeable>
  );
};

export default ListItem;


