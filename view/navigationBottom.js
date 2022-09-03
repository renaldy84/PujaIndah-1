import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';
import Home from './home';
import Profil from './profil';
import Ticketing from './ticketing';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {faComments, faHouse} from '@fortawesome/free-solid-svg-icons';

function LayananScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Layanan!</Text>
    </View>
  );
}

function ActivityScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Activity!</Text>
    </View>
  );
}

function AccountScreen() {
  const dispatch = useDispatch();
  const logout = async () => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
    });
    dispatch({type: 'RESPON_LOGOUT'});
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Account!</Text>
      <View>
        <TouchableOpacity onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function navigationBottom() {
  return (
    <Tab.Navigator backBehavior="none">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: null,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon
              size={RFPercentage(3.5)}
              icon={faHouse}
              color={color}
            />
            // <FontAwesome name="home" size={RFPercentage(3.5)} color={color} />
          ),
          tabBarInactiveTintColor: '#8E8E93',
          tabBarActiveTintColor: '#274799',
          tabBarStyle: {
            height: hp('8%'),
            // elevation: 10,
            marginTop: hp('0.2%'),
          },
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            marginTop: -hp('1%'),
            marginBottom: hp('1%'),
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Eticketing"
        component={Ticketing}
        options={{
          headerLeft: null,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon
              icon={faComments}
              size={RFPercentage(3.5)}
              color={color}
            />
          ),
          tabBarInactiveTintColor: '#8E8E93',
          tabBarActiveTintColor: '#274799',
          tabBarStyle: {
            height: hp('8%'),
            // elevation: 10,
            marginTop: hp('0.2%'),
          },
          tabBarLabel: 'Layanan e-ticketing',
          tabBarLabelStyle: {
            marginTop: -hp('1%'),
            marginBottom: hp('1%'),
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
      {/* <Tab.Screen
        name="Layanan"
        component={LayananScreen}
        options={{
          headerLeft: null,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <FontAwesome
              name="th-large"
              size={RFPercentage(3.5)}
              color={color}
            />
          ),
          tabBarInactiveTintColor: '#8E8E93',
          tabBarActiveTintColor: '#274799',
          tabBarStyle: {
            height: hp('8%'),
            // elevation: 10,
            marginTop: hp('0.2%'),
          },
          tabBarLabel: 'Layanan',
          tabBarLabelStyle: {
            marginTop: -hp('1%'),
            marginBottom: hp('1%'),
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      /> */}
      <Tab.Screen
        name="Account"
        component={Profil}
        options={{
          headerLeft: null,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <FontAwesome
              name="user-circle"
              size={RFPercentage(3.5)}
              color={color}
            />
          ),
          tabBarInactiveTintColor: '#8E8E93',
          tabBarActiveTintColor: '#274799',
          tabBarStyle: {
            height: hp('8%'),
            // elevation: 10,
            marginTop: hp('0.2%'),
          },
          tabBarLabel: 'Account',
          tabBarLabelStyle: {
            marginTop: -hp('1%'),
            marginBottom: hp('1%'),
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default navigationBottom;
