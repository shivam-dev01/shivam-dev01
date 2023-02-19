import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import CustomButton from '../components/CustomButton';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import CoustomTextInput from './CoustomTextInput';
import FailedModal from './FailedModal';
import SuccessModal from './SuccessModal';
import {Helper} from '../classes/Helper';
import {useOrientation} from './useOrientation';
import CustomDropDown from './CustomDropDown';

export default function ViewEmployeeCard({}) {
  const orientation = useOrientation();

  const remark = useRef('');
  const [modalVisible, setModalVisible] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [fillterByDetails, setFillterByDetails] = useState('');
  const [specificDetails, setSpecificDetails] = useState([]);
  const [secModalVisible, setSecModalVisible] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState('');
  const [noDataModal, setNoDataModal] = useState(false);
  const [reject, setReject] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordPerPage] = useState(10);
  const [pageVisible, setPageVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
    thirdLoader: false,
    fourthLoader: false,
    fifthLoader: false,
  });

  const [allDepartment, setAllDepartment] = useState('');
  const [department, setDepartment] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [fetchJobRole, setFetchJobeRole] = useState('');
  const DropdownButton = useRef();

  useEffect(() => {
    getAllEmplooyee();
  }, [jobRole, department]);

  // For Pagination
  // useEffect(() => {
  //   getAllEmplooyee();
  // }, [currentPage, recordsPerPage]);
  // for temporary total employee//
  let totalEmployee = 35;
  const nPages = Math.ceil(totalEmployee / recordsPerPage);

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

  const noDepa = [
    {
      error: activeLoader.secondLoader
        ? 'Loading...'
        : 'You have not created department.Please Create first.',
    },
  ];
  const noJobRole = [
    {
      error: activeLoader.thirdLoader
        ? 'Loading...'
        : 'You have not created job role for this department.Please Create first.',
    },
  ];

  const url = () => {
    if (department && jobRole)
      return `${apiEndPoints.filter_employee}?department=${department.department}&jobRole=${jobRole.jobRole}`;
    if (department && !jobRole)
      return `${apiEndPoints.filter_employee}?department=${department.department}`;
    if (!department && !jobRole) return `${apiEndPoints.get_all_employee}`;
  };

  const getAllEmplooyee = () => {
    setActiveLoader({firstLoader: true});
    const apiParams = {
      url: url(),
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        console.log('--res--', res);
        setActiveLoader({firstLoader: false});
        if (res.result.length) {
          setEmployeeDetails(res.result);
          setFillterByDetails(res.result);
          getAllDepartment();
        } else {
          setNoDataModal(true);
          setEmployeeDetails(res.result);
        }
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error.status === 400) {
          Helper.showToastMessage('Failed.');
        }
        if (error === undefined) {
          setActiveLoader({firstLoader: false});
          Helper.showToastMessage('Something went wrong.');
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({firstLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const fillterData = value => {
    if (fillterByDetails && fillterByDetails.length) {
      if (value) {
        setActiveLoader({fifthLoader: true});
        const apiParams = {
          url: `${apiEndPoints.employee_filter}${value}`,
          requestMethod: 'get',
          hideResponseMsg: true,
          response: res => {
            console.log('--res--', res);
            setEmployeeDetails(res.result);
            setActiveLoader({fifthLoader: false});
          },
          errorFunction: error => {
            console.log('--erorr--', error);
            if (error === undefined) {
              setActiveLoader({fifthLoader: false});
            } else {
              setActiveLoader({fifthLoader: false});
            }
          },
          endFunction: () => {
            console.log('End Function called.');
            setActiveLoader({fifthLoader: false});
          },
        };
        Api.callApi(apiParams);
      } else {
        setEmployeeDetails(fillterByDetails);
      }
    }
  };

  const renderItem = useCallback(({item, index}) => {
    const statusImage = () => {
      if (item.approvalState === 'PENDING') {
        return FilePaths.pending;
      }
      if (item.approvalState === 'APPROVED') {
        return FilePaths.verified;
      }
      if (item.approvalState === 'REJECTED') {
        return FilePaths.rejected;
      }
    };

    const statusText = () => {
      if (item.approvalState === 'PENDING') {
        return 'Pend...';
      }
      if (item.approvalState === 'APPROVED') {
        return 'Veri...';
      }
      if (item.approvalState === 'REJECTED') {
        return 'Reje...';
      }
    };

    const statusTextcolor = () => {
      if (item.approvalState === 'PENDING') {
        return CssVariables.yellow;
      }
      if (item.approvalState === 'APPROVED') {
        return CssVariables.green;
      }
      if (item.approvalState === 'REJECTED') {
        return CssVariables.red;
      }
    };
    return (
      <Pressable
        style={styles.items_box}
        onPress={() => viewDetails(item.mobileNumber, item.profileUpdate)}>
        <Text style={[styles.header_txt, {backgroundColor: statusTextcolor()}]}>
          {item.approvalState}
        </Text>
        <View style={styles.content_con}>
          <View style={styles.content_left}>
            <View style={styles.image}>
              <Text style={styles.name_frst_inx}>{item.fullName[0]}</Text>
            </View>
          </View>
          <View style={styles.content_right}>
            <Text style={styles.content_right_header_txt}>{item.fullName}</Text>
            <Text style={styles.content_right_txt}>{item.employeeId}</Text>
            <Text style={styles.content_right_txt}>{item.department}</Text>
            <Text style={styles.content_right_txt}>{item.jobRole}</Text>
          </View>
        </View>
        {/* <View style={styles.botttom_con}>
          <TouchableOpacity
            activeOpacity={item.isActive === true && 1}
            style={[
              styles.button_con_btn,
              {
                backgroundColor:
                  item.isActive === true
                    ? CssVariables.green
                    : CssVariables.light_gray,
              },
            ]}
            onPress={
              item.isActive === false
                ? () => activateEmployee(item._id)
                : () => {}
            }>
            <Text
              style={[
                styles.button_con_btn_txt,
                {
                  color:
                    item.isActive === true
                      ? CssVariables.white
                      : CssVariables.gray,
                },
              ]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={item.isActive === false && 1}
            style={[
              styles.button_con_btn,
              {
                backgroundColor:
                  item.isActive === false
                    ? CssVariables.red_meduim
                    : CssVariables.light_gray,
              },
            ]}
            onPress={
              item.isActive === true
                ? () => deactivateEmployee(item._id)
                : () => {}
            }>
            <Text style={styles.button_con_btn_txt}>De active</Text>
          </TouchableOpacity>
        </View> */}
      </Pressable>
    );
  }, []);

  const viewDetails = (number, profileUpdate) => {
    if (profileUpdate === true) {
      getSpecificEmployee(number);
      setModalVisible(true);
      return;
    }
    if (profileUpdate !== true)
      return Helper.showToastMessage('Profile not updated.');
  };
  const getSpecificEmployee = id => {
    setActiveLoader({secondLoader: true});
    const apiParams = {
      url: `${apiEndPoints.get_specific_employee_details}/${id}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        console.log('--Specificeresjjjjjjj--', res);
        setActiveLoader({secondLoader: false});
        if (res.result.length) {
          setSpecificDetails(res.result);
          getProfileImage(res.result[0].profileImage);
          // setModalVisible(true);
        } else {
          setSpecificDetails(res.result);
          // setNoDataModal(true);
        }
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error.status === 400) {
          Helper.showToastMessage('Failed.');
        }
        if (error === undefined) {
          setActiveLoader({secondLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({secondLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({secondLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const getProfileImage = fileName => {
    console.log('--file----', fileName);
    console.log('--fileName--', fileName);
    const apiParams = {
      url: `${apiEndPoints.upload_dp}=read&fileName=${fileName}`,
      requestMethod: 'get',
      response: res => {
        console.log('--res--', res);
        setImageUri(res.result.url);
      },
      errorFunction: error => {
        console.log('--error--', error);
      },
      endFunction: () => {
        console.log('End Function Called');
      },
    };
    Api.callApi(apiParams);
  };

  const statusImage = () => {
    if (
      specificDetails &&
      specificDetails.length &&
      specificDetails[0].approvalState === 'PENDING'
    ) {
      return FilePaths.pending;
    }
    if (
      specificDetails &&
      specificDetails.length &&
      specificDetails[0].approvalState === 'APPROVED'
    ) {
      return FilePaths.verified;
    }
    if (
      specificDetails &&
      specificDetails.length &&
      specificDetails[0].approvalState === 'REJECTED'
    ) {
      return FilePaths.rejected;
    }
  };

  const statusText = () => {
    if (
      specificDetails &&
      specificDetails.length &&
      specificDetails[0].approvalState === 'PENDING'
    ) {
      return 'Pending';
    }
    if (
      specificDetails &&
      specificDetails.length &&
      specificDetails[0].approvalState === 'APPROVED'
    ) {
      return 'Verified';
    }
    if (
      specificDetails &&
      specificDetails.length &&
      specificDetails[0].approvalState === 'REJECTED'
    ) {
      return 'Rejected';
    }
  };

  const statusTextcolor = () => {
    if (
      specificDetails &&
      specificDetails.length &&
      specificDetails[0].approvalState === 'PENDING'
    ) {
      return CssVariables.yellow;
    }
    if (
      specificDetails &&
      specificDetails.length &&
      specificDetails[0].approvalState === 'APPROVED'
    ) {
      return CssVariables.green;
    }
    if (
      specificDetails &&
      specificDetails.length &&
      specificDetails[0].approvalState === 'REJECTED'
    ) {
      return CssVariables.red;
    }
  };

  const deactivateEmployee = id => {
    Alert.alert('Deactivate Employee', 'Are you sure want to deactivate?', [
      {
        text: 'yes',
        onPress: () => {
          onYes(id);
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };

  const reRenderStatus = () => {
    const apiParams = {
      url: `${apiEndPoints.get_specific_employee_details}/${specificDetails[0].mobileNumber}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setSpecificDetails(res.result);
      },
      errorFunction: error => {
        if (error === undefined) {
          Helper.showToastMessage('Something went wrong.');
        } else {
          Helper.showToastMessage('Something went wrong.');
        }
      },
      endFunction: () => {},
    };
    Api.callApi(apiParams);
  };

  const onYes = id => {
    setActiveLoader({thirdLoader: true});
    const apiParams = {
      url: `${apiEndPoints.deactivate_activate_employee}/${id}`,
      requestMethod: 'put',
      response: res => {
        console.log('--res--', res);
        setActiveLoader({thirdLoader: false});
        reRenderStatus();
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
      input: {
        status: false,
      },
    };
    Api.callApi(apiParams);
  };

  const activateEmployee = id => {
    Alert.alert('Activate Employee', 'Are you sure want to Activate?', [
      {
        text: 'yes',
        onPress: () => {
          setActiveLoader({thirdLoader: true});
          const apiParams = {
            url: `${apiEndPoints.deactivate_activate_employee}/${id}`,
            requestMethod: 'put',
            response: res => {
              // console.log('--res--', res);
              setActiveLoader({thirdLoader: false});
              reRenderStatus();
            },
            errorFunction: error => {
              // console.log('--error--', error);
              if (error === undefined) {
                setActiveLoader({thirdLoader: true});
                Helper.showToastMessage('Something went wrong.');
              } else {
                setActiveLoader({thirdLoader: true});
              }
            },
            endFunction: () => {
              // console.log('End Function Called');
              setActiveLoader({thirdLoader: false});
            },
            input: {
              status: true,
            },
          };
          Api.callApi(apiParams);
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };

  const rejectEmployee = () => {
    if (remark.current.textInput.length === 0) {
      remark.current.inputError();
    } else {
      setActiveLoader({fourthLoader: true});
      const apiParams = {
        url: `${apiEndPoints.reject_employee}/${specificDetails[0]._id}/${specificDetails[0].mobileNumber}`,
        requestMethod: 'put',
        hideResponseMsg: true,
        response: res => {
          setActiveLoader({fourthLoader: false});
          // console.log('--res--', res);
          if (res.status === 200) {
            reRenderStatus();
            setFailedModal(true);
            setSecModalVisible(false);
            setTimeout(() => {
              getAllEmplooyee();
            }, 3000);
          }
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
        input: {
          approvalState: 'REJECTED',
          remark: remark.current.textInput,
        },
      };
      Api.callApi(apiParams);
    }
  };

  const verifyEmployee = () => {
    setActiveLoader({fourthLoader: true});
    const apiParams = {
      url: `${apiEndPoints.reject_employee}/${specificDetails[0]._id}/${specificDetails[0].mobileNumber}`,
      requestMethod: 'put',
      hideResponseMsg: true,
      response: res => {
        // console.log('--res--', res);
        setActiveLoader({fourthLoader: false});
        if (res.status === 200) {
          reRenderStatus();
          setSuccessModal(true);
          setSecModalVisible(false);
          setVerifyMsg(res.message);
          setTimeout(() => {
            getAllEmplooyee();
          }, 3000);
        }
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
      input: {
        approvalState: 'APPROVED',
      },
    };
    Api.callApi(apiParams);
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      // console.log('--py--', _fx, _fy, _w, h, _px, py);
      setDropdownTop(py + h);
    });
    setPageVisible(true);
  };

  const getAllDepartment = () => {
    setActiveLoader({thirdLoader: true});
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
    setActiveLoader({fourthLoader: true});
    const apiParams = {
      url: `${apiEndPoints.get_all_job_role}/${_id}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        // console.log('--res--', res);
        setFetchJobeRole(res.result);
        setActiveLoader({fourthLoader: false});
      },
      errorFunction: error => {
        // console.log('--error Job--', error);
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

  console.log('--imageuri---', imageUri);

  return (
    <View style={{flex: 1}}>
      <View style={styles.drop_down_main_con}>
        <View style={styles.drop_down_con}>
          <CustomDropDown
            label={'Department'}
            onSelect={setDepartment}
            data={allDepartment}
            noData={noDepa}
            getJobRole={getAllJobeRole}
          />
        </View>
        <View style={styles.drop_down_con}>
          <CustomDropDown
            label={'Job role'}
            onSelect={setJobRole}
            data={fetchJobRole}
            noData={noJobRole}
          />
        </View>
      </View>
      {activeLoader.firstLoader ? (
        <ActivityIndicator size={'large'} color={CssVariables.sky_blue} />
      ) : (
        <FlatList
          data={employeeDetails}
          renderItem={renderItem}
          keyExtractor={(item, key) => key.toString()}
        />
      )}
      {activeLoader.secondLoader ? (
        <ActivityIndicator
          size={'large'}
          color={CssVariables.sky_blue}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            position: 'absolute',
          }}
        />
      ) : (
        <Modal
          visible={modalVisible}
          animationType={'fade'}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modal_body}>
            <View style={styles.modal_upper_con}>
              <Text
                style={{
                  fontSize: 24,
                  color: CssVariables.white,
                  fontFamily: CssVariables.mulishmedium,
                }}>
                {specificDetails &&
                  specificDetails.length &&
                  specificDetails[0].fullName}
              </Text>
              <Pressable
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 60 / 3,
                  backgroundColor: CssVariables.pink,
                  zIndex: 1,
                  overflow: 'hidden',
                  padding: 8,
                }}>
                <Image
                  source={imageUri ? {uri: imageUri} : FilePaths.profilephto}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </Pressable>
              {specificDetails.map((item, key) => {
                return (
                  <Text
                    style={[
                      styles.active_status_text,
                      {
                        color:
                          item.isActive === true
                            ? CssVariables.green
                            : CssVariables.red,
                      },
                    ]}
                    key={key}>
                    {item.isActive === true ? 'Active' : 'De-active'}
                  </Text>
                );
              })}

              {specificDetails.map((item, key) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.deactive_button,
                      {
                        backgroundColor:
                          item.isActive === true
                            ? CssVariables.red
                            : CssVariables.green,
                      },
                    ]}
                    onPress={
                      item.isActive === true
                        ? () => deactivateEmployee(item._id)
                        : () => activateEmployee(item._id)
                    }
                    key={key}>
                    {activeLoader.thirdLoader ? (
                      <ActivityIndicator
                        size={'small'}
                        color={CssVariables.white}
                      />
                    ) : (
                      <Text style={styles.deactive_text}>
                        {item.isActive === true ? 'Deactivate' : 'Activate'}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}

              <View style={styles.status_image_con}>
                <Image source={statusImage()} style={styles.status_image} />
                <Text style={[styles.status_text, {color: statusTextcolor()}]}>
                  {statusText()}
                </Text>
              </View>
            </View>
            <ScrollView style={styles.modal_lower_con}>
              <View style={styles.contact_card}>
                {specificDetails.map((item, key) => {
                  return (
                    <View key={key}>
                      <View style={styles.card_header_con}>
                        <Image
                          source={FilePaths.contact}
                          style={{width: 20, height: 22}}
                        />
                        <Text style={styles.card_header_txt}>
                          Cotact Information
                        </Text>
                      </View>
                      <Text style={styles.main_txt}>Mobile number</Text>
                      <Text style={styles.data_txt}>{item.mobileNumber}</Text>
                      <Text style={styles.main_txt}>Email address</Text>
                      <Text style={styles.data_txt}>{item.emailId}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.contact_card}>
                {specificDetails.map((item, key) => {
                  return (
                    <View key={key}>
                      <View style={styles.card_header_con}>
                        <Image
                          source={FilePaths.person}
                          style={{width: 20, height: 22}}
                        />
                        <Text style={styles.card_header_txt}>
                          Personal Information
                        </Text>
                      </View>
                      <Text style={styles.main_txt}>Gender</Text>
                      <Text style={styles.data_txt}>{item.gender}</Text>
                      <Text style={styles.main_txt}>Marital status</Text>
                      <Text style={styles.data_txt}>{item.maritalStatus}</Text>
                      <Text style={styles.main_txt}>Date of birth</Text>
                      <Text style={styles.data_txt}>{item.DOB}</Text>
                      <Text style={styles.main_txt}>Blood group</Text>
                      <Text style={styles.data_txt}>{item.bloodGroup}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.contact_card}>
                {specificDetails.map((item, key) => {
                  return (
                    <View key={key}>
                      <View style={styles.card_header_con}>
                        <Image
                          source={FilePaths.organization}
                          style={{width: 20, height: 22}}
                        />
                        <Text style={styles.card_header_txt}>
                          Organization information
                        </Text>
                      </View>
                      <Text style={styles.main_txt}>Organization name</Text>
                      <Text style={styles.data_txt}>
                        {item.organizationName}
                      </Text>
                      <Text style={styles.main_txt}>Department</Text>
                      <Text style={styles.data_txt}>{item.department}</Text>
                      <Text style={styles.main_txt}>Job Role</Text>
                      <Text style={styles.data_txt}>{item.jobRole}</Text>
                      <Text style={styles.main_txt}>Employee ID</Text>
                      <Text style={styles.data_txt}>{item.employeeId}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.contact_card}>
                {specificDetails.map((item, key) => {
                  return (
                    <View key={key}>
                      <View style={styles.card_header_con}>
                        <Image
                          source={FilePaths.account}
                          style={{width: 23, height: 22}}
                        />
                        <Text style={styles.card_header_txt}>
                          Bank Information
                        </Text>
                      </View>
                      <Text style={styles.main_txt}>Holder name</Text>
                      <Text style={styles.data_txt}>
                        {item.accountHolderName}
                      </Text>
                      <Text style={styles.main_txt}>Bank name</Text>
                      <Text style={styles.data_txt}>{item.bankName}</Text>
                      <Text style={styles.main_txt}>Ifcs code</Text>
                      <Text style={styles.data_txt}>{item.ifscCode}</Text>
                      <Text style={styles.main_txt}>Account number</Text>
                      <Text style={styles.data_txt}>{item.accountNumber}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.contact_card}>
                {specificDetails &&
                specificDetails.length &&
                specificDetails[0].educationDetails &&
                specificDetails[0].educationDetails.length
                  ? specificDetails[0].educationDetails.map((item, key) => {
                      console.log('---item---', item);
                      return (
                        <View key={key}>
                          <View style={styles.card_header_con}>
                            <Image
                              source={FilePaths.education}
                              style={{width: 20, height: 22}}
                            />
                            <Text style={styles.card_header_txt}>
                              Educational Information
                            </Text>
                          </View>
                          <Text style={styles.main_txt}>Degree name</Text>
                          <Text style={styles.data_txt}>{item.degreeName}</Text>
                          <Text style={styles.main_txt}>Board</Text>
                          <Text style={styles.data_txt}>{item.board}</Text>
                          <Text style={styles.main_txt}>
                            Qualification type
                          </Text>
                          <Text style={styles.data_txt}>
                            {item.qualificationType}
                          </Text>
                          <Text style={styles.main_txt}>Document</Text>
                          <Text
                            style={[
                              styles.data_txt,
                              {
                                textDecorationLine: 'underline',
                                color: CssVariables.sky_blue,
                              },
                            ]}>
                            {item.fileName}
                          </Text>
                        </View>
                      );
                    })
                  : null}
              </View>
              <View style={styles.contact_card}>
                {specificDetails &&
                specificDetails.length &&
                specificDetails[0].currentAddress &&
                specificDetails[0].currentAddress.length
                  ? specificDetails[0].currentAddress.map((item, key) => {
                      return (
                        <View key={key}>
                          <View style={styles.card_header_con}>
                            <Image
                              source={FilePaths.address}
                              style={{width: 22, height: 22}}
                            />
                            <Text style={styles.card_header_txt}>
                              Address Information
                            </Text>
                          </View>
                          <Text style={styles.main_txt}>Address type</Text>
                          <Text style={styles.data_txt}>
                            {item.addressType}
                          </Text>
                          <Text style={styles.main_txt}>Address 1</Text>
                          <Text style={styles.data_txt}>{item.address1}</Text>
                          <Text style={styles.main_txt}>Address 2</Text>
                          <Text style={styles.data_txt}>{item.address2}</Text>
                          <Text style={styles.main_txt}>Address 3</Text>
                          <Text style={styles.data_txt}>{item.address3}</Text>
                          <Text style={styles.main_txt}>Pin code</Text>
                          <Text style={styles.data_txt}>{item.pincode}</Text>
                        </View>
                      );
                    })
                  : null}
              </View>
              <View style={styles.contact_card}>
                {specificDetails.map((item, key) => {
                  return (
                    <View key={key}>
                      <View style={styles.card_header_con}>
                        <Image
                          source={FilePaths.emergancycontact}
                          style={{width: 22, height: 22}}
                        />
                        <Text style={styles.card_header_txt}>
                          Emergency contact Information
                        </Text>
                      </View>
                      <Text style={styles.main_txt}>Guardian name</Text>
                      <Text style={styles.data_txt}>{item.guardianName}</Text>
                      <Text style={styles.main_txt}>GuardianMobile number</Text>
                      <Text style={styles.data_txt}>
                        {item.guardianMobileNumber}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={[styles.contact_card, {marginBottom: 8}]}>
                {specificDetails.map((item, key) => {
                  return (
                    <View key={key}>
                      <View style={styles.card_header_con}>
                        <Image
                          source={FilePaths.identity}
                          style={{width: 24, height: 16}}
                        />
                        <Text style={styles.card_header_txt}>
                          identity Information
                        </Text>
                      </View>
                      <Text style={styles.main_txt}>Document type</Text>
                      <Text style={styles.data_txt}>
                        {item.selectDocumentType}
                      </Text>
                      <Text style={styles.main_txt}>Document number</Text>
                      <Text style={styles.data_txt}>
                        {item.documentsNumber}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={{width: '97%', alignSelf: 'center'}}>
                <CustomButton
                  text={'Verify'}
                  properties={{
                    fieldType: 'darkgreen',
                  }}
                  onPress={() => (setSecModalVisible(true), setReject(false))}
                />
              </View>
              <View
                style={{width: '97%', alignSelf: 'center', marginBottom: 5}}>
                <CustomButton
                  text={'Reject'}
                  properties={{
                    fieldType: 'white',
                  }}
                  onPress={() => (setReject(true), setSecModalVisible(true))}
                />
              </View>
            </ScrollView>
          </View>
          <Modal
            animationType="fade"
            visible={secModalVisible}
            transparent
            onRequestClose={() => setSecModalVisible(false)}>
            <View style={styles.create_depa_body}>
              <ScrollView
                contentContainerStyle={styles.scroll_view_style}
                disableScrollViewPanResponder={true}>
                <View
                  style={
                    orientation === 'PORTRAIT'
                      ? styles.create_depa_input
                      : styles.po_create_depa_input
                  }>
                  {reject ? (
                    <Image
                      source={FilePaths.alert}
                      style={{width: 25, height: 25}}
                    />
                  ) : null}
                  <Text style={styles.select_depart_text}>
                    {reject
                      ? `Are you want to reject the
      employee profile ?`
                      : `Are you want to verify the 
      employee profile?`}
                  </Text>
                  {reject ? (
                    <View
                      style={
                        orientation === 'PORTRAIT'
                          ? styles.create_depa_input_con
                          : styles.po_create_depa_input_con
                      }>
                      <CoustomTextInput
                        ref={remark}
                        properties={{
                          fieldType: 'rejectdes',
                        }}
                      />
                    </View>
                  ) : null}
                  <View style={styles.button_con}>
                    <CustomButton
                      onPress={reject ? rejectEmployee : verifyEmployee}
                      text={
                        activeLoader.fourthLoader ? (
                          <ActivityIndicator
                            size={'small'}
                            color={CssVariables.white}
                          />
                        ) : (
                          <>{reject ? 'Reject' : 'Verify'}</>
                        )
                      }
                      properties={{
                        fieldType: 'widthlongdarkgreen',
                      }}
                    />
                    <CustomButton
                      onPress={() => setSecModalVisible(false)}
                      text="Cancel"
                      properties={{
                        fieldType: 'white',
                      }}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </Modal>
      )}
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
  drop_down_main_con: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingHorizontal: 5,
  },

  drop_down_con: {
    width: '45%',
    borderRadius: 50,
    overflow: 'hidden',
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: CssVariables.drop_down_bg,
  },

  items_box: {
    width: '97%',
    alignSelf: 'center',
    marginBottom: 5,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 2,
  },
  header_txt: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 14,
    color: CssVariables.white,
    width: 80,
    height: 25,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderBottomRightRadius: 10,
  },
  content_con: {
    flexDirection: 'row',
    width: '100%',
  },
  content_left: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    marginVertical: 2,
    backgroundColor: CssVariables.light_blue_white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name_frst_inx: {
    color: CssVariables.sky_blue,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 15,
  },
  content_right: {
    flex: 2,
    justifyContent: 'center',
  },
  content_right_header_txt: {
    color: CssVariables.dark_blue,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 14,
    marginVertical: 1,
  },
  content_right_txt: {
    fontSize: 12,
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.gray,
    marginVertical: 1,
  },
  botttom_con: {
    width: 150,
    height: 35,
    borderRadius: 5,
    backgroundColor: CssVariables.light_gray,
    paddingVertical: 4,
    paddingHorizontal: 4,
    flexDirection: 'row',
    marginVertical: 3,
    marginHorizontal: 2,
    alignSelf: 'flex-end',
  },
  button_con_btn: {
    width: '50%',
    borderRadius: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_con_btn_txt: {
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
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
  filter_icon: {
    position: 'absolute',
    alignSelf: 'center',
    right: 10,
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
  details_header_text: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: CssVariables.pencile,
    paddingHorizontal: 5,
  },
  details_header_texts: {
    color: CssVariables.gray,
  },
  loader_style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details_cont_text: {
    flexDirection: 'row',
    backgroundColor: CssVariables.white,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  details_name_texts: {
    color: CssVariables.darkgray,
    fontSize: 16,
    fontFamily: CssVariables.mulishmedium,
    marginVertical: '10%',
  },
  details_depart_texts: {
    fontSize: 13,
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.gray,
    marginVertical: '17%',
  },
  details_view_texts: {
    fontSize: 13,
    fontFamily: CssVariables.mulishmedium,
    marginVertical: '17%',
  },
  modal_body: {
    flex: 1,
    backgroundColor: CssVariables.sky_blue,
  },
  modal_upper_con: {
    width: '100%',
    height: '25%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modal_lower_con: {
    width: '100%',
    backgroundColor: CssVariables.white,
  },
  modal_cont: {
    height: '100%',
    backgroundColor: CssVariables.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'relative',
  },

  contact_card: {
    width: '97%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    elevation: 2,
  },
  card_header_con: {
    flexDirection: 'row',
    marginVertical: 1,
    alignItems: 'center',
  },
  card_header_txt: {
    color: CssVariables.dark_blue,
    fontFamily: CssVariables.mulishregular,
    fontSize: 17,
    marginLeft: 8,
  },

  main_txt: {
    color: CssVariables.dark_blue,
    fontSize: 15,
    fontFamily: CssVariables.mulishregular,
    marginLeft: 25,
    marginVertical: 1,
  },
  data_txt: {
    fontFamily: CssVariables.mulishregular,
    fontSize: 13,
    color: CssVariables.gray,
    marginLeft: 25,
    marginVertical: 1,
  },

  status_image_con: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  status_image: {
    width: 35,
    height: 35,
  },
  status_text: {
    fontWeight: 'bold',
  },
  employee_status_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
  },
  deactive_button: {
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 4,
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  deactive_text: {
    color: CssVariables.white,
    fontSize: 15,
    fontFamily: CssVariables.mulishmedium,
    padding: 5,
  },
  active_button: {
    backgroundColor: CssVariables.green,
    borderWidth: 1,
    borderColor: CssVariables.blue,
    borderRadius: 4,
    marginHorizontal: '8%',
  },
  active_text: {
    fontSize: 20,
    color: CssVariables.white,
    fontFamily: CssVariables.mulishmedium,
    padding: 5,
  },
  detail_box: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  company_logo: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderRadius: 4,
  },
  active_status_text: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 20,
    position: 'absolute',
    right: 10,
  },
  employee_id_text_sec: {
    color: CssVariables.red,
    fontSize: 20,
    fontFamily: CssVariables.mulishmedium,
    marginTop: 5,
  },
  employee_name: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 20,
    color: CssVariables.black,
    marginTop: 5,
  },
  mobile_email_text: {
    fontSize: 16,
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.skyblack,
    marginTop: 5,
  },
  view_doc_text: {
    color: CssVariables.blue,
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: CssVariables.blue,
    marginTop: 5,
    marginBottom: 10,
  },
  details_input_con: {
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    borderRadius: 4,
    marginBottom: 10,
    borderColor: CssVariables.light_gray,
    backgroundColor: CssVariables.light_white,
  },
  detail_text: {
    color: CssVariables.gray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 16,
  },
  create_depa_body: {
    flex: 1,
    backgroundColor: CssVariables.lightblack,
  },
  scroll_view_style: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  create_depa_input: {
    width: '90%',
    height: 370,
    backgroundColor: CssVariables.white,
    borderRadius: 15,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
  },
  po_create_depa_input: {
    width: '50%',
    height: '95%',
    backgroundColor: CssVariables.white,
    borderRadius: 15,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
  },
  select_depart_text: {
    fontFamily: CssVariables.mulishregular,
    fontSize: 18,
    color: CssVariables.black,
    marginVertical: 10,
  },
  create_depa_input_con: {
    width: '95%',
    paddingBottom: '10%',
  },
  po_create_depa_input_con: {
    width: '95%',
    paddingBottom: '10%',
    height: '30%',
  },
  button_con: {
    width: '80%',
    alignItems: 'center',
  },
});
