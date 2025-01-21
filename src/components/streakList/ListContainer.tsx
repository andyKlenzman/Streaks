import React from 'react';
import { FlatList, StyleSheet} from 'react-native';
import BrokenListItem from './items/BrokenListItem';
import CompleteListItem from './items/CompleteListItem';
import NewListItem from './items/NewListItem';
import { useAppSelector } from '../../../hooks';
import { selectAllLocalStreaks } from '../../store/selectors/localStreakSelectors';
import { isStreakCompletable } from '../../logic/time/streakTimeLogic';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Streak } from '../../shared/interfaces/streak.interface';
import ActiveListItem from './items/ActiveListItem';

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
  // alternating background color
  const backgroundColor =
    index % 2 === 0
      ? styles.whiteBackground.backgroundColor
      : styles.beigeBackground.backgroundColor;

  const showActive = isStreakCompletable(streak);

  const Component = getComponentForStreak(streak, showActive);

  if (!Component) 
  {
    console.error('Could not determine List Item component for Streak:', streak);
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
      break;
    case 'isActive':
      return showActive ? ActiveListItem : CompleteListItem;
    case 'isBroken':
      return BrokenListItem;
    default:
      return null; // Unknown status
  }
};
