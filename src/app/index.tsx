import { Link } from 'expo-router';
import ListContainer from '../components/list/ListContainer';
import { Button, View, StyleSheet } from 'react-native';
import { useAppDispatch } from '../../hooks';
import { useNavigation } from 'expo-router';
import { logOut, deleteAccount } from '../utils/auth/authActions';  // Import from new file

const HomeLayout = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  
  return (
    <View style={styles.container}>
      <ListContainer />
      <View style={styles.footer}>
        <Link
          href="/create"
          style={styles.linkButton}
        >
          Create
        </Link>
        <Button
          title='Logout'
          onPress={() => logOut(dispatch, navigation)}  // Use modularized function
        />
        <Button
          title='Delete Account'
          onPress={() => deleteAccount(dispatch, navigation)}  // Use modularized function
        />
      </View>
    </View>
  );
};



export default HomeLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  linkButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
    textAlign: 'center',
  },
});
