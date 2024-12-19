// Import necessary modules
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import PendingListItem from '../listItems/PendingListItem';
import BrokenListItem from '../listItems/BrokenListItem';
import { useAppSelector, useAppDispatch } from '../../../hooks'; 
import { fetchStreaks } from '../../store/slices/streaksSlice'; 
import { selectAllStreaks } from '../../store/selectors/selectAllStreaks'; 
import CompleteListItem from '../listItems/CompleteListItem';
import NewListItem from '../listItems/NewListItem';

const ListContainer = () => {
  const dispatch = useAppDispatch();
  const streaks = useAppSelector(selectAllStreaks);
  const status = useAppSelector((state) => state.streaks.status); 
  const error = useAppSelector((state) => state.streaks.error); 
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStreaks());
    }
  }, [status, dispatch]);

  const colors = ['white', '#eeeeeef5'];

  // Handle loading state
  if (status === 'loading') {
    return (
      <View style={styles.list}>
        <Text style={styles.text}>Loading streaks...</Text>
      </View>
    );
  }

  // Handle error state
  if (status === 'failed') {
    return (
      <View style={styles.list}>
        <Text style={styles.text}>Error fetching streaks: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={streaks}
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
