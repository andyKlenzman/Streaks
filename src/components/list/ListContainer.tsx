import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import PendingListItem from '../listItems/PendingListItem';
import BrokenListItem from '../listItems/BrokenListItem';
import { useAppSelector, useAppDispatch } from '../../../hooks'; // Assumes you have hooks for dispatch and selector
import  {fetchStreaks} from '../../store/slices/streaksSlice'; 
import { selectAllStreaks } from '../../store/selectors/selectAllStreaks'; // Assuming you have this selector
import CompleteListItem from '../listItems/CompleteListItem';
import NewListItem from '../listItems/NewListItem';

const ListContainer = () => {
  const dispatch = useAppDispatch();
  const streaks = useAppSelector(selectAllStreaks);
  const status = useAppSelector((state) => state.streaks.status); // Get the loading status
  const error = useAppSelector((state) => state.streaks.error); // Get any error if exists
  
  // Dispatch fetchStreaks when component mounts
  useEffect(() => {
    console.log("Running useEffect in ListContainer. Status: ", status)

    if (status === 'idle') {
      dispatch(fetchStreaks());
    }



  }, [status, dispatch]);

  const colors = ['white', '#eeeeeef5'];

  // Handle loading state
  if (status === 'loading') {
    return <Text>Loading streaks...</Text>;
  }

  // Handle error state
  if (status === 'failed') {
    return <Text>Error fetching streaks: {error}</Text>;
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

        return <View style={{ backgroundColor: colors[index % colors.length] }}>{component}</View>;
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
});
