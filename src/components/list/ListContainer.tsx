import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

import PendingListItem from '../listItems/ActiveListItem';
import BrokenListItem from '../listItems/BrokenListItem';
import CompleteListItem from '../listItems/CompleteListItem';
import NewListItem from '../listItems/NewListItem';


import { useAppSelector } from '../../../hooks';
import { selectAllLocalStreaks } from '../../store/selectors/localStreakSelectors';
import { getIsStreakUIComplete } from '../../logic/time/streakTimeLogic';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Streak } from '../../shared/interfaces/streak.interface';

const ListContainer = () => {
  const localStreaks = useAppSelector(selectAllLocalStreaks);

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={localStreaks}
        renderItem={({ item, index }) => (
          <StreakListItem streak={item} index={index} />
        )}
        keyExtractor={(item) => item.streakUUID}
        nestedScrollEnabled
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
  // Determine the background color for alternating rows
  const backgroundColor =
    index % 2 === 0
      ? styles.whiteBackground.backgroundColor
      : styles.beigeBackground.backgroundColor;

  // Determine if the streak is complete based on time state
  const isStreakComplete = getIsStreakUIComplete(streak);

  // Select the appropriate component based on streak status and completeness
  const Component = getComponentForStreak(streak, isStreakComplete);

  // Handle unknown or invalid statuses gracefully
  if (!Component) {
    console.error('Could not determine List Item component for Streak:', streak);
    return null;
  }

  return <Component streak={streak} backgroundColor={backgroundColor} />;
};

const getComponentForStreak = (
  streak: Streak,
  isStreakComplete: boolean
): React.FC<{ streak: Streak; backgroundColor: string }> | null => {
  switch (streak.status) {
    case 'isReady':
      return NewListItem;
      break;
    case 'isActive':
      return isStreakComplete ? CompleteListItem : PendingListItem;
    case 'isBroken':
      return BrokenListItem;
    default:
      return null; // Unknown status
  }
};
