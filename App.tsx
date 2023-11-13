import { SafeAreaView } from 'react-native';
import ListContainer from './src/components/list/ListContainer';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaView>
      <ListContainer />
    </SafeAreaView>
    </Provider>

  );
}

