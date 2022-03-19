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
import lupaPassword from './view/lupaPassword';
import daftarAkun from './view/daftarAkun';
import carouselHeader from './view/carousel';
import navigationBottom from './view/navigationBottom';
import menuTrantibum from './view/Trantibum/menuTrantibum';
import BuatPengaduan from './view/Trantibum/buatPengaduan';
import PeringatanDini from './view/Trantibum/peringatanDini';
import RiwayatPengaduan from './view/Trantibum/riwayatPengaduan';
import ListPariwisata from './view/Pariwisata/listPariwisata';
import DetailPariwisata from './view/Pariwisata/detailPariwisata';

const Stack = createStackNavigator();
function SettingNav() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="NavigationBottom"
          component={navigationBottom}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MenuTrantibum"
          component={menuTrantibum}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PeringatanDini"
          component={PeringatanDini}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BuatPengaduan"
          component={BuatPengaduan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RiwayatPengaduan"
          component={RiwayatPengaduan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ListPariwisata"
          component={ListPariwisata}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DetailPariwisata"
          component={DetailPariwisata}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
          name="CarouselHeader"
          component={carouselHeader}
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
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
          name="LupaPassword"
          component={lupaPassword}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
          name="DaftarAkun"
          component={daftarAkun}
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
            <Stack.Screen name="NavigationBottom" component={SettingNav} />
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
