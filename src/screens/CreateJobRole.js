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
import CustomDropDown from '../components/CustomDropDown';
import {FilePaths} from '../constants/filepath';
import {Api} from '../classes/Api';
import {apiEndPoints} from '../constants/apiEndPoints';
import SuccessModal from '../components/SuccessModal';
import {Helper} from '../classes/Helper';
import {useOrientation} from '../components/useOrientation';

export default function CreateJobRole({}) {
  let colors = ['#FF8975', '#FF924C', '#2DB6F5'];
  const orientation = useOrientation();

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

  useEffect(() => {
    getAllDepartment();
  }, []);
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
    <View style={styles.job_role_con}>
      <Image source={FilePaths.jobroles} style={{width: 25, height: 25}} />
      <Text style={styles.job_role_text}>{item.jobRole}</Text>
    </View>
  );

  console.log(';;;;;', fetchJobRole.length);
  return (
    <View style={{flex: 1, backgroundColor: CssVariables.light_white}}>
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
          <View style={{width: '100%', alignItems: 'center', marginBottom: 8}}>
            <CustomButton
              onPress={selected ? () => setModalVisible(true) : () => {}}
              text="+ Add job role "
              properties={{
                fieldType: 'darkgreen',
              }}
            />
          </View>
          <View style={styles.drop_down_con}>
            <CustomDropDown
              label="Select department"
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
            {activeLoader.thirdLoader ? (
              <ActivityIndicator size={'large'} color={CssVariables.sky_blue} />
            ) : (
              <>
                {fetchJobRole && fetchJobRole.length === 0 ? (
                  <Text
                    style={
                      styles.or_text
                    }>{`You have not created job role for this 
  department, add a new one to 
  continue.`}</Text>
                ) : (
                  <FlatList
                    data={fetchJobRole}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )}
              </>
            )}
          </View>
        ) : (
          <Text style={styles.or_text}>
            Please Select a department to continue.
          </Text>
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
    flex: 1,
    position: 'relative',
  },
  po_last_container: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
  },
  password_container: {
    justifyContent: 'space-evenly',
    flex: 1.2,
    paddingHorizontal: 20,
  },
  po_password_container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  details_texts: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
  },
  drop_down_con: {
    backgroundColor: CssVariables.drop_down_bg,
    borderRadius: 25,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  or_text: {
    color: CssVariables.black,
    fontSize: 15,
    fontFamily: CssVariables.mulishmedium,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: 15,
    flex: 4,
  },
  total_created_job_con: {
    width: '100%',
    backgroundColor: CssVariables.light_white,
    flex: 4,
  },
  po_total_created_job_con: {
    backgroundColor: CssVariables.light_white,
    alignSelf: 'center',
    flex: 1.5,
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
    width: '95%',
    backgroundColor: CssVariables.white,
    elevation: 2,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  job_role_text: {
    color: CssVariables.dark_blue,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 16,
    marginLeft: 15,
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
