// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {FilePaths} from '../constants/filepath';
// import CustomMenu from '../components/CustomMenu';
// import CustomButton from '../components/CustomButton';
// import {CssVariables} from '../constants/CssVariables';
// import CreateHoliday from '../components/CreateHoliday';
// import HolidayList from '../screens/HolidayList';
// import LeaveApplication from '../components/LeaveApplication';
// import {useOrientation} from '../components/useOrientation';

// export default function LeaveHoliday({navigation}) {
//   const orientation = useOrientation();
//   const [showMenu, setShowMenu] = useState(false);
//   const [change, setChange] = useState(false);
//   const [holidayCraeation, setHolidayCreation] = useState(false);
//   const [holidayLists, setHolidayLists] = useState(false);
//   const [leaveapplications, setLeaveApplications] = useState(false);

//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity
//           onPress={() => {
//             setShowMenu(!showMenu);
//           }}>
//           <Image
//             source={showMenu ? FilePaths.menucrossbutton : FilePaths.menubutton}
//             style={styles.right_menu_cross_icon}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   }, [showMenu, change]);

//   const creteHoliday = () => {
//     setChange(!change);
//     setHolidayCreation(true);
//     setHolidayLists(false);
//     setLeaveApplications(false);
//   };

//   const holidaylist = () => {
//     setChange(!change);
//     setHolidayCreation(false);
//     setHolidayLists(true);
//     setLeaveApplications(false);
//   };

//   const leaveApplication = () => {
//     setChange(!change);
//     setLeaveApplications(true);
//     setHolidayCreation(false);
//     setHolidayLists(false);
//   };

//   return (
//     <View style={orientation === 'PORTRAIT' ? styles.body : styles.po_body}>
//       <View style={styles.content_container}>
//         <CustomMenu
//           showMenu={showMenu}
//           setShowMenu={setShowMenu}
//           navigation={navigation}
//           setChange={setChange}
//         />
//         <View style={styles.upper_text_cont}>
//           <Text style={styles.upper_text}>Leaves & Holidays</Text>
//         </View>
//         {change ? (
//           <View style={{height: '100%', backgroundColor: CssVariables.white}}>
//             <CreateHoliday
//               change={change}
//               setChange={setChange}
//               setHolidayCreation={setHolidayCreation}
//               holidayCraeation={holidayCraeation}
//             />
//             <HolidayList
//               change={change}
//               setChange={setChange}
//               setHolidayLists={setHolidayLists}
//               holidayLists={holidayLists}
//             />
//             <LeaveApplication
//               change={change}
//               setChange={setChange}
//               setLeaveApplications={setLeaveApplications}
//               leaveapplications={leaveapplications}
//             />
//           </View>
//         ) : (
//           <>
//             <View style={orientation === 'LANDSCAPE' ? styles.po_con : null}>
//               <View
//                 style={
//                   orientation === 'LANDSCAPE'
//                     ? styles.po_main_butt_con
//                     : styles.main_butt_con
//                 }>
//                 <ScrollView contentContainerStyle={styles.button_con}>
//                   <CustomButton
//                     onPress={creteHoliday}
//                     text="Create Holidays"
//                     properties={{
//                       manageEmployee: 'createemployees',
//                       imageType: 'createholiday',
//                     }}
//                   />
//                   <CustomButton
//                     onPress={holidaylist}
//                     text="Holiday List"
//                     properties={{
//                       manageEmployee: 'createemployees',
//                       imageType: 'holidaylist',
//                     }}
//                   />
//                   <CustomButton
//                     onPress={leaveApplication}
//                     text="Leave Applications"
//                     properties={{
//                       manageEmployee: 'createemployees',
//                       imageType: 'leaveapplication',
//                     }}
//                   />
//                 </ScrollView>
//               </View>
//             </View>
//           </>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//   },
//   po_body: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   upper_text_cont: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: CssVariables.darkgreen,
//     height: 60,
//   },
//   upper_text: {
//     fontSize: 16,
//     color: CssVariables.white,
//     padding: 6,
//     fontFamily: CssVariables.mulishmedium,
//   },
//   content_container: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: CssVariables.white,
//   },
//   right_menu_cross_icon: {
//     width: 48,
//     height: 48,
//     right: 15,
//   },
//   left_back_icon: {
//     width: 48,
//     height: 48,
//     left: 15,
//   },
//   po_con: {
//     position: 'relative',
//     flexDirection: 'row',
//   },
//   input_con: {
//     paddingHorizontal: '10%',
//     marginVertical: '2%',
//   },
//   po_input_con: {
//     width: '70%',
//     position: 'absolute',
//     right: 0,
//     paddingHorizontal: '5%',
//   },
//   data_cont: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   po_data_cont: {
//     width: '30%',
//     height: '76%',
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   data_text_con: {
//     alignItems: 'center',
//   },
//   data_text: {
//     color: CssVariables.darkpink,
//     fontSize: 16,
//     fontFamily: CssVariables.mulishregular,
//   },
//   data_number: {
//     color: CssVariables.darkred,
//     fontSize: 30,
//     fontFamily: CssVariables.mulishmedium,
//   },
//   po_main_butt_con: {
//     width: '100%',
//     height: '80%',
//   },
//   main_butt_con: {
//     width: '100%',
//     height: '95%',
//   },
//   button_con: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingBottom: 30,
//   },
// });

import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {CssVariables} from '../constants/CssVariables';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FilePaths} from '../constants/filepath';
import CustomTextInput from '../components/CoustomTextInput';
import moment from 'moment';
import CustomButton from '../components/CustomButton';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import {Helper} from '../classes/Helper';
import FailedModal from '../components/FailedModal';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export default function LeaveHoliday() {
  const subject = useRef('');
  const desc = useRef('');
  const [date, setDate] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [toDate, setToDate] = useState('');
  const [toMode, setToMode] = useState('date');
  const [toShow, setToShow] = useState(false);
  const [userId, setUserId] = useState('');
  const [recent, setRecent] = useState(true);
  const [report, setReport] = useState(false);
  const [attendance, setAttendance] = useState(false);
  const [totalLeave, setTotalLeave] = useState([]);
  const [noDataModal, setNoDataModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [singleLeave, setSingleave] = useState([]);
  const [fillterByDetails, setFillterByDetails] = useState('');
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
    thirdLoader: false,
    fourthLoader: false,
    fifthLoader: false,
  });
  const rdesc = useRef('');
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const animatedHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, 93],
    outputRange: [93, 0],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    Helper.getLoginData(data => {
      setUserId(data.result.id);
      myLeaveRequest(data.result.id);
    });
  }, []);

  const onChange = (event, selectedTime) => {
    setShow(false);
    setDate(selectedTime);
  };

  const showMode = currentMode => {
    setShow(false);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
    setShow(true);
  };
  const toOnChange = (event, selectedTime) => {
    setToShow(false);
    setToDate(selectedTime);
  };

  const toShowMode = currentMode => {
    setToShow(false);
    setToMode(currentMode);
  };

  const showToDatePicker = () => {
    toShowMode('date');
    setToShow(true);
  };

  const handleApplyLeave = () => {
    if (
      subject.current.textInput.length === 0 ||
      desc.current.textInput === 0 ||
      !date ||
      !toDate
    ) {
      subject.current.inputError();
      desc.current.inputError();
      Helper.showToastMessage('Please select date.');
    } else {
      setActiveLoader({firstLoader: true});
      const apiParams = {
        url: apiEndPoints.apply_leave,
        requestMethod: 'post',
        response: res => {
          console.log('--res--', res);
          setActiveLoader({firstLoader: false});
          if (res.status === 200) {
            setDate('');
            setToDate('');
            subject.current.setTextInput('');
            desc.current.setTextInput('');
            myLeaveRequest(userId);
          }
        },
        errorFunction: error => {
          console.log('--error--', error);
          setActiveLoader({firstLoader: false});
          if (error === undefined) {
            Helper.showToastMessage('Something went wrong');
          }
        },
        endFunction: () => {
          console.log('End Function Called');
          setActiveLoader({firstLoader: false});
        },
        input: {
          userId: userId,
          fromDate: date,
          toDate: toDate,
          subject: subject.current.textInput,
          description: desc.current.textInput,
        },
      };
      Api.callApi(apiParams);
    }
  };

  const onRecent = () => {
    setRecent(true);
    setReport(false);
    setAttendance(false);
    myLeaveRequest(userId, 'PENDING');
  };

  const onReport = () => {
    setRecent(false);
    setReport(true);
    setAttendance(false);
    myLeaveRequest(userId, 'APPROVED');
  };

  const onAttendance = () => {
    setRecent(false);
    setReport(false);
    setAttendance(true);
    myLeaveRequest(userId, 'REJECTED');
  };

  const myLeaveRequest = (id, value) => {
    setActiveLoader({secondLoader: true});
    setTotalLeave([]);
    const apiParams = {
      url: `${apiEndPoints.get_leave_request}?status=${
        value ? value : 'PENDING'
      }`,
      requestMethod: 'get',
      // hideResponseMsg: true,
      response: res => {
        console.log('--res--', res);
        if (res.result.length) {
          setTotalLeave(res.result);
          setFillterByDetails(res.result);
          setActiveLoader({secondLoader: false});
        } else {
          setNoDataModal(true);
          setTotalLeave(res.result);
        }
      },
      errorFunction: error => {
        console.log('--error--', error);
        if (error === undefined) {
          setActiveLoader({secondLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({secondLoader: false});
        }
      },
      endFunction: () => {
        console.log('End Function Called');
        setActiveLoader({secondLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const renderApprovedItem = useCallback(({item}) => {
    const approvedText = () => {
      if (item.leaveApprovalState === 'APPROVED') {
        return 'Approved';
      }
    };
    return (
      <>
        {item && item.leaveApprovalState === 'APPROVED' && (
          <Pressable
            style={styles.item_main_con}
            onPress={() => onItemPress(item._id)}>
            <View style={styles.item_con}>
              <View style={styles.first_box}>
                <Text style={styles.app_status_text}>Approval Status</Text>
                <Text style={styles.app_text}>{approvedText()}</Text>
                <Text style={styles.days_text}>{item.noOfDays} Days</Text>
              </View>
              <View style={styles.second_box}>
                <View style={{justifyContent: 'flex-start'}}>
                  <View style={{flexDirection: 'row', marginVertical: 2}}>
                    <Text style={styles.from_date}>From Date: </Text>
                    <Text style={styles.from_date_text}>
                      {moment(item.fromDate).format('ddd, D MMM YYYY')}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 2}}>
                    <Text style={styles.to_date}>To Date: </Text>
                    <Text style={styles.to_date_text}>
                      {moment(item.toDate).format('ddd, D MMM YYYY')}
                    </Text>
                  </View>
                  <Text style={styles.subject}>{item.subject}</Text>
                  <Text style={styles.desc_text}>{`${item.description.slice(
                    0,
                    30,
                  )}...`}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.update_date}>
              <Text style={styles.update_date_text}>Approved on</Text>{' '}
              {moment(item.updatedAt).format('ddd, D MMM YYYY')}
            </Text>
          </Pressable>
        )}
      </>
    );
  }, []);

  const renderRejectItem = useCallback(({item}) => {
    const approvedText = () => {
      if (item.leaveApprovalState === 'REJECTED') {
        return 'Rejected';
      }
    };
    return (
      <>
        {item && item.leaveApprovalState === 'REJECTED' && (
          <Pressable
            style={[
              styles.item_main_con,
              {backgroundColor: CssVariables.red_meduim},
            ]}
            onPress={() => onItemPress(item._id)}>
            <View style={styles.item_con}>
              <View style={styles.first_box}>
                <Text style={styles.app_status_text}>Approval Status</Text>
                <Text
                  style={[styles.app_text, {color: CssVariables.red_meduim}]}>
                  {approvedText()}
                </Text>
              </View>
              <View style={styles.second_box}>
                <View style={{justifyContent: 'flex-start'}}>
                  <View style={{flexDirection: 'row', marginVertical: 2}}>
                    <Text style={styles.from_date}>From Date: </Text>
                    <Text
                      style={[
                        styles.from_date_text,
                        {color: CssVariables.red_meduim},
                      ]}>
                      {moment(item.fromDate).format('ddd, D MMM YYYY')}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 2}}>
                    <Text style={styles.to_date}>To Date: </Text>
                    <Text
                      style={[
                        styles.to_date_text,
                        {color: CssVariables.red_meduim},
                      ]}>
                      {moment(item.toDate).format('ddd, D MMM YYYY')}
                    </Text>
                  </View>
                  <Text style={styles.subject}>{item.subject}</Text>
                  <Text style={styles.desc_text}>
                    {`${item.remark.slice(0, 30)}...`}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={[
                styles.update_date,
                {
                  color: CssVariables.red_meduim,
                  borderTopColor: CssVariables.red_meduim,
                },
              ]}>
              <Text style={styles.update_date_text}>Rejected on</Text>{' '}
              {moment(item.updatedAt).format('ddd, D MMM YYYY')}
            </Text>
          </Pressable>
        )}
      </>
    );
  }, []);

  const keyExtractor = useCallback((item, key) => key.toString(), []);

  const onItemPress = id => {
    setModalVisible(true);
    updateRequest(id);
  };

  const updateRequest = id => {
    setActiveLoader({thirdLoader: true});
    const apiParams = {
      url: `${apiEndPoints.single_request}/${id}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        console.log('--res---', res);
        setSingleave(res.result);
        setActiveLoader({thirdLoader: false});
      },
      errorFunction: error => {
        console.log('--error--', error);
        if (error === undefined) {
          setActiveLoader({fifthLoader: false});
          Helper.showToastMessage('Something went wronog.');
        } else {
          setActiveLoader({fifthLoader: false});
        }
      },
      endFunction: () => {
        console.log('End Function Called');
        setActiveLoader({thirdLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const approveLeave = id => {
    setActiveLoader({fourthLoader: true});
    const apiParams = {
      url: `${apiEndPoints.update_leave}/${id}`,
      requestMethod: 'put',
      response: res => {
        Helper.showToastMessage('Leave status updated successfully.');
        setActiveLoader({fourthLoader: false});
        setModalVisible(false);
        myLeaveRequest('', 'PENDING');
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error === undefined) {
          setActiveLoader({fifthLoader: false});
          Helper.showToastMessage('Something went wronog.');
        } else {
          setActiveLoader({fifthLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({fourthLoader: false});
      },
      input: {
        leaveApprovalState: 'APPROVED',
      },
    };
    Api.callApi(apiParams);
  };

  const rejectLeave = id => {
    if (rdesc.current.textInput.length === 0) {
      rdesc.current.inputError();
    } else {
      setActiveLoader({fifthLoader: true});
      const apiParams = {
        url: `${apiEndPoints.update_leave}/${id}`,
        requestMethod: 'put',
        response: res => {
          if (res.status === 200) {
            Helper.showToastMessage('Leave status updated successfully.');
            setActiveLoader({fifthLoader: false});
            setModalVisible(false);
            myLeaveRequest('', 'PENDING');
          }
        },
        errorFunction: error => {
          // console.log('--error--', error);
          if (error === undefined) {
            setActiveLoader({fifthLoader: false});
            Helper.showToastMessage('Something went wronog.');
          } else {
            setActiveLoader({fifthLoader: false});
          }
        },
        endFunction: () => {
          // console.log('End Function Called');
          setActiveLoader({fifthLoader: false});
        },
        input: {
          leaveApprovalState: 'REJECTED',
          remark: rdesc.current.textInput,
        },
      };
      Api.callApi(apiParams);
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.upper_button_con}>
        <Pressable
          style={{
            backgroundColor: recent
              ? CssVariables.sky_blue
              : CssVariables.white,
            borderRadius: 20,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onRecent}>
          <Text
            style={{
              paddingVertical: recent ? 10 : 0,
              paddingHorizontal: recent ? 20 : 15,
              color: recent ? CssVariables.white : CssVariables.dark_blue,
              fontFamily: CssVariables.mulishmedium,
              fontSize: recent ? 16 : 12,
            }}>
            Pending
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: report
              ? CssVariables.sky_blue
              : CssVariables.white,
            borderRadius: 20,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onReport}>
          <Text
            style={{
              paddingVertical: report ? 10 : 0,
              paddingHorizontal: report ? 20 : 15,
              color: report ? CssVariables.white : CssVariables.dark_blue,
              fontFamily: CssVariables.mulishmedium,
              fontSize: report ? 16 : 12,
            }}>
            Approved
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: attendance
              ? CssVariables.sky_blue
              : CssVariables.white,
            borderRadius: 20,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onAttendance}>
          <Text
            style={{
              paddingVertical: attendance ? 10 : 0,
              paddingHorizontal: attendance ? 20 : 15,
              color: attendance ? CssVariables.white : CssVariables.dark_blue,
              fontFamily: CssVariables.mulishmedium,
              fontSize: attendance ? 16 : 12,
            }}>
            Rejected
          </Text>
        </Pressable>
      </View>
      {recent && (
        <ScrollView
          disableScrollViewPanResponder={true}
          contentContainerStyle={styles.scroll_view}>
          <>
            {activeLoader.secondLoader ? (
              <ActivityIndicator size={'large'} color={CssVariables.sky_blue} />
            ) : (
              <View style={{}}>
                {totalLeave && totalLeave.length
                  ? totalLeave.map((item, key) => {
                      const approvedText = () => {
                        if (item.leaveApprovalState === 'PENDING') {
                          return 'Pending';
                        }
                      };
                      return (
                        <Pressable
                          key={key}
                          onPress={() => onItemPress(item._id)}>
                          {item && item.leaveApprovalState === 'PENDING' && (
                            <View
                              style={[
                                styles.item_main_con,
                                {backgroundColor: CssVariables.pale_orange},
                              ]}>
                              <View style={styles.item_con}>
                                <View style={styles.first_box}>
                                  <Text style={styles.app_status_text}>
                                    Approval Status
                                  </Text>
                                  <Text
                                    style={[
                                      styles.app_text,
                                      {color: CssVariables.pale_orange},
                                    ]}>
                                    {approvedText()}
                                  </Text>
                                  <Text style={styles.days_text}>
                                    {item.noOfDays} Days
                                  </Text>
                                </View>
                                <View style={styles.second_box}>
                                  <View style={{justifyContent: 'flex-start'}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginVertical: 2,
                                      }}>
                                      <Text style={styles.from_date}>
                                        From Date:{' '}
                                      </Text>
                                      <Text
                                        style={[
                                          styles.from_date_text,
                                          {color: CssVariables.pale_orange},
                                        ]}>
                                        {moment(item.fromDate).format(
                                          'ddd, D MMM YYYY',
                                        )}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginVertical: 2,
                                      }}>
                                      <Text style={styles.to_date}>
                                        To Date:{' '}
                                      </Text>
                                      <Text
                                        style={[
                                          styles.to_date_text,
                                          {color: CssVariables.pale_orange},
                                        ]}>
                                        {moment(item.toDate).format(
                                          'ddd, D MMM YYYY',
                                        )}
                                      </Text>
                                    </View>
                                    <Text style={styles.subject}>
                                      {item.subject}
                                    </Text>
                                    <Text style={styles.desc_text}>
                                      {`${item.description.slice(0, 20)}...`}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          )}
                        </Pressable>
                      );
                    })
                  : ''}
              </View>
            )}
          </>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
              dayOfWeekFormat={'{dayofweek.abbreviated(2)}'}
            />
          )}
          {toShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={toMode}
              is24Hour={true}
              onChange={toOnChange}
              dayOfWeekFormat={'{dayofweek.abbreviated(2)}'}
            />
          )}
        </ScrollView>
      )}
      {report && (
        <>
          {activeLoader.secondLoader ? (
            <ActivityIndicator size={'large'} color={CssVariables.sky_blue} />
          ) : (
            <FlatList
              data={totalLeave}
              keyExtractor={keyExtractor}
              renderItem={renderApprovedItem}
            />
          )}
        </>
      )}
      {attendance && (
        <>
          {activeLoader.secondLoader ? (
            <ActivityIndicator size={'large'} color={CssVariables.sky_blue} />
          ) : (
            <FlatList
              data={totalLeave}
              keyExtractor={keyExtractor}
              renderItem={renderRejectItem}
            />
          )}
        </>
      )}
      <FailedModal
        visible={noDataModal}
        onRequestClose={() => setNoDataModal(false)}
        properties={{
          failed: 'nodata',
          modalFalse: setNoDataModal,
        }}
      />
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modal_body}
          onPress={() => setModalVisible(false)}>
          {activeLoader.thirdLoader ? (
            <ActivityIndicator size={'large'} color={CssVariables.sky_blue} />
          ) : (
            <Pressable
              style={styles.modal_body_con}
              onPress={() => setModalVisible(true)}>
              {singleLeave.map((item, key) => {
                console.log('--item----', item);
                const textColor = () => {
                  if (item.leaveApprovalState === 'APPROVED') {
                    return CssVariables.green;
                  } else if (item.leaveApprovalState === 'PENDING') {
                    return CssVariables.pale_orange;
                  } else if (item.leaveApprovalState === 'REJECTED') {
                    return CssVariables.red_meduim;
                  }
                };
                const remarkText = () => {
                  if (item.leaveApprovalState === 'APPROVED') {
                    return item.description;
                  } else if (item.leaveApprovalState === 'PENDING') {
                    return item.description;
                  } else if (item.leaveApprovalState === 'REJECTED') {
                    return item.description;
                  }
                };

                const updateDate = () => {
                  if (item.leaveApprovalState === 'APPROVED') {
                    return item.updatedAt;
                  } else if (item.leaveApprovalState === 'REJECTED') {
                    return item.updatedAt;
                  }
                };

                return (
                  <View
                    key={key}
                    style={{
                      width: '85%',
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{alignItems: 'center', marginVertical: 5}}>
                      <Text
                        style={{
                          color: CssVariables.dark_blue,
                          fontSize: 14,
                          fontFamily: CssVariables.mulishmedium,
                        }}>
                        {item.userId.fullName}
                      </Text>
                      <Text
                        style={{
                          color: CssVariables.gray,
                          fontSize: 13,
                          fontFamily: CssVariables.mulishregular,
                          alignSelf: 'center',
                        }}>
                        {item.userId.employeeId}
                      </Text>
                      <Text
                        style={{
                          color: CssVariables.gray,
                          fontSize: 13,
                          fontFamily: CssVariables.mulishregular,
                          alignSelf: 'center',
                        }}>
                        {item.userId.department}
                      </Text>
                      <Text
                        style={{
                          color: CssVariables.gray,
                          fontSize: 13,
                          fontFamily: CssVariables.mulishregular,
                          alignSelf: 'center',
                        }}>
                        {item.userId.jobRole}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text
                          style={{
                            color: CssVariables.dark_blue,
                            fontSize: 15,
                            fontFamily: CssVariables.mulishregular,
                            alignSelf: 'center',
                          }}>
                          Approval status
                        </Text>
                        <Text
                          style={{
                            color: textColor(),
                            fontSize: 13,
                            fontFamily: CssVariables.mulishregular,
                          }}>
                          {item.leaveApprovalState}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: CssVariables.red_meduim,
                          fontSize: 16,
                          fontFamily: CssVariables.mulishregular,
                          alignSelf: 'center',
                          marginVertical: 10,
                        }}>
                        {item.noOfDays} Days
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 2}}>
                      <Text style={styles.from_date}>From Date: </Text>
                      <Text
                        style={[styles.from_date_text, {color: textColor()}]}>
                        {moment(item.fromDate).format('ddd, D MMM YYYY')}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 2}}>
                      <Text style={styles.to_date}>To Date: </Text>
                      <Text style={[styles.to_date_text, {color: textColor()}]}>
                        {moment(item.toDate).format('ddd, D MMM YYYY')}
                      </Text>
                    </View>
                    <Text style={[styles.subject, {marginVertical: 10}]}>
                      {item.subject}
                    </Text>
                    {/* </View> */}
                    <ScrollView
                      contentContainerStyle={[
                        styles.scroll_view_desc_con,
                        {
                          height:
                            item.leaveApprovalState === 'PENDING' ? 60 : 120,
                        },
                      ]}>
                      <Text style={styles.desc_text}>{remarkText()}</Text>
                    </ScrollView>
                    {item.leaveApprovalState === 'REJECTED' && (
                      <>
                        <Text
                          style={{
                            fontFamily: CssVariables.mulishregular,
                            fontSize: 12,
                            color: CssVariables.dark_blue,
                          }}>
                          Remark
                        </Text>
                        <ScrollView
                          contentContainerStyle={styles.scroll_view_desc_con}>
                          <Text style={styles.desc_text}>{item.remark}</Text>
                        </ScrollView>
                      </>
                    )}
                    {item.leaveApprovalState === 'PENDING' && (
                      <View
                        style={{
                          alignSelf: 'center',
                        }}>
                        <CustomTextInput
                          ref={rdesc}
                          properties={{
                            fieldType: 'rejectdes',
                          }}
                        />
                      </View>
                    )}
                    {item.leaveApprovalState !== 'PENDING' && (
                      <Text
                        style={[
                          styles.update_date,
                          {color: textColor(), borderColor: textColor()},
                        ]}>
                        <Text style={styles.update_date_text}>
                          {item.leaveApprovalState === 'APPROVED'
                            ? 'Approved on'
                            : 'Rejected on'}
                        </Text>{' '}
                        {moment(updateDate()).format('ddd, D MMM YYYY')}
                      </Text>
                    )}
                    {item.leaveApprovalState === 'PENDING' && (
                      <>
                        <View style={{marginTop: 10}}>
                          <CustomButton
                            text={
                              activeLoader.fourthLoader ? (
                                <ActivityIndicator
                                  size={'small'}
                                  color={CssVariables.white}
                                />
                              ) : (
                                'Approve'
                              )
                            }
                            properties={{
                              fieldType: 'darkgreen',
                            }}
                            onPress={() => approveLeave(item._id)}
                          />
                        </View>
                        <View style={{marginBottom: 10}}>
                          <CustomButton
                            text={
                              activeLoader.fifthLoader ? (
                                <ActivityIndicator
                                  size={'small'}
                                  color={CssVariables.red}
                                />
                              ) : (
                                'Reject'
                              )
                            }
                            onPress={() => rejectLeave(item._id)}
                            properties={{
                              fieldType: 'white',
                            }}
                          />
                        </View>
                      </>
                    )}
                  </View>
                );
              })}
              <Pressable
                style={{position: 'absolute', top: 10, right: 10}}
                onPress={() => setModalVisible(false)}>
                <Image
                  source={FilePaths.cancleicon}
                  style={{width: 25, height: 25, padding: 5}}
                />
              </Pressable>
            </Pressable>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.light_white,
  },
  upper_button_con: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
  },
  scroll_view: {
    width: '100%',
    alignItems: 'center',
  },
  apply_text: {
    fontSize: 20,
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.black,
    marginVertical: 10,
  },
  depa_date_con: {
    width: '80%',
    position: 'relative',
    paddingBottom: 29,
  },
  details_texts: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 15,
  },
  depa_date_input: {
    width: '80%',
    height: 50,
    overflow: 'hidden',
    borderRadius: 25,
    paddingHorizontal: 10,
    backgroundColor: CssVariables.light_blue_white,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  date_text: {
    color: CssVariables.gray,
    fontSize: 14,
    fontFamily: CssVariables.mulishmedium,
  },
  dob_icon: {
    marginHorizontal: 5,
    alignSelf: 'center',
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_text: {
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    color: CssVariables.black,
    marginBottom: 4,
  },
  item_main_con: {
    width: '95%',
    paddingLeft: 10,
    alignSelf: 'center',
    backgroundColor: CssVariables.green,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    marginVertical: 5,
  },
  item_con: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: CssVariables.white,
  },
  first_box: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  app_status_text: {
    color: CssVariables.dark_blue,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 12,
  },
  app_text: {
    color: CssVariables.green,
    fontFamily: CssVariables.mulishregular,
    fontSize: 13,
  },
  second_box: {
    width: '62%',
    alignItems: 'center',
    marginVertical: 2,
  },
  days_text: {
    color: CssVariables.red_meduim,
    fontFamily: CssVariables.mulishregular,
    fontSize: 18,
  },
  from_date: {
    color: CssVariables.dark_blue,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 12,
  },
  from_date_text: {
    color: CssVariables.green,
    fontFamily: CssVariables.mulishregular,
    fontSize: 13,
  },
  to_date: {
    color: CssVariables.dark_blue,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 12,
  },
  to_date_text: {
    color: CssVariables.green,
    fontFamily: CssVariables.mulishregular,
    fontSize: 13,
  },
  subject: {
    color: CssVariables.dark_blue,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  desc_text: {
    color: CssVariables.gray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: 2,
  },
  update_date: {
    textAlign: 'center',
    backgroundColor: CssVariables.white,
    color: CssVariables.green,
    fontFamily: CssVariables.mulishregular,
    fontSize: 13,
    paddingVertical: 2,
    paddingBottom: 5,
    borderTopWidth: 0.5,
    borderColor: CssVariables.green,
  },
  update_date_text: {
    color: CssVariables.dark_blue,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 12,
  },
  modal_body: {
    flex: 1,
    backgroundColor: CssVariables.lightblack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_body_con: {
    width: windowWidth * 0.9,
    borderRadius: 10,
    backgroundColor: CssVariables.white,
    alignItems: 'center',
  },
  scroll_view_desc_con: {
    height: 120,
    backgroundColor: CssVariables.light_blue_white,
    borderRadius: 10,
    padding: 8,
    marginVertical: 5,
  },
});
