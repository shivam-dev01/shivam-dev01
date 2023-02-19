import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import LandingPage from '../screens/LandingPage';
import Wallet from './Wallet';
import History from './History';
import Profile from './Profile';
import Icons from 'react-native-vector-icons/Ionicons';
import {CssVariables} from '../constants/CssVariables';
const Tab = createBottomTabNavigator();
export default function Home() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'LandingPage') {
              iconName = 'home';
              size = focused ? 30 : 25;
              color = focused ? '#036BB9' : '#887A76';
            } else if (route.name === 'Wallet') {
              iconName = 'wallet';
              size = focused ? 30 : 25;
              color = focused ? '#036BB9' : '#887A76';
            } else if (route.name === 'History') {
              iconName = 'swap-horizontal';
              size = focused ? 30 : 25;
              color = focused ? '#036BB9' : '#887A76';
            } else if (route.name === 'Profile') {
              iconName = 'person-circle';
              size = focused ? 33 : 28;
              color = focused ? '#036BB9' : '#887A76';
            }
            return <Icons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen
          name="LandingPage"
          component={LandingPage}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            title: 'Home',
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={Wallet}
          options={{
            title: 'Wallet',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: CssVariables.readex_font,
              alignSelf: 'center',
            },
            tabBarShowLabel: false,
            headerTintColor: CssVariables.black_color,
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarShowLabel: false,
            //   headerStyle: {
            //     backgroundColor: 'rgba(125, 217, 36, 1)',
            //   },
            //   headerTitleStyle: {
            //     fontFamily: CssVariables.popins_regular,
            //     alignSelf: 'center',
            //   },
            //   headerTintColor: CssVariables.white_color,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarShowLabel: false,
            title: 'Profile',
            //   headerStyle: {
            //     backgroundColor: 'rgba(125, 217, 36, 1)',
            //   },
            //   headerTitleStyle: {
            //     fontFamily: CssVariables.popins_regular,
            //   },
            //   headerTintColor: CssVariables.white_color,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
