import { FlatList } from 'react-native';
import PendingListItem from '../listItems/PendingListItem';
import BrokenListItem from '../listItems/BrokenListItem';
import { useAppSelector } from '../../../hooks';
import { selectAllStreaks } from '../../store/selectors/selectAllStreaks';
import { StyleSheet } from 'react-native';

const ListContainer = () => {
  const streaks = useAppSelector(selectAllStreaks);

  return (
    <FlatList
      data={streaks}
      renderItem={({ item }) => {
        switch (item.status) {
          case 'pending':
            return <PendingListItem {...item} />;
          case 'broken':
            return <BrokenListItem {...item} />;
          default:
            return null;
        }
      }}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  );
};

export default ListContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
