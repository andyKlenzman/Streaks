import { FlatList } from 'react-native';
import ListItem from './ListItem';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectAllStreaks } from '../../store/selectors/selectAllStreaks';
import { StyleSheet } from 'react-native';

const ListContainer = () => {
  const streaks = useAppSelector(selectAllStreaks);

  return (
    <FlatList
      data={streaks}
      renderItem={({ item }) => <ListItem {...item} />}
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
