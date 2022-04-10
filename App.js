/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Axios from 'axios';
import url from './config';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import MenuAwal from './view/menuAwal.js';
import Login from './view/login';
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
import UlasanPariwisata from './view/Pariwisata/ulasanPariwisata';
import SplashScreen from './view/splashScreen';
const CancelToken = Axios.CancelToken;
const Stack = createStackNavigator();

function Loading() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
}
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
          name="UlasanPariwisata"
          component={UlasanPariwisata}
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
  const token = useSelector(state => state.auth.authToken);
  console.log('ini Token', token);
  // const isLoading = useSelector(state => state.auth.isLoading);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const init = async () => {
    let email = await AsyncStorage.getItem('email');
    let password = await AsyncStorage.getItem('password');
    Axios({
      url: url + '/api/auth/login',
      method: 'post',
      data: {
        email: email,
        password: password,
      },
    })
      .then(async res => {
        // console.log('>>>>>>>>>>>>>>>', res.data.data.api_token);
        await AsyncStorage.setItem('token', res.data.data.api_token);
        dispatch({type: 'LOGIN', payload: res.data.data.api_token});
        dispatch({type: 'RESPON_LOGIN', payload: res.data.data});
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(async error => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
        // console.log('AAAAAAAAAAAAAAA');
        dispatch({type: 'LOGOUT'});
        dispatch({type: 'RESPON_LOGOUT'});
        await AsyncStorage.clear();
      });
  };

  useEffect(() => {
    console.log(token);
    init();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {loading ? (
          <Stack.Screen name="Loading" component={Loading} />
        ) : token === null ? (
          <>
            <Stack.Screen name="MenuAwal" component={SettingNavAwal} />
          </>
        ) : (
          <>
            <Stack.Screen name="NavigationBottom" component={SettingNav} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
