import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './home';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

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
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Account!</Text>
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
            <FontAwesome name="home" size={30} color={color} />
          ),
          tabBarInactiveTintColor: '#8E8E93',
          tabBarActiveTintColor: '#0323C4',
          tabBarStyle: {height: 70},
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            marginTop: -10,
            marginBottom: 15,
          },
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          headerLeft: null,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <FontAwesome name="clock" size={30} color={color} />
          ),
          tabBarInactiveTintColor: '#8E8E93',
          tabBarActiveTintColor: '#0323C4',
          tabBarStyle: {height: 70},
          tabBarLabel: 'Activity',
          tabBarLabelStyle: {
            marginTop: -10,
            marginBottom: 15,
          },
        }}
      />
      <Tab.Screen
        name="Layanan"
        component={LayananScreen}
        options={{
          headerLeft: null,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <FontAwesome name="th-large" size={30} color={color} />
          ),
          tabBarInactiveTintColor: '#8E8E93',
          tabBarActiveTintColor: '#0323C4',
          tabBarStyle: {height: 70},
          tabBarLabel: 'Layanan',
          tabBarLabelStyle: {
            marginTop: -10,
            marginBottom: 15,
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerLeft: null,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <FontAwesome name="user-circle" size={30} color={color} />
          ),
          tabBarInactiveTintColor: '#8E8E93',
          tabBarActiveTintColor: '#0323C4',
          tabBarStyle: {height: 70},
          tabBarLabel: 'Account',
          tabBarLabelStyle: {
            marginTop: -10,
            marginBottom: 15,
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default navigationBottom;
