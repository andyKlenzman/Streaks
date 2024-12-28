// Import necessary modules
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ActiveListItem from '../listItems/PendingListItem';
import BrokenListItem from '../listItems/BrokenListItem';
import { useAppSelector, useAppDispatch } from '../../../hooks'; 
import { fetchStreaks } from '../../store/slices/streaksSlice'; 
import { selectAllLocalStreaks } from '../../store/selectors/localStreakSelectors'; 
import CompleteListItem from '../listItems/CompleteListItem';
import NewListItem from '../listItems/NewListItem';
import { getIsStreakUIComplete } from '../../logic/time/streakTimeLogic';

const ListContainer = () => {
  const dispatch = useAppDispatch();

  const localStreaks = useAppSelector(selectAllLocalStreaks);


  //ToDo: centralize and check Streak UI state


  //ToDo: dentralize and check Streak state (if it is a default streak)



  // ToDo: restrict ListItems to Appearanc


  useEffect(() => {
    // ToDo: get shared streaks

    // ToDo: get local streak
    // switch (status) {
    //   case 'idle':
    //     dispatch(fetchStreaks());
    //     break;
    //   case 'loading':
    //     break;
    //   case 'succeeded':
    //     break;
    //   case 'error':
    //     break;
    //   default:
    //     break;
    // }

  }, [dispatch]);

  const colors = ['white', '#eeeeeef5'];


  // renders list items with rotating backgrounds



  return (
    <FlatList
      data={localStreaks}
      renderItem={({ item, index }) => {
        return (
          
            getListItemComponent(item)
          
        );
      }}
      keyExtractor={(item) => item.streakUUID}
      style={styles.list}
      nestedScrollEnabled={true}
    />
  );
};

export default ListContainer;

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
});



// handles all logic for UI component rendering
const getListItemComponent = (streak: Streak) => {
  console.log(streak)

  if(streak.isShared)
  {




  } else
  {

    switch (streak.status) {
      case 'isReady':
        return <NewListItem {...streak} />;
      case 'isActive':
        if(getIsStreakUIComplete())
        {
          return <CompleteListItem {...streak} />;
        } 
        else 
        {
          return <ActiveListItem {...streak} />;
        }

      case 'isBroken':
        return <BrokenListItem {...streak} />; 
        
      default:
        console.error("Could not determin List Item component for Streak")
        return 
    }






  }






};

