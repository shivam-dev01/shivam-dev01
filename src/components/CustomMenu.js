import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FilePaths} from '../constants/filepath';
import {CssVariables} from '../constants/CssVariables';
import {Helper} from '../classes/Helper';
import {Api} from '../classes/Api';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function CustomMenu({showMenu, setShowMenu, navigation}) {
  const [currentTab, setCurrentTab] = useState('Profile');

  const TabButton = (currentTab, setCurrentTab, title, image, secondImage) => {
    return (
      <Pressable
        onPress={() => {
          if (title == 'Log Out') {
            Api.logOut();
            setShowMenu(!showMenu);
          } else if (title === 'Settings') {
            setCurrentTab(title);
            navigation.navigate('Setting');
            setShowMenu(!showMenu);
          } else if (title === 'Manage Employees') {
            setCurrentTab(title);
            navigation.navigate('ManageEmployee');
            setShowMenu(!showMenu);
          } else if (title === 'Profile') {
            setCurrentTab(title);
            navigation.navigate('Profile');
            setShowMenu(!showMenu);
          } else if (title === 'Manage Attendance') {
            setCurrentTab(title);
            navigation.navigate('ManageAttendance');
            setShowMenu(!showMenu);
          } else if (title === 'Leave & Holidays') {
            setCurrentTab(title);
            navigation.navigate('LeaveHoliday');
            setShowMenu(!showMenu);
          } else {
            setCurrentTab(title);
          }
        }}>
        <View
          style={{
            paddingVertical: 8,
            backgroundColor:
              currentTab == title ? CssVariables.white : 'transparent',
            borderRadius: 8,
            paddingLeft: 5,
            marginVertical: '5%',
            flexDirection: 'row',
            // marginLeft: 10,
            width: '100%',
            // position: 'absolute',
            // right: 0,
          }}>
          <Image
            source={currentTab == title ? secondImage : image}
            style={styles.menu_con_icons}
          />
          <Text
            style={{
              color:
                currentTab == title ? CssVariables.black : CssVariables.white,
              fontSize: 18,
              fontFamily: CssVariables.readex_font,
            }}>
            {title}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      {showMenu ? (
        <>
          <Pressable
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              left: 0,
              top: 0,
              backgroundColor: showMenu ? 'rgba(60, 60, 60, 0.5)' : null,
              zIndex: 1,
            }}
            onPress={() => setShowMenu(!showMenu)}>
            <View
              style={[
                {
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  left: 0,
                  // width: '100%',
                  borderTopRightRadius: showMenu ? 15 : 0,
                  borderBottomRightRadius: showMenu ? 15 : 0,
                  borderTopWidth: 0.5,
                  height: '100%',
                  width: '75%',
                  overflow: 'hidden',
                  borderTopColor: CssVariables.meduimgray,
                  backgroundColor: CssVariables.darkgreen,
                  // opacity: 0.8,
                  paddingHorizontal: 10,
                  // alignItems: 'center',
                  zIndex: 1,
                },
                {
                  transform: [{translateX: showMenu ? 0 : 0}],
                },
              ]}>
              <ScrollView contentContainerStyle={styles.menu_con}>
                <View style={{flexGrow: 1}}>
                  {TabButton(
                    currentTab,
                    setCurrentTab,
                    'Profile',
                    FilePaths.profile,
                    FilePaths.secondprofile,
                  )}
                  {TabButton(
                    currentTab,
                    setCurrentTab,
                    'Manage Employees',
                    FilePaths.manageemployee,
                    FilePaths.secondmanageemployee,
                  )}
                  {TabButton(
                    currentTab,
                    setCurrentTab,
                    'Manage Project',
                    FilePaths.manageproject,
                    FilePaths.secondmanageproject,
                  )}
                  {TabButton(
                    currentTab,
                    setCurrentTab,
                    'Manage Attendance',
                    FilePaths.manageattendance,
                    FilePaths.secondmanageattendance,
                  )}
                  {TabButton(
                    currentTab,
                    setCurrentTab,
                    'Leave & Holidays',
                    FilePaths.leaveholiday,
                    FilePaths.secondleaveandholiday,
                  )}
                  {TabButton(
                    currentTab,
                    setCurrentTab,
                    'Manage Payroll',
                    FilePaths.reports,
                    FilePaths.secondreports,
                  )}
                  {TabButton(
                    currentTab,
                    setCurrentTab,
                    'Settings',
                    FilePaths.setting,
                    FilePaths.secondsetting,
                  )}
                </View>
                <View>
                  {TabButton(
                    currentTab,
                    setCurrentTab,
                    'Log Out',
                    FilePaths.logout,
                  )}
                </View>
              </ScrollView>
            </View>
          </Pressable>
        </>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  menu_con: {
    width: '100%',
    height: '100%',
    // backgroundColor: CssVariables.darkgreen,
    // alignItems: 'flex-end',
    // position: 'relative',
  },
  menu_con_icons: {
    width: 24,
    height: 24,
    marginHorizontal: '3%',
  },
});
