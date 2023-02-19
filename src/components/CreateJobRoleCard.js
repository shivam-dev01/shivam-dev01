import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import CustomButton from '../components/CustomButton';
import CoustomTextInput from '../components/CoustomTextInput';
import {CssVariables} from '../constants/CssVariables';
import CustomDropDown from './CustomDropDown';
import {FilePaths} from '../constants/filepath';
import {Api} from '../classes/Api';
import {apiEndPoints} from '../constants/apiEndPoints';
import SuccessModal from './SuccessModal';
import {Helper} from '../classes/Helper';
import {useOrientation} from './useOrientation';

export default function CreateJobRole({
  setSelectDepart,
  setShowCreateJobRole,
  setViewAllEmployee,
  setShowCreateEmployee,
  setChange,
  change,
  showcreateJobRole,
}) {
  let colors = ['#FF8975', '#FF924C', '#2DB6F5'];
  const orientation = useOrientation();
  const backFunction = () => {
    setChange(!change);
    setSelectDepart(false);
    setShowCreateJobRole(false);
    setViewAllEmployee(false);
    setShowCreateEmployee(false);
  };
  const inputjobRole = useRef('');
  const [selected, setSelected] = useState('');
  const [allDepartment, setAllDepartment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [secModalVisible, setSecModlaVisible] = useState(false);
  const [fetchJobRole, setFetchJobeRole] = useState('');
  const [message, setMessage] = useState('');
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
    thirdLoader: false,
  });

  // console.log('--selected--', selected);

  useEffect(() => {
    if (showcreateJobRole) {
      getAllDepartment();
    }
  }, [showcreateJobRole]);
  const noDepa = [
    {
      error: activeLoader.secondLoader
        ? 'Loading...'
        : 'You have not created department.Please Create first.',
    },
  ];

  const getAllDepartment = () => {
    setActiveLoader({secondLoader: true});
    const apiParams = {
      url: apiEndPoints.get_all_department,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setAllDepartment(res.result);
        // console.log('--response--', res);
        setActiveLoader({secondLoader: false});
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error === undefined) {
          Helper.showToastMessage('Something went wrong.');
          setActiveLoader({secondLoader: false});
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

  const getAllJobeRole = _id => {
    setActiveLoader({thirdLoader: true});
    const apiParams = {
      url: `${apiEndPoints.get_all_job_role}/${_id}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        // console.log('--res--', res);
        setFetchJobeRole(res.result);
        setActiveLoader({thirdLoader: false});
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error.status === 400) {
          Helper.showToastMessage('Failed.');
        }
        if (error === undefined) {
          Helper.showToastMessage('Something went wrong.');
          setActiveLoader({thirdLoader: false});
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

  const createJobRoles = () => {
    if (inputjobRole.current.textInput.length === 0) {
      inputjobRole.current.inputError();
    } else {
      setActiveLoader({firstLoader: true});
      const apiParams = {
        url: apiEndPoints.add_job_role,
        requestMethod: 'post',
        hideResponseMsg: true,
        response: res => {
          console.log('--res--', res);
          setActiveLoader({firstLoader: false});
          if (res.status === 200) {
            setModalVisible(false);
            getAllJobeRole(selected._id);
            setSecModlaVisible(true);
            setMessage(res.message);
          }
        },
        errorFunction: error => {
          console.log('--error--', error);
          if (error === undefined) {
            setActiveLoader({firstLoader: false});
            Helper.showToastMessage('Something went wrong.');
          } else if (error.result === 'exist') {
            setActiveLoader({firstLoader: false});
            inputjobRole.current.inputError(error.message);
          }
        },
        endFunction: () => {
          // console.log('End Function Called');
          setActiveLoader({firstLoader: false});
        },
        input: {
          departmentId: selected._id,
          jobRole: inputjobRole.current.textInput,
        },
      };
      Api.callApi(apiParams);
    }
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity style={styles.job_role_con}>
      <Text style={styles.job_role_text}>{item.jobRole}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <Modal
        visible={showcreateJobRole}
        animationType="fade"
        onRequestClose={backFunction}>
        <View style={{flex: 1}}>
          <View style={styles.create_empl_con}>
            <Text style={styles.upper_text}>Create Job Role</Text>
            <Image
              source={FilePaths.createjobrole}
              style={styles.create_empl_img}
            />
          </View>
          <View
            style={
              orientation === 'PORTRAIT'
                ? styles.last_container
                : styles.po_last_container
            }>
            <View
              style={
                orientation === 'PORTRAIT'
                  ? styles.password_container
                  : styles.po_password_container
              }>
              <Text style={styles.details_texts}>Department</Text>
              <View style={styles.drop_down_con}>
                <CustomDropDown
                  label="Select..."
                  data={allDepartment}
                  onSelect={setSelected}
                  noData={noDepa}
                  getJobRole={getAllJobeRole}
                />
              </View>
            </View>
            {selected ? (
              <View
                style={
                  orientation === 'PORTRAIT'
                    ? styles.total_created_job_con
                    : styles.po_total_created_job_con
                }>
                <Text style={styles.top_text}>Total Created Job Roles.</Text>
                {activeLoader.thirdLoader ? (
                  <ActivityIndicator
                    size={'small'}
                    color={CssVariables.darkpink}
                  />
                ) : (
                  <Text style={styles.top_number}>
                    {fetchJobRole && fetchJobRole.length
                      ? fetchJobRole.length
                      : 0}
                  </Text>
                )}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.stroke_circle}></View>
                  <View style={styles.stroke_line}></View>
                  <View style={styles.stroke_circle}></View>
                </View>
                {fetchJobRole && fetchJobRole.length ? (
                  <FlatList
                    data={fetchJobRole}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : (
                  <View
                    style={
                      orientation === 'PORTRAIT' ? styles.no_job_role : null
                    }>
                    <Text
                      style={
                        styles.or_text
                      }>{`You have not created job role for this 
department, add a new one to 
continue.`}</Text>
                  </View>
                )}
                <View style={{width: '100%', alignItems: 'center'}}>
                  <CustomButton
                    onPress={() => setModalVisible(true)}
                    text="+ Add Custom role "
                    properties={{
                      fieldType: 'dotted',
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.select_continue_text}>
                <Text style={styles.or_text}>
                  Please Select a department to continue.
                </Text>
              </View>
            )}
          </View>
          <Modal
            animationType="fade"
            visible={modalVisible}
            transparent
            onRequestClose={() => setModalVisible(false)}>
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
                  <Text style={styles.select_depart_text}>
                    Create a New Job Role
                  </Text>
                  <View style={styles.create_depa_input_con}>
                    <CoustomTextInput
                      ref={inputjobRole}
                      properties={{
                        fieldType: 'createjobrole',
                      }}
                    />
                  </View>
                  <View style={styles.button_con}>
                    <CustomButton
                      onPress={createJobRoles}
                      text={
                        activeLoader.firstLoader ? (
                          <ActivityIndicator
                            size={'small'}
                            color={CssVariables.white}
                          />
                        ) : (
                          'Create'
                        )
                      }
                      properties={{
                        fieldType: 'widthlongdarkgreen',
                      }}
                    />
                    <CustomButton
                      onPress={() => setModalVisible(false)}
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
          <SuccessModal
            visible={secModalVisible}
            onRequestClose={() => setSecModlaVisible(false)}
            properties={{
              success: 'createjobrole',
              modalFalse: setSecModlaVisible,
              message: message,
            }}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
  upper_text: {
    fontSize: 16,
    color: CssVariables.white,
    padding: 6,
    fontFamily: CssVariables.mulishmedium,
  },
  input_con: {
    paddingHorizontal: '5%',
    marginVertical: '2%',
  },
  last_container: {
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: '2%',
    height: '90%',
    position: 'relative',
  },
  po_last_container: {
    width: '100%',
    height: '80%',
    position: 'relative',
    flexDirection: 'row',
  },
  password_container: {
    paddingBottom: '8%',
  },
  po_password_container: {
    paddingHorizontal: '2%',
    width: '40%',
  },
  details_texts: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
  },
  drop_down_con: {
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    borderRadius: 5,
    overflow: 'hidden',
  },
  or_text: {
    color: CssVariables.black,
    fontSize: 15,
    fontFamily: CssVariables.mulishmedium,
  },
  select_continue_text: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  total_created_job_con: {
    alignItems: 'center',
    borderRadius: 15,
    elevation: 15,
    backgroundColor: CssVariables.white,
    padding: 10,
    height: '65%',
  },
  po_total_created_job_con: {
    alignItems: 'center',
    borderRadius: 15,
    elevation: 15,
    backgroundColor: CssVariables.white,
    padding: 10,
    height: '98%',
    alignSelf: 'center',
    width: '58%',
  },
  top_text: {
    fontSize: 22,
    color: CssVariables.redprimary,
    fontFamily: CssVariables.mulishmedium,
    alignSelf: 'center',
  },
  top_number: {
    fontSize: 30,
    color: CssVariables.darkpink,
    fontFamily: CssVariables.mulishmedium,
  },
  stroke_circle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: CssVariables.strokeColor,
    opacity: 0.4,
  },
  stroke_line: {
    width: '90%',
    height: '10%',
    backgroundColor: CssVariables.strokeColor,
    opacity: 0.4,
  },
  job_role_con: {
    width: 246,
    paddingVertical: 10,
    marginVertical: 7,
    borderRadius: 5,
    paddingLeft: 15,
    backgroundColor: CssVariables.assign_shift_color,
  },
  job_role_text: {
    color: CssVariables.white,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 16,
  },
  no_job_role: {
    paddingHorizontal: 10,
    paddingVertical: '10%',
    marginVertical: 10,
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
  },
  po_create_depa_input: {
    width: '50%',
    height: '95%',
    backgroundColor: CssVariables.white,
    borderRadius: 15,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  create_depa_input_con: {
    width: '85%',
    paddingBottom: '10%',
  },
  button_con: {
    width: '80%',
    alignItems: 'center',
  },
  select_depart_text: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 20,
    color: CssVariables.black,
    marginVertical: 10,
  },
});
