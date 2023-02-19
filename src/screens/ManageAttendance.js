import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FilePaths} from '../constants/filepath';
import CustomMenu from '../components/CustomMenu';
import CustomButton from '../components/CustomButton';
import {CssVariables} from '../constants/CssVariables';
import AttendanceReport from '../screens/AttendanceReport';
import AssignShift from '../components/AssignShift';
import TotalAttReport from '../components/TotalAttReport';
import {useOrientation} from '../components/useOrientation';
import {Helper} from '../classes/Helper';
import {Api} from '../classes/Api';
import {apiEndPoints} from '../constants/apiEndPoints';

export default function ManageAttendance({navigation}) {
  const orientation = useOrientation();
  const [showMenu, setShowMenu] = useState(false);
  const [change, setChange] = useState(false);
  const [attendanceReport, setAttendanceReport] = useState(false);
  const [assignShift, setAssignShift] = useState(false);
  const [totalReport, setTotalReport] = useState(false);
  const [totalEmployee, setTotalEmployee] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            setShowMenu(!showMenu);
          }}>
          <Image
            source={showMenu ? FilePaths.menucrossbutton : FilePaths.menubutton}
            style={styles.right_menu_cross_icon}
          />
        </TouchableOpacity>
      ),
    });
  }, [showMenu, change]);
  useEffect(() => {
    if (change === false) {
      getAllEmplooyee();
    }
  }, []);

  const assignShiftMl = () => {
    setChange(!change);
    setAttendanceReport(false);
    setAssignShift(true);
    setTotalReport(false);
  };
  const dailyReport = () => {
    setChange(!change);
    setAttendanceReport(true);
    setAssignShift(false);
    setTotalReport(false);
  };

  const attandanceReport = () => {
    setChange(!change);
    setAttendanceReport(false);
    setAssignShift(false);
    setTotalReport(true);
  };
  const getAllEmplooyee = () => {
    const apiParams = {
      url: apiEndPoints.get_all_employee,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setTotalEmployee(res.result.length);
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error === undefined) {
          Helper.showToastMessage('Something went wrong.');
        } else {
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
      },
    };
    Api.callApi(apiParams);
  };
  return (
    <View style={orientation === 'PORTRAIT' ? styles.body : styles.po_body}>
      <View style={styles.content_container}>
        <CustomMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          navigation={navigation}
          setChange={setChange}
        />
        {/* <View style={styles.upper_text_cont}>
          <Text style={styles.upper_text}>Manage Attendance</Text>
        </View> */}
        {change ? (
          <View style={{height: '100%', backgroundColor: CssVariables.white}}>
            <AttendanceReport
              change={change}
              setChange={setChange}
              setAttendanceReport={setAttendanceReport}
              attendanceReport={attendanceReport}
            />
            <AssignShift
              change={change}
              setChange={setChange}
              setAssignShift={setAssignShift}
              assignShift={assignShift}
            />
            <TotalAttReport
              change={change}
              setChange={setChange}
              setTotalReport={setTotalReport}
              totalReport={totalReport}
              totalEmployee={totalEmployee}
            />
          </View>
        ) : (
          <>
            <View style={orientation === 'LANDSCAPE' ? styles.po_con : null}>
              <View
                style={
                  orientation === 'LANDSCAPE'
                    ? styles.po_main_butt_con
                    : styles.main_butt_con
                }>
                <ScrollView contentContainerStyle={styles.button_con}>
                  <CustomButton
                    onPress={assignShiftMl}
                    text="Assign Shift"
                    properties={{
                      manageEmployee: 'createemployees',
                      imageType: 'assignshift',
                    }}
                  />
                  <CustomButton
                    onPress={dailyReport}
                    text="Daily Report"
                    properties={{
                      manageEmployee: 'createemployees',
                      imageType: 'attendreport',
                    }}
                  />
                  <CustomButton
                    onPress={attandanceReport}
                    text="Attendance Report"
                    properties={{
                      manageEmployee: 'createemployees',
                      imageType: 'attendreport',
                    }}
                  />
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  po_body: {
    flex: 1,
    flexDirection: 'row',
  },
  upper_text_cont: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CssVariables.darkgreen,
    height: 60,
  },
  upper_text: {
    fontSize: 16,
    color: CssVariables.white,
    padding: 6,
    fontFamily: CssVariables.mulishmedium,
  },
  content_container: {
    width: '100%',
    height: '100%',
    backgroundColor: CssVariables.white,
  },
  right_menu_cross_icon: {
    width: 48,
    height: 48,
    left: 15,
  },
  left_back_icon: {
    width: 48,
    height: 48,
    left: 15,
  },
  po_con: {
    position: 'relative',
    flexDirection: 'row',
  },
  input_con: {
    paddingHorizontal: '10%',
    marginVertical: '2%',
  },
  po_input_con: {
    width: '70%',
    position: 'absolute',
    right: 0,
    paddingHorizontal: '5%',
  },
  data_cont: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  po_data_cont: {
    width: '30%',
    height: '76%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  data_text_con: {
    alignItems: 'center',
  },
  data_text: {
    color: CssVariables.darkpink,
    fontSize: 16,
    fontFamily: CssVariables.mulishregular,
  },
  data_number: {
    color: CssVariables.darkred,
    fontSize: 30,
    fontFamily: CssVariables.mulishmedium,
  },
  po_main_butt_con: {
    width: '100%',
    height: '80%',
  },
  main_butt_con: {
    width: '100%',
    height: '95%',
  },
  button_con: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 30,
  },
});
