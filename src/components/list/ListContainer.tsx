import { FlatList, StyleSheet, View } from 'react-native';
import PendingListItem from '../listItems/PendingListItem';
import BrokenListItem from '../listItems/BrokenListItem';
import { useAppSelector } from '../../../hooks';
import { selectAllStreaks } from '../../store/selectors/selectAllStreaks';
import CompleteListItem from '../listItems/CompleteListItem';
import NewListItem from '../listItems/NewListItem';

const ListContainer = () => {
  const streaks = useAppSelector(selectAllStreaks);
  const colors = ['white', '#eeeeeef5'];

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
