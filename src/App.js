import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppNavigator from './navigators/AppNavigator';
import { loadUserData } from './redux/reducers/auth';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs()

const App = () => {
    useEffect(() => {
        store.dispatch(loadUserData())
    }, [])
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;