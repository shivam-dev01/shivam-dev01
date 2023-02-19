import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  StatusBar,
  Animated,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import {Api} from '../classes/Api';
import {apiEndPoints} from '../constants/apiEndPoints';
import SuccessModal from '../components/SuccessModal';
import FailedModal from '../components/FailedModal';
import CoustomTextInput from '../components/CoustomTextInput';
import CustomButton from '../components/CustomButton';
import CustomDropDown from '../components/CustomDropDown';
import {Helper} from '../classes/Helper';
import moment from 'moment';

export default function AttendanceReport({navigation}) {
  const [secModalVisible, setSecModlaVisible] = useState(false);
  const [noDataModal, setNoDataModal] = useState(false);
  const [empData, setEmpData] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [workingDay, setWorkingDay] = useState('');
  const [leave, setLeave] = useState('');
  const [specificDetails, setSpecificDetails] = useState([]);
  const [holiday, setHoliday] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [singleEmployee, setSingleEmployee] = useState([]);
  const [allDepartment, setAllDepartment] = useState('');
  const [department, setDepartment] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [fetchJobRole, setFetchJobeRole] = useState('');
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
    thirdLoader: false,
    fourthLoader: false,
    fifthLoader: false,
  });

  useEffect(() => {
    Helper.getLoginData(data => {
      setEmpData(data);
      reports(data.result.id);
    });
  }, [department, jobRole]);

  const months = [
    {month: 'January', value: '01'},
    {month: 'February', value: '02'},
    {month: 'March', value: '03'},
    {month: 'April', value: '04'},
    {month: 'May', value: '05'},
    {month: 'June', value: '06'},
    {month: 'July', value: '07'},
    {month: 'August', value: '08'},
    {month: 'September', value: '09'},
    {month: 'October', value: '10'},
    {month: 'November', value: '11'},
    {month: 'December', value: '12'},
  ];

  const years = [
    {year: '2022'},
    {year: '2023'},
    {year: '2024'},
    {year: '2025'},
    {year: '2026'},
    {year: '2027'},
    {year: '2028'},
    {year: '2029'},
    {year: '2030'},
    {year: '2031'},
    {year: '2032'},
  ];

  const noDepa = [
    {
      error: activeLoader.secondLoader
        ? 'Loading...'
        : 'You have not created department.Please Create first.',
    },
  ];
  const noJobRole = [
    {
      error: activeLoader.fifthLoader
        ? 'Loading...'
        : 'You have not created job role for this department.Please Create first.',
    },
  ];

  const reports = id => {
    setActiveLoader({thirdLoader: true});
    const url = () => {
      if (department && jobRole) {
        return `${apiEndPoints.filter_attendance_report}?department=${department.department}&jobRole=${jobRole.jobRole}`;
      }
      if (department && !jobRole) {
        return `${apiEndPoints.filter_attendance_report}?department=${department.department}`;
      }
      return apiEndPoints.filter_attendance_report;
    };
    const apiParams = {
      url: url(),
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        console.log('--ressadhajksdhjashdkjasdashj--', res);
        setActiveLoader({thirdLoader: false});
        if (res.status === 200 && res.result.length) {
          if (!department) {
            getAllDepartment();
          }
          setSpecificDetails(res.result);
          let leaves = [];
          let workingDay = [];
          let holiday = [];
          res.result.map(item => {
            console.log('-=-=-=-item-=-=-=-=', item);
            if (item.leaveType) {
              leaves.push(item);
            }
            setLeave(leaves.length);
            if (item.attendanceType) {
              workingDay.push(item);
            }
            setWorkingDay(workingDay.length);
            if (item.description === 'WO' || item.holidayDate) {
              holiday.push(item);
            }
            setHoliday(holiday.length);
          });
        } else if (res.result.length === 0) {
          setSpecificDetails([]);
          setWorkingDay([]);
          setLeave([]);
          setNoDataModal(true);
        }
      },
      errorFunction: error => {
        console.log('--error--', error);
        if (error === undefined) {
          setActiveLoader({thirdLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({thirdLoader: false});
        }
      },
      endFunction: () => {
        console.log('End Function Called');
        setActiveLoader({thirdLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const renderReport = useCallback(({item}) => {
    const shiftText = () => {
      if (item.userId.assignedShift === 'DAY-SHIFT') {
        return `Day
shift`;
      } else if (item.userId.assignedShift === 'NIGHT-SHIFT') {
        return `Night
shift`;
      }
      //  else if (item.leaveType) {
      //   return 'L';
      // } else if (item.description === 'WO') {
      //   return 'WO';
      // }
    };
    const headerDate = () => {
      const date = item.date;
      const rDate = date.split('-').reverse().join('-');
      console.log('-=-=-=', rDate);
      if (item.holidayDate) {
        const date = item.date;
        const rDate = date.split('-').reverse().join('-');
        return moment(rDate).format('ddd, D MMM YYYY');
      } else if (item.description === 'WO') {
        const date = item.date;
        const rDate = date.split('-').reverse().join('-');
        return moment(rDate).format('ddd, D MMM YYYY');
      } else if (item.attendanceType) {
        return moment(item.checkInTime).format('ddd, D MMM YYYY');
      } else if (item.leaveType) {
        const date = item.date;
        const rDate = date.split('-').reverse().join('-');
        return moment(rDate).format('ddd, D MMM YYYY');
      }
    };
    const checkInText = () => {
      if (item.holidayDate) {
        return 'Holiday';
      } else if (item.description === 'WO') {
        return 'Week off';
      } else if (item.attendanceType) {
        return moment(item.checkInTime).format('hh:mm A') === 'Invalid date'
          ? '-:-'
          : moment(item.checkInTime).format('hh:mm A');
      } else if (item.leaveType) {
        return 'Leave';
      }
    };
    const checkOutText = () => {
      if (item.holidayDate) {
        return 'Holiday';
      } else if (item.description === 'WO') {
        return 'Week off';
      } else if (item.attendanceType) {
        return moment(item.checkOutTime).format('hh:mm A') === 'Invalid date' ||
          null
          ? '-:-'
          : moment(item.checkOutTime).format('hh:mm A');
      } else if (item.leaveType) {
        return 'Leave';
      }
    };
    const workingHour = () => {
      if (item.holidayDate) {
        return '-:-';
      } else if (item.description === 'WO') {
        return '-:-';
      } else if (item.attendanceType) {
        return item.workingHour;
      } else if (item.leaveType) {
        return '-:-';
      }
    };

    return (
      <Pressable
        style={styles.renderItem_texts_con}
        onPress={() => viewAttReport(item._id)}>
        <View style={styles.renderItem_texts_con_sec}>
          <View style={styles.shift_con}>
            <Text
              style={[styles.shift_text, {fontWeight: 'bold', fontSize: 15}]}>
              {shiftText()}
            </Text>
          </View>
          <View style={{width: '80%', paddingHorizontal: 10}}>
            <Text style={styles.att_box_text}>{item.userId.fullName}</Text>
            <Text
              style={[
                styles.att_box_text,
                {color: CssVariables.gray, fontSize: 13},
              ]}>
              {item.userId.employeeId}
            </Text>
            <Text
              style={[
                styles.att_box_text,
                {color: CssVariables.gray, fontSize: 13},
              ]}>
              {item.userId.department}
            </Text>
            <Text
              style={[
                styles.att_box_text,
                {color: CssVariables.gray, fontSize: 13},
              ]}>
              {item.userId.jobRole}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.att_box_text}>{headerDate()}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 100,
                }}>
                <Text
                  style={{
                    color: CssVariables.dark_blue,
                    fontFamily: CssVariables.mulishmedium,
                    fontSize: 12,
                  }}>
                  WH -{' '}
                </Text>
                <Text
                  style={{
                    color: CssVariables.red_meduim,
                    fontFamily: CssVariables.mulishregular,
                    fontSize: 12,
                  }}>
                  {workingHour()}
                </Text>
              </View>
            </View>
            <View style={styles.date_con}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[styles.att_box_text, {fontSize: 13}]}>
                  Check-in
                </Text>
                <Text style={styles.in_time}>{checkInText()}</Text>
              </View>
              <View style={{justifyContent: 'center', width: 100}}>
                <Text style={[styles.att_box_text, {fontSize: 13}]}>
                  Check-out
                </Text>
                <Text style={styles.out_time}>{checkOutText()}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }, []);

  const keyEctractor = useCallback((item, key) => key.toString(), []);

  const shiftImage = () => {
    if (empData.result.assignedShift === 'DAY-SHIFT') {
      return FilePaths.dayshift;
    }
    if (empData.result.assignedShift === 'NIGHT-SHIFT') {
      return FilePaths.nightshift;
    }
  };

  const shiftText = () => {
    if (empData.result.assignedShift === 'DAY-SHIFT') {
      return `Day`;
    }
    if (empData.result.assignedShift === 'NIGHT-SHIFT') {
      return `Night`;
    }
  };

  const viewAttReport = id => {
    setActiveLoader({fourthLoader: true});
    setModalVisible(true);
    const apiParams = {
      url: `${apiEndPoints.specific_att_resport}/${id}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        // console.log('--res--', res);
        setActiveLoader({fourthLoader: false});
        setSingleEmployee(res.result);
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error === undefined) {
          setActiveLoader({fourthLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({fourthLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({fourthLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const getAllDepartment = () => {
    setActiveLoader({secondLoader: true});
    const apiParams = {
      url: apiEndPoints.get_all_department,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setAllDepartment(res.result);
        setActiveLoader({thirdLoader: false});
      },
      errorFunction: error => {
        // console.log('--error Depa--', error);
        if (error === undefined) {
          setActiveLoader({thirdLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({thirdLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({thirdLoader: false});
      },
    };
    Api.callApi(apiParams);
  };
  const getAllJobeRole = _id => {
    setActiveLoader({fifthLoader: true});
    const apiParams = {
      url: `${apiEndPoints.get_all_job_role}/${_id}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        // console.log('--res--', res);
        setFetchJobeRole(res.result);
        setActiveLoader({fifthLoader: false});
      },
      errorFunction: error => {
        // console.log('--error Job--', error);
        if (error === undefined) {
          setActiveLoader({fifthLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({fifthLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({fifthLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  return (
    <View style={{flex: 1, backgroundColor: CssVariables.light_white}}>
      <StatusBar
        backgroundColor={CssVariables.white}
        animated={true}
        barStyle={'dark-content'}
      />
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={styles.drop_down_layer}>
          <CustomDropDown
            label={'Department'}
            onSelect={setDepartment}
            data={allDepartment}
            noData={noDepa}
            getJobRole={getAllJobeRole}
          />
        </View>
        {department.department ? (
          <Pressable style={styles.drop_down_layer}>
            <CustomDropDown
              label={'Job role'}
              onSelect={setJobRole}
              data={fetchJobRole}
              noData={noJobRole}
            />
          </Pressable>
        ) : (
          <Pressable style={[styles.drop_down_layer, {height: 44}]}>
            <Image source={FilePaths.date} style={{width: 22, height: 18}} />
            <Text
              style={{
                color: CssVariables.gray,
                fontFamily: CssVariables.mulishregular,
                marginHorizontal: 5,
              }}>
              Job role
            </Text>
          </Pressable>
        )}
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={styles.drop_down_layer}>
          <CustomDropDown label="Select Year" data={years} onSelect={setYear} />
        </View>
        {year.year ? (
          <Pressable style={styles.drop_down_layer}>
            <CustomDropDown
              label="Select Month"
              data={year.year ? months : ''}
              onSelect={setMonth}
            />
          </Pressable>
        ) : (
          <Pressable style={[styles.drop_down_layer, {height: 44}]}>
            <Image source={FilePaths.date} style={{width: 22, height: 18}} />
            <Text
              style={{
                color: CssVariables.gray,
                fontFamily: CssVariables.mulishregular,
                marginHorizontal: 5,
              }}>
              Select Month
            </Text>
          </Pressable>
        )}
      </View>

      {activeLoader.thirdLoader ? (
        <ActivityIndicator size={'large'} color={CssVariables.sky_blue} />
      ) : (
        <FlatList
          data={specificDetails}
          renderItem={renderReport}
          maxToRenderPerBatch={5}
          windowSize={10}
          initialNumToRender={5}
          updateCellsBatchingPeriod={5}
          keyExtractor={keyEctractor}
          scrollEventThrottle={16}
        />
      )}
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.create_depa_body}
          onPress={() => setModalVisible(false)}>
          {activeLoader.fourthLoader ? (
            <ActivityIndicator
              size={'large'}
              color={CssVariables.sky_blue}
              style={styles.loader}
            />
          ) : (
            <Pressable
              style={styles.create_depa_input}
              onPress={() => setModalVisible(true)}>
              <Pressable
                style={{position: 'absolute', right: 5, top: 5}}
                android_ripple={{color: CssVariables.lightblack}}
                onPress={() => setModalVisible(false)}>
                <Image
                  source={FilePaths.cancleicon}
                  style={{width: 30, height: 30}}
                />
              </Pressable>
              {singleEmployee.map((item, key) => {
                return (
                  <View
                    key={key + 1}
                    style={{
                      height: '100%',
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={[
                        styles.date_day_text,
                        {
                          alignSelf: 'center',
                          marginTop: 20,
                          marginBottom: 10,
                        },
                      ]}>
                      Daily task report
                    </Text>
                    <View style={styles.time_con}>
                      <Text style={styles.date_day_text}>Date</Text>
                      <Text style={styles.date_day_text}>
                        {moment(item.checkInTime).format('D MMM Y') ===
                        'Invalid date'
                          ? '-:-'
                          : moment(item.checkInTime).format('D MMM Y')}
                      </Text>
                    </View>
                    <View style={styles.time_con}>
                      <Text style={styles.login_time_text}>Check-in</Text>
                      <Text style={styles.login_time_text}>
                        {moment(item.checkInTime).format('hh:mm:ss')}
                      </Text>
                    </View>
                    <View style={styles.log_out_con}>
                      <Text style={styles.log_out_text}>Check-out</Text>
                      <Text style={styles.log_out_text}>
                        {moment(item.checkOutTime).format('hh:mm:ss') ===
                        'Invalid date'
                          ? '-:-'
                          : moment(item.checkOutTime).format('hh:mm:ss')}
                      </Text>
                    </View>
                    <View style={styles.time_con}>
                      <Text style={styles.login_time_text}>Working hours</Text>
                      <Text style={styles.login_time_text}>
                        {item.workingHour}
                      </Text>
                    </View>
                    <ScrollView contentContainerStyle={styles.desc_con}>
                      <Text style={styles.work_report_text}>
                        {item.workReport}
                      </Text>
                    </ScrollView>
                  </View>
                );
              })}
            </Pressable>
          )}
        </Pressable>
      </Modal>
      <SuccessModal
        visible={secModalVisible}
        onRequestClose={() => setSecModlaVisible(false)}
        properties={{
          success: 'createjobrole',
          modalFalse: setSecModlaVisible,
          message: message,
        }}
      />
      <FailedModal
        visible={noDataModal}
        onRequestClose={() => setNoDataModal(false)}
        properties={{
          failed: 'nodata',
          modalFalse: setNoDataModal,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  upper_button_con: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
  },
  create_empl_con: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CssVariables.darkgreen,
    flexDirection: 'row',
    paddingVertical: 4,
  },
  upper_text: {
    fontSize: 16,
    color: CssVariables.white,
    padding: 6,
    fontFamily: CssVariables.mulishmedium,
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
    marginVertical: 10,
  },
  update_profile_text: {
    color: CssVariables.white,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 14,
  },
  depa_date_con: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  date_text: {
    color: CssVariables.department_red,
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
  },
  dob_icon: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  details_header_text: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: CssVariables.pencile,
    paddingHorizontal: 5,
  },
  renderItem_texts_con: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: CssVariables.light_red,
    borderRadius: 15,
    position: 'relative',
    overflow: 'hidden',
    marginVertical: 4,
    paddingLeft: 10,
    elevation: 3,
  },
  renderItem_texts_con_sec: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: CssVariables.light_white,
    overflow: 'hidden',
    paddingVertical: 5,
  },
  shift_con: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  shift_text: {
    height: 60,
    backgroundColor: CssVariables.gray_thin_light,
    width: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 60 / 2,
    color: CssVariables.sky_blue,
    fontFamily: CssVariables.mulishmedium,
  },
  att_box_text: {
    color: CssVariables.dark_blue,
    fontSize: 15,
    fontFamily: CssVariables.mulishregular,
  },
  date_con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
    marginVertical: 2,
    // width: '78%',
  },
  in_time: {
    fontSize: 12,
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.sky_blue,
  },
  out_time: {
    fontSize: 12,
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.red_meduim,
  },
  check_in_out_con: {
    height: 105,
    width: 105,
    backgroundColor: CssVariables.sky_blue,
    borderRadius: 25,
    alignItems: 'center',
  },
  check_in_text: {
    fontSize: 14,
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.white,
  },
  check_out_text: {
    fontSize: 14,
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.dark_blue,
  },
  shift_type: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  in_out_con: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 30,
  },
  modal_con: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CssVariables.lightblack,
  },
  modal_con_content: {
    width: '90%',
    elevation: 15,
    borderRadius: 15,
    backgroundColor: CssVariables.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_con_text: {
    fontSize: 15,
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.sky_blue,
  },
  modal_button_con: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  report_con: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 5,
  },
  report_data_con: {
    width: 79,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
  },
  report_circle: {
    width: 46,
    // height: 46,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.4,
  },
  report_num: {
    fontWeight: 'bold',
    // fontSize: 18,
    fontFamily: CssVariables.mulishmedium,
  },
  report_text: {
    // fontSize: 12,
    fontFamily: CssVariables.mulishregular,
  },
  drop_down_layer: {
    borderRadius: 25,
    overflow: 'hidden',
    marginVertical: 5,
    height: 44,
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CssVariables.drop_down_bg,
    paddingHorizontal: 15,
  },

  //fsdfdsfsd
  view_report_con: {
    width: '20%',
    backgroundColor: CssVariables.darkgreen,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  details_header_texts: {
    color: CssVariables.gray,
  },
  create_empl_img: {
    width: 63,
    height: 60,
    marginRight: 10,
  },
  input_con: {
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    height: 45,
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: CssVariables.light_white,
    marginBottom: 10,
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    paddingLeft: 40,
    borderRadius: 4,
    flexShrink: 1,
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
  },
  search_icon: {
    position: 'absolute',
    width: 25,
    height: 25,
    alignSelf: 'center',
    left: 5,
  },
  filter_icon: {
    position: 'absolute',
    width: 22,
    height: 13,
    alignSelf: 'center',
    right: 10,
  },
  upper_text: {
    fontSize: 16,
    color: CssVariables.white,
    padding: 6,
    fontFamily: CssVariables.mulishmedium,
  },
  upper_con: {
    height: '82%',
  },
  po_password_container: {
    flexDirection: 'row',
  },
  po_upper_items: {
    width: '50%',
    height: '83%',
  },
  page_filter_con: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    alignItems: 'center',
  },
  page_filter_text: {
    fontFamily: CssVariables.mulishregular,
    fontSize: 16,
    color: CssVariables.black,
  },
  page_filter_drop_down: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page_filter_drop_down_icon: {
    width: 15,
    height: 8,
    marginLeft: 5,
  },
  page_filter_arrow_icon: {
    width: 24,
    height: 24,
  },
  modal_page_fillter_con: {
    alignSelf: 'center',
    backgroundColor: CssVariables.white,
    elevation: 10,
  },
  modal_page_fillter_text: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  details_texts: {
    color: CssVariables.department_red,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 15,
  },
  depa_date_input: {
    width: '65%',
    height: 44,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 4,
    borderColor: CssVariables.light_gray,
    justifyContent: 'center',
  },
  create_depa_body: {
    flex: 1,
    backgroundColor: CssVariables.lightblack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll_view_style: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time_con: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  login_time_text: {
    fontSize: 15,
    color: CssVariables.gray,
    fontFamily: CssVariables.mulishregular,
  },
  log_out_con: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  log_out_text: {
    fontSize: 15,
    color: CssVariables.gray,
    fontFamily: CssVariables.mulishregular,
  },
  desc_con: {
    width: '90%',
    paddingHorizontal: '10%',
    height: 150,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: CssVariables.light_blue_white,
    alignSelf: 'center',
  },
  dashed_line: {
    borderWidth: 1,
    borderColor: CssVariables.strokeColor,
    borderStyle: 'dashed',
  },
  desc_text: {
    color: CssVariables.gray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 13,
  },
  work_report_con: {
    borderWidth: 1,
    width: '100%',
    height: '60%',
    borderRadius: 10,
    padding: 5,
  },
  work_report_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
  },
  date_day_text: {
    fontSize: 15,
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
  },
  create_depa_input: {
    width: '95%',
    height: '50%',
    backgroundColor: CssVariables.white,
    borderRadius: 5,
    elevation: 15,
    justifyContent: 'space-evenly',
    marginBottom: 10,
    position: 'relative',
  },
  po_create_depa_input: {
    width: '80%',
    height: '100%',
    backgroundColor: CssVariables.white,
    borderRadius: 5,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'relative',
  },
  button_con: {
    width: '80%',
    alignItems: 'center',
  },
});
