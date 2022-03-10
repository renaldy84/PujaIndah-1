/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import MenuAwal from './view/menuAwal.js';
import Login from './view/login';
import HomePage from './view/home';
import psikiater from './view/psikiater';
import history from './view/history';

const Stack = createStackNavigator();
function SettingNav() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomePage}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'rgb(188, 89, 213)',
            },
          }}
          name="Psikiater"
          component={psikiater}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'rgb(188, 89, 213)',
            },
          }}
          name="History"
          component={history}
        />
      </Stack.Navigator>
    </>
  );
}

function SettingNavAwal() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MenuAwal"
          component={MenuAwal}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'rgb(188, 89, 213)',
            },
          }}
          name="Login"
          component={Login}
        />
        {/* <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'rgb(188, 89, 213)',
            },
          }}
          name="History"
          component={history}
        /> */}
      </Stack.Navigator>
    </>
  );
}
const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 500});
  }, []);

  const LOGIN = useSelector(state => state.auth.status);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {LOGIN ? (
          <>
            <Stack.Screen name="Home" component={SettingNav} />
          </>
        ) : (
          <>
            <Stack.Screen name="MenuAwal" component={SettingNavAwal} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
