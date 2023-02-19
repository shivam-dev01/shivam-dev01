import React from 'react';
import {Image, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Setting from './src/screens/Setting';
import BottomTab from './src/screens/BottomTab';
import {CssVariables} from './src/constants/CssVariables';
import ManageEmployee from './src/screens/ManageEmployee';
import CreateAccount from './src/screens/CreateAccount';
import ForgotPassword from './src/screens/ForgotPassword';
import ManageAttendance from './src/screens/ManageAttendance';
import LeaveHoliday from './src/screens/LeaveHoliday';
import IntroductionPage from './src/screens/IntroductionPage';
import AttendanceReport from './src/screens/AttendanceReport';
import HolidayList from './src/screens/HolidayList';
import CreateDepartment from './src/screens/CreateDepartment';
import CreateJobRole from './src/screens/CreateJobRole';
import Team from './src/screens/Team';
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={CssVariables.sky_blue}
        barStyle="light-content"
      />
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
            name="IntroductionPage"
            component={IntroductionPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{
              title: 'Sign up',
              headerTitleStyle: {
                color: CssVariables.black,
                fontFamily: CssVariables.mulishmedium,
              },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Sign in',
              headerTitleStyle: {
                color: CssVariables.black,
                fontFamily: CssVariables.mulishmedium,
              },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              title: 'Forgot Password',
              headerTitleStyle: {
                color: CssVariables.black,
                fontFamily: CssVariables.mulishmedium,
              },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{
              title: 'Settings',
              headerTitleStyle: {
                color: CssVariables.white,
                fontFamily: CssVariables.mulishmedium,
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: CssVariables.darkgreen,
              },
            }}
          />
          <Stack.Screen
            name="ManageEmployee"
            component={ManageEmployee}
            options={{
              title: 'Employee Management',
              headerTitleStyle: {
                color: CssVariables.dark_blue,
                fontFamily: CssVariables.mulishmedium,
                fontSize: 18,
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: CssVariables.white,
              },
            }}
          />
          <Stack.Screen
            name="ManageAttendance"
            component={ManageAttendance}
            options={{
              title: 'Attendance Reports',
              headerTitleStyle: {
                color: CssVariables.white,
                fontFamily: CssVariables.mulishmedium,
                fontSize: 18,
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: CssVariables.darkgreen,
              },
            }}
          />
          <Stack.Screen
            name="HolidayList"
            component={HolidayList}
            options={{
              title: 'Holildays',
              headerTitleStyle: {
                color: CssVariables.dark_blue,
                fontFamily: CssVariables.mulishmedium,
                fontSize: 18,
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: CssVariables.white,
              },
            }}
          />
          <Stack.Screen
            name="AttendanceReport"
            component={AttendanceReport}
            options={{
              title: 'Attendance Management',
              headerTitleStyle: {
                color: CssVariables.dark_blue,
                fontFamily: CssVariables.mulishmedium,
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: CssVariables.white,
              },
            }}
          />
          <Stack.Screen
            name="LeaveHoliday"
            component={LeaveHoliday}
            options={{
              title: 'Leave',
              headerTitleStyle: {
                color: CssVariables.dark_blue,
                fontFamily: CssVariables.mulishmedium,
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: CssVariables.white,
              },
            }}
          />
          <Stack.Screen
            name="CreateDepartment"
            component={CreateDepartment}
            options={{
              title: 'Department',
              headerTitleStyle: {
                color: CssVariables.dark_blue,
                fontFamily: CssVariables.mulishmedium,
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: CssVariables.white,
              },
            }}
          />
          <Stack.Screen
            name="CreateJobRole"
            component={CreateJobRole}
            options={{
              title: 'Job Role',
              headerTitleStyle: {
                color: CssVariables.dark_blue,
                fontFamily: CssVariables.mulishmedium,
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: CssVariables.white,
              },
            }}
          />
          <Stack.Screen
            name="Team"
            component={Team}
            options={{
              title: 'Teams',
              headerTitleStyle: {
                color: CssVariables.dark_blue,
                fontFamily: CssVariables.mulishmedium,
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: CssVariables.white,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
