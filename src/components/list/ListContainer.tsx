import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ActiveListItem from '../listItems/PendingListItem';
import BrokenListItem from '../listItems/BrokenListItem';
import CompleteListItem from '../listItems/CompleteListItem';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { selectAllLocalStreaks } from '../../store/selectors/localStreakSelectors';
import { getIsStreakUIComplete } from '../../logic/time/streakTimeLogic';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Streak } from '../../shared/interfaces/streak.interface';

const ListContainer = () => {
  const dispatch = useAppDispatch();
  const localStreaks = useAppSelector(selectAllLocalStreaks);

  return (
    <GestureHandlerRootView>
      <FlatList
        data={localStreaks}
        renderItem={({ item, index }) => getListItemComponent(item, index)}
        keyExtractor={(item) => item.streakUUID}
        nestedScrollEnabled
      />
    </GestureHandlerRootView>
  );
};

export default ListContainer;

const styles = StyleSheet.create({
  whiteBackground: {
    backgroundColor: 'white',
  },
  beigeBackground: {
    backgroundColor: '#f5f5dc',
  },
});

const getListItemComponent = (streak: Streak, index: number) => {
  console.log('Rendering Streak:', streak);

  const backgroundColor = index % 2 === 0 ? styles.whiteBackground.backgroundColor : styles.beigeBackground.backgroundColor;
  const isStreakComplete = getIsStreakUIComplete();

  let Component;
  switch (streak.status) {
    case 'isReady':
    case 'isActive':
      Component = isStreakComplete ? CompleteListItem : ActiveListItem;
      break;
    case 'isBroken':
      Component = BrokenListItem;
      break;
    default:
      console.error('Could not determine List Item component for Streak:', streak);
      return null; // Handle unknown status gracefully
  }

  return (
    <View style={[styles.item, { backgroundColor }]}>
      <Component streak={streak} backgroundColor={backgroundColor} />
    </View>
  );
};