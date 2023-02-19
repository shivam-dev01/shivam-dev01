import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import {Helper} from '../classes/Helper';
import {useOrientation} from './useOrientation';
import CustomButton from './CustomButton';
import FailedModal from './FailedModal';

export default function LeaveApplication({
  change,
  setChange,
  setLeaveApplications,
  leaveapplications,
}) {
  const backFunction = () => {
    setChange(!change);
    setLeaveApplications(false);
  };
  const orientation = useOrientation();
  const [totalLeave, setTotalLeave] = useState('');
  const [noDataModal, setNoDataModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [singleLeave, setSingleave] = useState('');
  const [fillterByDetails, setFillterByDetails] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordPerPage] = useState(10);
  const [pageVisible, setPageVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
    thirdLoader: false,
    fourthLoader: false,
    fifthLoader: false,
  });
  const DropdownButton = useRef();
  useEffect(() => {
    if (leaveapplications) {
      getHoliday();
    }
  }, [currentPage, recordsPerPage]);

  const nPages = Math.ceil(totalLeave.length / recordsPerPage);

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  // console.log('---pagelength---', pageNumbers);

  const record = [10, 20, 30, 40];

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const onPgPress = value => {
    setRecordPerPage(value);
    setPageVisible(false);
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      // console.log('--py--', _fx, _fy, _w, h, _px, py);
      setDropdownTop(py + h);
    });
    setPageVisible(true);
  };

  const getHoliday = () => {
    setActiveLoader({firstLoader: true});
    const apiParams = {
      url: `${apiEndPoints.total_leave}?page=${currentPage}&limit=${recordsPerPage}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        // console.log('--res--', res);
        if (res.result.length) {
          setTotalLeave(res.result);
          setFillterByDetails(res.result);
          setActiveLoader({firstLoader: false});
        } else {
          setNoDataModal(true);
          setTotalLeave(res.result);
        }
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
    };
    Api.callApi(apiParams);
  };

  const updateRequest = id => {
    setActiveLoader({thirdLoader: true});
    const apiParams = {
      url: `${apiEndPoints.single_request}${id}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        console.log('--res---', res);
        setSingleave(res.result);
        setActiveLoader({thirdLoader: false});
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
        if (res.status === 200) {
          Helper.showToastMessage('Leave status updated successfully.');
          setActiveLoader({fourthLoader: false});
          getHoliday();
          setModalVisible(false);
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
        setActiveLoader({fourthLoader: false});
      },
      input: {
        leaveApprovalState: 'APPROVED',
      },
    };
    Api.callApi(apiParams);
  };

  const rejectLeave = id => {
    setActiveLoader({fifthLoader: true});
    const apiParams = {
      url: `${apiEndPoints.update_leave}/${id}`,
      requestMethod: 'put',
      response: res => {
        if (res.status === 200) {
          Helper.showToastMessage('Leave status updated successfully.');
          setActiveLoader({fifthLoader: false});
          getHoliday();
          setModalVisible(false);
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
        remark: '',
      },
    };
    Api.callApi(apiParams);
  };

  const renderItem = ({item}) => {
    const bgColor = () => {
      if (item.leaveApprovalState === 'PENDING') {
        return CssVariables.light_yellow;
      } else if (item.leaveApprovalState === 'APPROVED') {
        return CssVariables.light_green;
      } else if (item.leaveApprovalState === 'REJECTED') {
        return CssVariables.light_red;
      } else if (item.leaveApprovalState === 'CANCELED') {
        return CssVariables.light_red;
      }
    };
    const textColor = () => {
      if (item.leaveApprovalState === 'PENDING') {
        return CssVariables.yellow;
      } else if (item.leaveApprovalState === 'APPROVED') {
        return CssVariables.green;
      } else if (item.leaveApprovalState === 'REJECTED') {
        return CssVariables.red;
      } else if (item.leaveApprovalState === 'CANCELED') {
        return CssVariables.red;
      }
    };
    return (
      <Pressable
        style={styles.item_press_con}
        onPress={() => setModalVisible(true) || updateRequest(item._id)}>
        <View style={styles.name_con}>
          <Text style={styles.ren_full_name}>{item.userId.fullName}</Text>
        </View>
        <View style={styles.emp_con}>
          <Text style={styles.ren_emp_emp_id}>{item.userId.employeeId}</Text>
        </View>
        <View style={styles.form_date_con}>
          <Text style={styles.ren_form_text}>{item.fromDate}</Text>
        </View>
        <View style={styles.to_date_con}>
          <Text style={styles.ren_todate_text}>{item.toDate}</Text>
        </View>
        <View style={styles.status_con}>
          <Text
            style={{
              color: textColor(),
              fontSize: 10,
              padding: 3,
              borderRadius: 4,
              backgroundColor: bgColor(),
              fontFamily: CssVariables.mulishmedium,
            }}>
            {item.leaveApprovalState}
          </Text>
        </View>
      </Pressable>
    );
  };

  // const fillterData = text => {
  //   // console.log('--text--', text);
  //   if (fillterByDetails && fillterByDetails.length) {
  //     if (text) {
  //       const apiParams = {
  //         url: `${apiEndPoints.leave_filter}${text}`,
  //         requestMethod: 'get',
  //         hideResponseMsg: true,
  //         response: res => {
  //           console.log('--res--', res);
  //           setTotalLeave(res.result);
  //         },
  //         errorFunction: error => {
  //           console.log('--erorr--', error);
  //         },
  //         endFunction: () => {
  //           console.log('End Function called.');
  //         },
  //       };
  //       Api.callApi(apiParams);
  //     } else {
  //       setTotalLeave(fillterByDetails);
  //     }
  //   }
  // };

  return (
    <>
      <Modal
        animationType="fade"
        visible={leaveapplications}
        onRequestClose={backFunction}>
        <View style={styles.body}>
          <View style={styles.leave_appli_con}>
            <Text style={styles.upper_text}>Leave Applications</Text>
            <Image
              source={FilePaths.leaveapplication}
              style={styles.leave_appli_image}
            />
          </View>
          {/* <View style={styles.input_con}>
            <TextInput
              placeholder="Search by status and emp id"
              placeholderTextColor={CssVariables.gray}
              onChangeText={value => fillterData(value)}
              style={styles.input}
            />
            <Image source={FilePaths.search} style={styles.search_icon} />
          </View> */}
          <View style={styles.page_filter_con}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.page_filter_text}>Row per page : </Text>
              <TouchableOpacity
                ref={DropdownButton}
                onPress={openDropdown}
                style={styles.page_filter_drop_down}>
                <Text style={styles.page_filter_text}>{recordsPerPage}</Text>
                <Image
                  source={FilePaths.dropdownicon}
                  style={[
                    styles.page_filter_drop_down_icon,
                    {
                      transform: [{rotate: pageVisible ? '180deg' : '0deg'}],
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.page_filter_text}>
                {recordsPerPage} of {totalLeave.length}
              </Text>
            </View>

            <TouchableOpacity onPress={prevPage}>
              <Image
                source={FilePaths.leftarrow}
                style={styles.page_filter_arrow_icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={nextPage}>
              <Image
                source={FilePaths.leftarrow}
                style={[
                  styles.page_filter_arrow_icon,
                  {transform: [{rotate: '180deg'}]},
                ]}
              />
            </TouchableOpacity>
          </View>
          <Modal
            visible={pageVisible}
            animationType={'fade'}
            transparent
            onRequestClose={() => setPageVisible(false)}>
            <Pressable style={{flex: 1}} onPress={() => setPageVisible(false)}>
              <View
                style={[
                  styles.modal_page_fillter_con,
                  {
                    top: dropdownTop,
                  },
                ]}>
                {record.map(data => {
                  return (
                    <TouchableOpacity
                      style={styles.modal_page_fillter_text}
                      onPress={() => onPgPress(data)}
                      key={data}>
                      <Text style={styles.page_filter_text}>{data}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Pressable>
          </Modal>
          <View style={styles.header_con}>
            <View style={styles.name_con}>
              <Text style={styles.name_text}>Name</Text>
            </View>
            <View style={styles.emp_con}>
              <Text style={styles.emp_text}>Emp Id</Text>
            </View>
            <View style={styles.form_date_con}>
              <Text style={styles.form_date_text}>From Date</Text>
            </View>
            <View style={styles.to_date_con}>
              <Text style={styles.to_date_text}>To Date</Text>
            </View>
            <View style={styles.status_con}>
              <Text style={styles.status_text}>Status</Text>
            </View>
          </View>
          <View style={{height: '77%'}}>
            <FlatList
              data={totalLeave}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <Modal
            animationType="slide"
            visible={modalVisible}
            transparent
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.create_depa_body}>
              {activeLoader.thirdLoader ? (
                <ActivityIndicator
                  size={'large'}
                  color={CssVariables.darkgreen}
                  style={styles.loader}
                />
              ) : (
                <View style={styles.modal_con_flatlist}>
                  <FlatList
                    data={singleLeave}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                      const bgColor = () => {
                        if (item.leaveApprovalState === 'PENDING') {
                          return CssVariables.light_yellow;
                        } else if (item.leaveApprovalState === 'APPROVED') {
                          return CssVariables.light_green;
                        } else if (item.leaveApprovalState === 'REJECTED') {
                          return CssVariables.light_red;
                        } else if (item.leaveApprovalState === 'CANCELED') {
                          return CssVariables.light_red;
                        }
                      };
                      const textColor = () => {
                        if (item.leaveApprovalState === 'PENDING') {
                          return CssVariables.yellow;
                        } else if (item.leaveApprovalState === 'APPROVED') {
                          return CssVariables.green;
                        } else if (item.leaveApprovalState === 'REJECTED') {
                          return CssVariables.red;
                        } else if (item.leaveApprovalState === 'CANCELED') {
                          return CssVariables.red;
                        }
                      };
                      return (
                        <>
                          <View
                            style={
                              orientation === 'PORTRAIT'
                                ? styles.create_depa_input
                                : styles.po_create_depa_input
                            }>
                            <View style={styles.emp_details_con}>
                              {/* <View style={styles.photo_con}>
                                <Image source={{uri: item.userId.image}} />
                              </View> */}
                              <Text style={styles.full_name_text}>
                                {item.userId.fullName}
                              </Text>
                              <Text
                                style={{
                                  color: textColor(),
                                  fontSize: 14,
                                  padding: 3,
                                  borderRadius: 4,
                                  backgroundColor: bgColor(),
                                  fontFamily: CssVariables.mulishmedium,
                                  textAlign: 'center',
                                }}>
                                {item.leaveApprovalState}
                              </Text>
                              <Text style={styles.emp_id_text}>
                                {item.userId.employeeId}
                              </Text>
                              <Text style={styles.depa_text}>
                                {item.userId.department}
                              </Text>
                              <Text style={styles.job_role_text}>
                                {item.userId.jobRole}
                              </Text>
                            </View>
                            <View style={styles.date_con}>
                              <Text style={styles.from_date_text}>
                                From {item.fromDate}
                              </Text>
                              <Text style={styles.to_sec_date_text}>
                                To {item.toDate}
                              </Text>
                              <View style={{marginVertical: 8}}>
                                <Text style={styles.subj_text}>Subject</Text>
                                <Text style={styles.item_subj_text}>
                                  {item.subject}
                                </Text>
                              </View>
                              <View>
                                <Text style={styles.desc_text}>
                                  Description
                                </Text>
                                <Text style={styles.item_desc_text}>
                                  {item.description}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.button_con}>
                              <CustomButton
                                onPress={() => approveLeave(item._id)}
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
                                  fieldType: 'widthlongdarkgreen',
                                }}
                              />
                              <CustomButton
                                onPress={() => rejectLeave(item._id)}
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
                                properties={{
                                  fieldType: 'white',
                                }}
                              />
                            </View>
                          </View>
                        </>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </Modal>
          <FailedModal
            visible={noDataModal}
            onRequestClose={() => setNoDataModal(false)}
            properties={{
              failed: 'nodata',
              modalFalse: setNoDataModal,
            }}
          />
          {activeLoader.firstLoader && (
            <View style={styles.first_loader}>
              <ActivityIndicator
                size={'large'}
                color={CssVariables.darkgreen}
              />
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.white,
  },
  input_con: {
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    height: 45,
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: CssVariables.light_white,
    marginVertical: 10,
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
  leave_appli_con: {
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
  leave_appli_image: {
    width: 63,
    height: 60,
    marginRight: 10,
  },
  header_con: {
    flexDirection: 'row',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: CssVariables.light_gray,
    paddingVertical: 10,
  },
  name_con: {
    width: '16%',
    justifyContent: 'center',
    paddingLeft: 3,
  },
  name_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
  },
  emp_con: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emp_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
  },
  form_date_con: {
    width: '23%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form_date_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
  },
  to_date_con: {
    width: '23%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  to_date_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
  },
  status_con: {
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  status_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
  },

  item_press_con: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    marginVertical: 5,
  },

  ren_full_name: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishmedium,
  },

  ren_form_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 12,
    fontFamily: CssVariables.mulishmedium,
  },

  ren_todate_text: {
    color: CssVariables.black,
    fontSize: 12,
    fontFamily: CssVariables.mulishmedium,
  },

  ren_emp_emp_id: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 12,
    fontFamily: CssVariables.mulishmedium,
  },

  create_depa_body: {
    height: '100%',
    justifyContent: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_con_flatlist: {
    width: '100%',
    shadowColor: CssVariables.light_gray,
  },
  create_depa_input: {
    width: '95%',
    justifyContent: 'space-evenly',
    backgroundColor: CssVariables.white,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 15,
    marginVertical: 15,
    paddingVertical: 10,
  },
  emp_details_con: {
    alignItems: 'center',
    height: '40%',
    marginTop: 10,
    justifyContent: 'space-evenly',
  },
  photo_con: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
  },
  full_name_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 16,
  },
  emp_id_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 16,
  },
  depa_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
  },
  job_role_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
  },
  date_con: {
    marginVertical: 10,
    paddingHorizontal: '10%',
  },
  from_date_text: {
    color: CssVariables.gray,
    fontSize: 16,
    fontFamily: CssVariables.mulishregular,
  },
  to_sec_date_text: {
    color: CssVariables.gray,
    fontSize: 16,
    fontFamily: CssVariables.mulishregular,
  },
  subj_text: {
    color: CssVariables.black,
    fontSize: 16,
    fontFamily: CssVariables.mulishmedium,
  },
  item_subj_text: {
    color: CssVariables.black,
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
  },
  desc_text: {
    color: CssVariables.black,
    fontSize: 16,
    fontFamily: CssVariables.mulishmedium,
  },
  item_desc_text: {
    color: CssVariables.black,
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
    flexWrap: 'wrap',
  },
  po_create_depa_input: {
    width: '50%',
    height: '95%',
    backgroundColor: CssVariables.white,
    borderRadius: 15,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  button_con: {
    paddingHorizontal: '10%',
    width: '100%',
    alignItems: 'center',
    marginVertical: 30,
  },
  first_loader: {
    backgroundColor: CssVariables.white,
    width: '100%',
    height: '100%',
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
