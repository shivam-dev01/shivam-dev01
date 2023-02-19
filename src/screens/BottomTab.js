import React, {useEffect, useRef} from 'react';
import {Image, Animated} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FilePaths} from '../constants/filepath';
import AdminLanding from './AdminLanding';
import Reports from './Reports';
import Profile from './Profile';
import Notification from './Notification';
import NetworkInfo from '../components/NetworkInfo';
import {CssVariables} from '../constants/CssVariables';

const Tab = createBottomTabNavigator();
export default function BottomTab() {
  useEffect(() => {
    fadeIn();
  }, []);
  const fadeAnim = useRef(new Animated.Value(-1200)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let lableImage;
            if (route.name === 'AdminLanding') {
              lableImage = focused ? FilePaths.focusehome : FilePaths.home;
            } else if (route.name === 'Reports') {
              lableImage = focused
                ? FilePaths.focusereport
                : FilePaths.breports;
            } else if (route.name === 'Notification') {
              lableImage = focused
                ? FilePaths.focusednotification
                : FilePaths.notification;
            } else if (route.name === 'Profile') {
              lableImage = focused
                ? FilePaths.focuseprofile
                : FilePaths.profiles;
            }
            return (
              <Animated.Image
                source={lableImage}
                style={{
                  width: 24,
                  height: 24,
                  // opacity: fadeAnim,
                  transform: [
                    {
                      translateX: fadeAnim,
                    },
                  ],
                }}
              />
            );
          },
        })}>
        <Tab.Screen
          name="AdminLanding"
          component={AdminLanding}
          options={{
            // title: null,
            // headerTitleStyle: {
            //   color: CssVariables.white,
            //   fontFamily: CssVariables.mulishmedium,
            // },
            // headerTitleAlign: 'center',
            // headerStyle: {
            //   backgroundColor: CssVariables.darkgreen,
            // },
            headerShown: false,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Reports"
          component={Reports}
          options={{
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarShowLabel: false,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: () => (
              <Image
                style={{width: 125, height: 30}}
                source={FilePaths.netclacklogo}
                resizeMode="contain"
              />
            ),
            headerStyle: {
              backgroundColor: CssVariables.highdarkgreen,
            },
            headerLeft: () => {
              return null;
            },
            tabBarShowLabel: false,
          }}
        />
      </Tab.Navigator>
      <NetworkInfo />
    </>
  );
}
