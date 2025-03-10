
import React, { useEffect, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
  View,
} from 'react-native';
import BrokenListItem from './items/BrokenListItem';
import CompleteListItem from './items/CompleteListItem';
import NewListItem from './items/NewListItem';
import { useAppSelector } from '../../../hooks';
import { selectAllLocalStreaks } from '../../store/selectors/localStreakSelectors';
import { isStreakCompletable } from '../../logic/time/streakTimeLogic';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Streak } from '../../shared/interfaces/streak.interface';
import ActiveListItem from './items/ActiveListItem';
import DraggableFlatList from 'react-native-draggable-flatlist'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ListContainer = () => {
  const localStreaks = useAppSelector(selectAllLocalStreaks);

  // Keep track of the old length so we can see if items are removed
  const previousLength = useRef(localStreaks.length);

  useEffect(() => {
    // If the new list is shorter than before, an item was removed
    if (localStreaks.length < previousLength.current) {
      // Trigger a layout animation
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    // Update ref to current length
    previousLength.current = localStreaks.length;
  }, [localStreaks]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={localStreaks}
        renderItem={({ item, index }) => <StreakListItem streak={item} index={index} />}
        keyExtractor={(item) => item.streakUUID}
        nestedScrollEnabled
        inverted
      />
    </GestureHandlerRootView>
  );
};

export default ListContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  beigeBackground: {
    backgroundColor: '#f5f5dc',
  },
});

const StreakListItem = ({ streak, index }: { streak: Streak; index: number }) => {
  const backgroundColor =
    index % 2 === 0
      ? styles.whiteBackground.backgroundColor
      : styles.beigeBackground.backgroundColor;

  const showActive = isStreakCompletable(streak);
  const Component = getComponentForStreak(streak, showActive);

  if (!Component) {
    console.error('No matching component for Streak:', streak);
    return null;
  }

  return <Component streak={streak} backgroundColor={backgroundColor} />;
};

const getComponentForStreak = (
  streak: Streak,
  showActive: boolean
): React.FC<{ streak: Streak; backgroundColor: string }> | null => {
  switch (streak.status) {
    case 'isReady':
      return NewListItem;
    case 'isActive':
      return showActive ? ActiveListItem : CompleteListItem;
    case 'isBroken':
      return BrokenListItem;
    default:
      return null;
  }
};
