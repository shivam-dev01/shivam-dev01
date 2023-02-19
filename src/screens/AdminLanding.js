import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Pressable,
  Animated,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import CustomMenu from '../components/CustomMenu';
import CoustomTextInput from '../components/CoustomTextInput';
import CustomButton from '../components/CustomButton';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Helper} from '../classes/Helper';
import {Api} from '../classes/Api';
import moment from 'moment';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export default function AdminLanding({navigation}) {
  const [userData, setUserData] = useState('');
  const [imageUri, setImageUri] = useState('');

  useFocusEffect(
    useCallback(() => {
      Helper.getLoginData(data => {
        setUserData(data.result);
      });
      Helper.getImage(data => {
        console.log('-=--=-', data);
        if (data !== null) {
          setImageUri(data);
        } else {
          getProfile();
        }
      });
    }, []),
  );
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

  const buttons = (title, image) => {
    const onBtnPress = () => {
      if (title === 'Employee managment')
        return navigation.navigate('ManageEmployee');
      if (title === 'Attendance managment')
        return navigation.navigate('AttendanceReport');
      if (title === 'Holidays') return navigation.navigate('HolidayList');
      if (title === 'Leaves') return navigation.navigate('LeaveHoliday');
      if (title === 'Departments')
        return navigation.navigate('CreateDepartment');
      if (title === 'Job role') return navigation.navigate('CreateJobRole');
      if (title === 'Teams') return navigation.navigate('Team');
    };
    return (
      <TouchableOpacity
        style={styles.button_con}
        onPress={onBtnPress}
        activeOpacity={0.8}>
        <Image
          source={image}
          style={{width: 90, height: 90}}
          resizeMode="cover"
          resizeMethod="scale"
        />
        <Text style={styles.button_text}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const getProfile = () => {
    const apiParams = {
      url: apiEndPoints.get_admin_details,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        console.log('--res--', res);
        if (res.status === 200) {
          if (res.result[0].profileImage) {
            const apiParams = {
              url: `${apiEndPoints.upload_dp}=read&fileName=${res.result[0].profileImage}`,
              requestMethod: 'get',
              response: res => {
                console.log('--res--', res);
                setImageUri(res.result.url);
                Helper.handleImage(res.result.url, () => {});
              },
              errorFunction: error => {
                console.log('--error--', error);
              },
              endFunction: () => {
                console.log('End Function Called');
              },
            };
            Api.callApi(apiParams);
          }
        }
      },
      errorFunction: err => {
        console.log('--err--', err);
      },
      endFunction: () => {
        console.log('End function called');
      },
    };
    Api.callApi(apiParams);
  };

  // const timeText = () => {
  //   var myDate = new Date();
  //   var hrs = myDate.getHours();
  //   if (hrs < 12) {
  //     return 'Good Morning';
  //   } else if (hrs >= 12 && hrs <= 17) {
  //     return 'Good Afternoon';
  //   } else if (hrs >= 17 && hrs <= 24) {
  //     return 'Good Evening';
  //   }
  // };
  // setInterval(timeText, 1000);

  return (
    <>
      <View style={styles.body}>
        <Animated.Image
          source={FilePaths.bubbles}
          resizeMode="stretch"
          style={[
            styles.bubbles_image,
            {
              transform: [
                {
                  translateY: fadeAnim,
                },
              ],
            },
          ]}
        />
        <StatusBar
          backgroundColor={CssVariables.white}
          barStyle="dark-content"
          animated={true}
        />
        <View style={styles.upper_con}>
          <Pressable style={styles.menu_icon_con}>
            <Image
              source={FilePaths.menuleft}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </Pressable>
          <View style={styles.profile_image}>
            <Image
              source={
                imageUri && imageUri.length
                  ? {uri: imageUri}
                  : FilePaths.profilephto
              }
              style={{width: 60, height: 60}}
            />
          </View>
          <View style={{paddingHorizontal: 20, marginVertical: 10}}>
            <Text style={styles.full_name}>Hello, {userData.fullName}</Text>
          </View>
        </View>
        <Animated.ScrollView contentContainerStyle={styles.lower_con}>
          <View style={[styles.main_button_con, {marginTop: 25}]}>
            {buttons('Employee managment', FilePaths.emp_managment)}
            {buttons('Attendance managment', FilePaths.atten_management)}
          </View>
          <View style={styles.main_button_con}>
            {buttons('Leaves', FilePaths.leave_icon)}
            {buttons('Holidays', FilePaths.holiday)}
          </View>
          <View style={styles.main_button_con}>
            {buttons('Teams', FilePaths.team)}
            {buttons('Tasks', FilePaths.tasks)}
          </View>
          <View style={styles.main_button_con}>
            {buttons('Payroll managment', FilePaths.payroll_managment)}
            {buttons('Expense managment', FilePaths.expense_managment)}
          </View>
          <View style={styles.main_button_con}>
            {buttons('Departments', FilePaths.departments)}
            {buttons('Job role', FilePaths.jobrole)}
          </View>
        </Animated.ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.white,
    position: 'relative',
  },
  bubbles_image: {
    width: 250,
    height: 130,
    borderWidth: 1,
    position: 'absolute',
    right: 0,
    top: -10,
  },
  upper_con: {
    height: '20%',
    width: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  menu_icon_con: {
    position: 'absolute',
    width: 32,
    height: 23,
    top: 15,
    left: 15,
  },
  lower_con: {
    width: '100%',
    height: 'auto',
    backgroundColor: CssVariables.white,
  },
  main_button_con: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button_con: {
    width: windowWidth * 0.4,
    height: (windowHeight * 0.2) / 1,
    backgroundColor: CssVariables.white,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 15,
    elevation: 5,
  },
  button_text: {
    color: CssVariables.dark_blue,
    fontSize: 16,
    fontFamily: CssVariables.mulishmedium,
  },
  profile_image: {
    height: 55,
    width: 55,
    borderWidth: 2,
    borderColor: CssVariables.white,
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 55 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  full_name: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 20,
    color: CssVariables.sky_blue,
  },
  emp_id: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 12,
    color: CssVariables.white,
  },
  time_type: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 24,
    color: CssVariables.white,
  },

  //
  menu_cross_icon: {
    width: 48,
    height: 48,
    right: 15,
  },
  update_profile_con: {
    width: '98%',
    height: 35,
    backgroundColor: CssVariables.dark_orange,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  update_profile_text: {
    color: CssVariables.white,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 14,
  },
  mark_attendance_con: {
    width: '95%',
    backgroundColor: CssVariables.white,
    elevation: 15,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  assign_shift_con: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  mark_attendance_con_text_1st: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 16,
    marginVertical: 5,
  },
  mark_attendance_con_text_2nd: {
    color: CssVariables.black,
    fontSize: 14,
    fontFamily: CssVariables.mulishmedium,
    marginVertical: 5,
  },
  mark_attendance_con_text_3rd: {
    color: CssVariables.red,
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
    marginVertical: 5,
  },
  mark_attendance_con_text_4th: {
    color: CssVariables.gray,
    fontSize: 16,
    fontFamily: CssVariables.mulishmedium,
    marginVertical: 5,
  },
  login_logout_image_con: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 5,
  },

  modal_con: {
    width: '100%',
    height: '100%',
    // backgroundColor: CssVariables.light_gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_con_content: {
    width: '90%',
    elevation: 15,
    borderRadius: 15,
    backgroundColor: CssVariables.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  modal_con_text: {
    fontSize: 15,
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.black,
    marginVertical: 4,
  },
  modal_button_con: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
});
