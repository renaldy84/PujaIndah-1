/**
 * @format
 */
import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import store from './redux/store';
import {Provider} from 'react-redux';

const Root = () => {
  return (
    <Provider store={store}>
      <StatusBar animated={true} backgroundColor="#0323C4" />
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
