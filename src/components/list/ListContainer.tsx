// Import necessary modules
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import PendingListItem from '../listItems/PendingListItem';
import BrokenListItem from '../listItems/BrokenListItem';
import { useAppSelector, useAppDispatch } from '../../../hooks'; 
import { fetchStreaks } from '../../store/slices/streaksSlice'; 
import { selectAllStreaks } from '../../store/selectors/localStreakSelectors'; 
import CompleteListItem from '../listItems/CompleteListItem';
import NewListItem from '../listItems/NewListItem';

const ListContainer = () => {

  const dispatch = useAppDispatch();




  // Local Streaks
  const localStreaks = useAppSelector(selectAllStreaks);


  //ToDo: centralize and check Streak UI state


  //ToDo: dentralize and check Streak state (if it is a default streak)



  // ToDo: restrict ListItems to Appearanc


  
  useEffect(() => {
    // ToDo: get shared streaks



    // ToDo: get local streak
    switch (status) {
      case 'idle':
        dispatch(fetchStreaks());
        break;
      case 'loading':
        break;
      case 'succeeded':
        break;
      case 'error':
        break;
      default:
        break;
    }

  }, [dispatch]);

  const colors = ['white', '#eeeeeef5'];


  return (
    <FlatList
      data={localStreaks}
      renderItem={({ item, index }) => {
        let component;
        switch (item.status) {
          case 'complete':
            component = <CompleteListItem {...item} />;
            break;
          case 'pending':
            if (item.count === 0) {
              component = <NewListItem {...item} />;
              break;
            }
            component = <PendingListItem {...item} />;
            break;
          case 'broken':
            component = <BrokenListItem {...item} />;
            break;
          default:
            return null;
        }

        return (
          <View style={{ backgroundColor: colors[index % colors.length] }}>
            {component}
          </View>
        );
      }}
      keyExtractor={(item) => item.id}
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
