import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../components/CustomButton';
import {CssVariables} from '../constants/CssVariables';
import DateTimePicker from '@react-native-community/datetimepicker';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import SuccessModal from '../components/SuccessModal';
import {Helper} from '../classes/Helper';
import MultipleSelecterDropDown from './MultiperSelecterDropDown';
import moment from 'moment';

export default function ConfigOfficeTimeCard({
  change,
  setChange,
  setConfigEmpId,
  setconfigChngPass,
  setConfigOffTime,
  showConfigureOfficeTime,
}) {
  const backFunction = () => {
    setChange(!change);
    setConfigEmpId(false);
    setConfigOffTime(false);
    setconfigChngPass(false);
  };
  const [dayShift, setDayShift] = useState(true);
  const [nightShift, setNightShift] = useState(false);
  const [firstPm, setFirstPm] = useState(false);
  const [secondPm, setSecondPm] = useState(false);
  const [thirdPm, setThirdPm] = useState(false);
  const [fourthPm, setFourthPm] = useState(false);
  const [firstDate, setFirstDate] = useState(new Date());
  const [firstMode, setFirstMode] = useState('date');
  const [firstShow, setFirstShow] = useState(false);
  const [secondDate, setSecondDate] = useState(new Date());
  const [secondMode, setSecondMode] = useState('date');
  const [secondShow, setSecondShow] = useState(false);
  const [thirdDate, setThirdDate] = useState(new Date());
  const [thirdMode, setThirdMode] = useState('date');
  const [thirdShow, setThirdShow] = useState(false);
  const [fourthDate, setFourthDate] = useState(new Date());
  const [fourthMode, setFourthMode] = useState('date');
  const [fourthShow, setFourthShow] = useState(false);
  const [activeLoader, setActiveLoader] = useState({firstLoader: false});
  const [modalVisible, setModalVisible] = useState(false);
  const [weeksData, setWeekData] = useState({data: []});
  const [officeTime, setOfficeTime] = useState('');
  const [adminId, setAdminId] = useState('');
  const [message, setMessage] = useState('');

  // console.log('--officeTime--', officeTime.length);

  useEffect(() => {
    let values = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];
    let weeks = [];
    for (let i = 0; i < values.length; i++) {
      weeks.push({
        id: i,
        value: values[i],
        checked: false,
      });
      setWeekData({data: weeks});
    }
    Helper.getLoginData(data => {
      setAdminId(data.result.id);
    });
    if (showConfigureOfficeTime) {
      getOfficeTime();
    }
  }, []);

  // console.log('---date---', firstDate.toLocaleTimeString());

  const firstOnChange = (event, selectedTime) => {
    // console.log('=--event--', event);
    const currentDate = selectedTime;
    setFirstShow(false);
    setFirstDate(currentDate);
  };

  const showFirstMode = currentMode => {
    setFirstShow(false);
    setFirstMode(currentMode);
  };

  const showFirstTimePicker = () => {
    showFirstMode('time');
    setFirstShow(true);
  };

  const secondOnChange = (event, selectedTime) => {
    // console.log('=--event--', event);
    const currentDate = selectedTime;
    setSecondShow(false);
    setSecondDate(currentDate);
  };

  const showSecondMode = currentMode => {
    setSecondShow(false);
    setSecondMode(currentMode);
  };

  const showSecondTimePicker = () => {
    showSecondMode('time');
    setSecondShow(true);
  };

  const thirdOnChange = (event, selectedTime) => {
    // console.log('=--event--', event);
    const currentDate = selectedTime;
    setThirdShow(false);
    setThirdDate(currentDate);
  };

  const showThirdMode = currentMode => {
    setThirdShow(false);
    setThirdMode(currentMode);
  };

  const showThirdTimePicker = () => {
    showThirdMode('time');
    setThirdShow(true);
  };

  const fourthOnChange = (event, selectedTime) => {
    // console.log('=--event--', event);
    const currentDate = selectedTime;
    setFourthShow(false);
    setFourthDate(currentDate);
  };

  const showFourthMode = currentMode => {
    setFourthShow(false);
    setFourthMode(currentMode);
  };

  const showFourthTimePicker = () => {
    showFourthMode('time');
    setFourthShow(true);
  };

  const configOfficeTime = () => {
    var weekDay = [];
    if (weeksData.data && weeksData.data.length) {
      weeksData.data.map(item => {
        if (item.checked === true) {
          weekDay = weekDay.concat([item.value]);
        }
      });
    }
    let validWeekOff = false;
    if (weekDay.length === 0) {
      Helper.showToastMessage('Please select week off.');
    } else if (weekDay.length > 2) {
      Helper.showToastMessage('You can select only two weeks offs.');
    } else if (weekDay.length === 2 || weekDay.length === 1) {
      validWeekOff = true;
    }
    if (validWeekOff) {
      setActiveLoader({firstLoader: true});
      const apiParams = {
        url: apiEndPoints.config_attend_time,
        requestMethod: 'post',
        hideResponseMsg: true,
        response: res => {
          // console.log('--res--', res);
          if (res.status === 200) {
            setModalVisible(true);
            setMessage(res.message);
          }
          setActiveLoader({firstLoader: false});
        },
        errorFunction: error => {
          // console.log('--error--', error);
          if (error === undefined) {
            setActiveLoader({firstLoader: false});
            Helper.showToastMessage('Something went wrong.');
          } else {
            setActiveLoader({firstLoader: false});
          }
        },
        endFunction: () => {
          // console.log('End Function Called');
          setActiveLoader({firstLoader: false});
        },
        input: {
          officeInStartTime: firstDate,
          officeInEndTime: secondDate,
          officeOutStartTime: thirdDate,
          officeOutEndTime: fourthDate,
          shiftType: dayShift ? 'DAY-SHIFT' : 'NIGHT-SHIFT',
          weekOff: weekDay,
        },
      };
      Api.callApi(apiParams);
    }
  };

  const updateOfficeTime = () => {
    var weekDay = [];
    if (weeksData.data && weeksData.data.length) {
      weeksData.data.map(item => {
        if (item.checked === true) {
          weekDay = weekDay.concat([item.value]);
        }
      });
    }
    let updatedValidWeekOff = false;
    if (weekDay.length === 0) {
      Helper.showToastMessage('Please select week off.');
    } else if (weekDay.length > 2) {
      Helper.showToastMessage('You can select only two weeks offs.');
    } else if (weekDay.length === 2 || weekDay.length === 1) {
      updatedValidWeekOff = true;
    }
    if (updatedValidWeekOff) {
      setActiveLoader({firstLoader: true});
      const apiParams = {
        url: `${apiEndPoints.update_office_time}/${adminId}`,
        requestMethod: 'put',
        response: res => {
          // console.log('--res--', res);
          if (res.status === 200) {
            setModalVisible(true);
            setMessage(res.message);
          }
          setActiveLoader({firstLoader: false});
        },
        errorFunction: error => {
          // console.log('--error--', error);
          if (error === undefined) {
            setActiveLoader({firstLoader: false});
            Helper.showToastMessage('Something went wrong.');
          } else {
            setActiveLoader({firstLoader: false});
          }
        },
        endFunction: () => {
          // console.log('End Function Called');
          setActiveLoader({firstLoader: false});
        },
        input: {
          officeInStartTime: firstDate,
          officeInEndTime: secondDate,
          officeOutStartTime: thirdDate,
          officeOutEndTime: fourthDate,
          weekOff: weekDay,
        },
      };
      Api.callApi(apiParams);
    }
  };
  // console.log('--first--', firstDate, secondDate);
  // const officeTiming = () => {
  //   if (officeTime.length) {
  //     updateOfficeTime();
  //   } else {
  //     configOfficeTime();
  //   }
  // };

  const getOfficeTime = () => {
    const apiParams = {
      url: apiEndPoints.get_configure_attendance_time,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        // console.log('--res--', res);
        setOfficeTime(res.result);
      },
      errorFunction: error => {
        if (error === undefined) {
          Helper.showToastMessage('Something went wrong.');
        } else if (error.message === 'Failed') {
          Helper.showToastMessage('Failed.');
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
      },
    };
    Api.callApi(apiParams);
  };

  return (
    <Modal
      visible={showConfigureOfficeTime}
      animationType="fade"
      onRequestClose={backFunction}>
      <View style={styles.last_container}>
        <View style={styles.upper_text_cont}>
          <Text style={styles.upper_text}>Configure Office Time</Text>
        </View>
        <View style={styles.configure_employee_id_text_con}>
          <Text style={styles.configure_employee_id_text}>
            Configure Office Time
          </Text>
        </View>
        <View style={{alignItems: 'center', paddingVertical: 5}}>
          <Text style={styles.middle_Text}>{`Set Office In & Out Time.`}</Text>
        </View>
        <View style={styles.shift_con}>
          <View style={{flexDirection: 'row', marginVertical: '1%'}}>
            <TouchableOpacity
              onPress={() => (setDayShift(true), setNightShift(false))}
              style={[
                styles.day_shift_circle,
                {
                  backgroundColor: dayShift
                    ? CssVariables.green
                    : CssVariables.white,
                },
              ]}
            />
            <Text style={styles.generated_id_text}>Day Shift</Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: '2%'}}>
            <TouchableOpacity
              onPress={() => (setDayShift(false), setNightShift(true))}
              style={[
                styles.day_shift_circle,
                {
                  backgroundColor: nightShift
                    ? CssVariables.green
                    : CssVariables.white,
                },
              ]}
            />
            <Text style={styles.generated_id_text}>Night Shift</Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{paddingBottom: 15}}
          disableScrollViewPanResponder={true}>
          <View style={{marginVertical: '3%'}}>
            <View style={{paddingLeft: '4%', marginVertical: '1%'}}>
              <Text style={styles.generated_id_text}>
                Select office In Time
              </Text>
            </View>
            <View style={styles.shift_con}>
              <TouchableOpacity
                onPress={showFirstTimePicker}
                style={styles.time_box_con}>
                <Text style={styles.time_text}>
                  {firstDate.toLocaleString().slice(11, 16)}
                </Text>
              </TouchableOpacity>
              <Text
                style={styles.employee_id_text}
                onPress={() => setFirstPm(!firstPm)}>
                {firstPm ? 'PM' : 'AM'}
              </Text>
              <Text style={styles.upper_text}>To</Text>
              <TouchableOpacity
                style={styles.time_box_con}
                onPress={showSecondTimePicker}>
                <Text style={styles.time_text}>
                  {secondDate.toLocaleString().slice(11, 16)}
                </Text>
              </TouchableOpacity>
              <Text
                style={styles.employee_id_text}
                onPress={() => setSecondPm(!secondPm)}>
                {secondPm ? 'PM' : 'AM'}
              </Text>
            </View>
          </View>
          <View style={{marginVertical: '3%'}}>
            <View style={{paddingLeft: '4%', marginVertical: '1%'}}>
              <Text style={styles.generated_id_text}>
                Select office Out Time
              </Text>
            </View>
            <View style={styles.shift_con}>
              <TouchableOpacity
                style={styles.time_box_con}
                onPress={showThirdTimePicker}>
                <Text style={styles.time_text}>
                  {thirdDate.toLocaleString().slice(11, 16)}
                </Text>
              </TouchableOpacity>
              <Text
                style={styles.employee_id_text}
                onPress={() => setThirdPm(!thirdPm)}>
                {thirdPm ? 'PM' : 'AM'}
              </Text>
              <Text style={styles.upper_text}>To</Text>
              <TouchableOpacity
                style={styles.time_box_con}
                onPress={showFourthTimePicker}>
                <Text style={styles.time_text}>
                  {fourthDate.toLocaleString().slice(11, 16)}
                </Text>
              </TouchableOpacity>
              <Text
                style={styles.employee_id_text}
                onPress={() => setFourthPm(!fourthPm)}>
                {fourthPm ? 'PM' : 'AM'}
              </Text>
            </View>
          </View>
          <View style={styles.week_select_con}>
            <MultipleSelecterDropDown
              label="Select Weeks offs"
              data={weeksData.data}
              setWeekData={setWeekData}
            />
          </View>
          {firstShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={firstDate}
              mode={firstMode}
              is24Hour={true}
              onChange={firstOnChange}
              dayOfWeekFormat={'{dayofweek.abbreviated(2)}'}
            />
          )}
          {secondShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={secondDate}
              mode={secondMode}
              is24Hour={true}
              onChange={secondOnChange}
              dayOfWeekFormat={'{dayofweek.abbreviated(2)}'}
            />
          )}
          {thirdShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={thirdDate}
              mode={thirdMode}
              is24Hour={true}
              onChange={thirdOnChange}
              dayOfWeekFormat={'{dayofweek.abbreviated(2)}'}
            />
          )}
          {fourthShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={fourthDate}
              mode={fourthMode}
              is24Hour={true}
              onChange={fourthOnChange}
              dayOfWeekFormat={'{dayofweek.abbreviated(2)}'}
            />
          )}

          <View style={styles.save_cancle_button_con}>
            <CustomButton
              onPress={configOfficeTime}
              text={
                activeLoader.firstLoader ? (
                  <ActivityIndicator
                    size={'small'}
                    color={CssVariables.white}
                  />
                ) : (
                  'Save'
                )
              }
              properties={{
                fieldType: 'widthlongdarkgreen',
              }}
            />
            <CustomButton
              onPress={backFunction}
              text="Cancel"
              properties={{
                fieldType: 'white',
              }}
            />
          </View>
        </ScrollView>
        <SuccessModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          properties={{
            success: 'configofftime',
            modalFalse: setModalVisible,
            message: message,
          }}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  upper_text: {
    fontSize: 16,
    color: CssVariables.black,
    padding: 6,
    fontFamily: CssVariables.mulishmedium,
  },
  last_container: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  generated_id_text: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
  },
  time_text: {
    fontSize: 15,
    color: CssVariables.red,
    fontFamily: CssVariables.mulishmedium,
  },
  employee_id_text: {
    color: CssVariables.red,
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    fontSize: 15,
    fontFamily: CssVariables.mulishmedium,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    flexDirection: 'row',
  },
  week_select_con: {
    alignSelf: 'center',
    width: '50%',
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  shift_con: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  time_box_con: {
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    fontSize: 15,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 4,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefix_id_text: {
    borderWidth: 1,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    fontSize: 20,
    fontFamily: CssVariables.mulishmedium,
    borderRadius: 4,
    width: '100%',
    textAlign: 'center',
  },
  number_text_con: {
    borderWidth: 1,
    width: '100%',
    borderColor: CssVariables.light_gray,
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: 'center',
  },
  one_text: {
    fontSize: 20,
    fontFamily: CssVariables.mulishmedium,
  },
  save_cancle_button_con: {
    alignItems: 'center',
    marginTop: 25,
  },
  day_shift_circle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 5,
  },
  time_box: {
    width: '70%',
    height: 200,
    borderWidth: 1,
    backgroundColor: CssVariables.white,
  },
  upper_text_cont: {
    borderBottomWidth: 1,
    borderBottomColor: CssVariables.lightblack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_con: {
    height: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: '5%',
  },
  configure_employee_id_text_con: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  configure_employee_id_text: {
    color: CssVariables.darkgray,
    fontSize: 25,
    fontFamily: CssVariables.mulishregular,
  },
  middle_Text: {
    fontSize: 14,
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
  },
});
