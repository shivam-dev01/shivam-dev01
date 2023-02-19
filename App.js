import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import VerificationScreen from './src/screens/VerificationScreen';
import RegisteredDone from './src/screens/RegisteredDone';
import Home from './src/screens/Home';
import {LogBox} from 'react-native';
import ForgotPassword from './src/screens/ForgotPassword';
import ResetPassword from './src/screens/ResetPassword';
import MobileRecharge from './src/screens/MobileRecharge';
import BookCylinder from './src/screens/BookCylinder';
import LoanEmiScreen from './src/screens/LoanEmiScreen';
import ElectricityBill from './src/screens/ElectricityBill';
import BroadbandScreen from './src/screens/BroadbandScreen';
LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
]);
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="RegisteredDone"
          component={RegisteredDone}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MobileRecharge"
          component={MobileRecharge}
          options={{
            // headerShown: false,
            title: 'Mobile Recharge',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="BookCylinder"
          component={BookCylinder}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoanEmiScreen"
          component={LoanEmiScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ElectricityBill"
          component={ElectricityBill}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BroadbandScreen"
          component={BroadbandScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
