import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import CoustomTextInput from '../components/CoustomTextInput';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import CustomButton from './CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import moment from 'moment';
import SuccessModal from './SuccessModal';
import FailedModal from './FailedModal';
import {useOrientation} from './useOrientation';
import {Helper} from '../classes/Helper';

export default function SelectDepartCard({
  setSelectDepart,
  setCreateJobRole,
  setViewAllEmployee,
  setShowCreateEmployee,
  setChange,
  change,
  selectDepart,
}) {
  let colors = ['#2DB6F5', '#FF924C', '#FF8975'];
  const orientation = useOrientation();
  const backFunction = () => {
    setChange(!change);
    setSelectDepart(false);
    setCreateJobRole(false);
    setViewAllEmployee(false);
    setShowCreateEmployee(false);
  };
  useEffect(() => {
    if (selectDepart) {
      getAllDepartment();
    }
  }, [selectDepart]);
  const department = useRef('');
  const [modalVisible, setModalVisible] = useState(false);
  const [allDepartment, setAllDepartment] = useState('');
  const [secModalVisible, setSecModlaVisible] = useState(false);
  const [wrongModal, setWrongModal] = useState(false);
  const [noDataModal, setNoDataModal] = useState(false);
  const [fillterByDetails, setFillterByDetails] = useState('');
  const [depaData, setDepaData] = useState('');
  const [message, setMessage] = useState('');
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
  });

  // console.log('--all----', depaData);

  const getAllDepartment = () => {
    setActiveLoader({firstLoader: true});
    const apiParams = {
      url: apiEndPoints.get_all_department,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setActiveLoader({firstLoader: false});
        if (res.result.length) {
          setAllDepartment(res.result);
          setDepaData(res.result);
          setFillterByDetails(res.result);
        } else {
          setNoDataModal(true);
        }
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error.status === 400) {
          Helper.showToastMessage('Failed.');
        }
        if (error === undefined) {
          setWrongModal(true);
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

  const addDepartment = () => {
    if (department.current.textInput.length === 0) {
      department.current.inputError();
    } else {
      setActiveLoader({secondLoader: true});
      const apiParams = {
        url: apiEndPoints.add_department,
        requestMethod: 'post',
        hideResponseMsg: true,
        response: res => {
          console.log('--res--', res);
          setActiveLoader({secondLoader: false});
          if (res.status === 200) {
            setModalVisible(false);
            getAllDepartment();
            setSecModlaVisible(true);
            setMessage(res.message);
          }
        },
        errorFunction: error => {
          console.log('--error--', error);
          if (error.status === 400) {
            setActiveLoader({secondLoader: false});
            department.current.inputError(error.message);
          }
          if (error === undefined) {
            setActiveLoader({secondLoader: false});
            setWrongModal(true);
            Helper.showToastMessage('Something went wrong.');
          }
        },
        endFunction: () => {
          console.log('End Function Called');
          setActiveLoader({secondLoader: false});
        },
        input: {
          department: department.current.textInput,
        },
      };
      Api.callApi(apiParams);
    }
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity style={styles.job_role_con}>
      <View style={{marginLeft: 15}}>
        <Text style={styles.item_lable}>{item.department}</Text>
        <Text style={styles.item_value}>
          {moment(item.createdAt).format('D MMM Y | hh:mm')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const fillterData = text => {
    if (fillterByDetails && fillterByDetails.length) {
      if (text) {
        const fillterDetails = fillterByDetails.filter(item => {
          const fillterDepa = item.department;
          return fillterDepa.indexOf(text) > -1;
        });
        setDepaData(fillterDetails);
      } else {
        setDepaData(fillterByDetails);
      }
    }
  };
  return (
    <>
      <Modal
        visible={selectDepart}
        animationType="fade"
        onRequestClose={backFunction}>
        <View style={{flex: 1}}>
          <View style={styles.create_empl_con}>
            <Text style={styles.upper_text}>Create Department</Text>
            <Image
              source={FilePaths.selectdepartment}
              style={styles.create_empl_img}
            />
          </View>
          {orientation === 'PORTRAIT' && (
            <View style={styles.input_con}>
              <TextInput
                placeholder="Search"
                placeholderTextColor={CssVariables.gray}
                onChangeText={value => fillterData(value)}
                style={styles.input}
              />
              <Image source={FilePaths.search} style={styles.search_icon} />
              <Image source={FilePaths.fillter} style={styles.filter_icon} />
            </View>
          )}
          <View
            style={orientation === 'PORTRAIT' ? styles.body : styles.po_body}>
            <View
              style={
                orientation === 'PORTRAIT'
                  ? styles.depa_con
                  : styles.po_depa_con
              }>
              <View style={styles.select_depart_con}>
                <Text style={styles.select_depart_text}>
                  {allDepartment && allDepartment.length
                    ? 'Created Department'
                    : 'Create New Department'}
                </Text>
                <Text style={styles.paragraph_text}>
                  {allDepartment && allDepartment.length
                    ? `Select multiple departments  you wish to
            have for your organization.`
                    : `Create multiple departments you wish to 
            have for your organization.`}
                </Text>
              </View>
              <View
                style={[
                  styles.middle_con,
                  {
                    justifyContent:
                      allDepartment && allDepartment.length ? null : 'center',
                  },
                  {
                    alignItems:
                      allDepartment && allDepartment.length ? null : 'center',
                  },
                ]}>
                {activeLoader.firstLoader ? (
                  <ActivityIndicator
                    size={'large'}
                    color={CssVariables.darkgreen}
                  />
                ) : (
                  <View style={{height: '100%'}}>
                    <FlatList
                      data={depaData}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                )}
              </View>
              {orientation === 'PORTRAIT' && (
                <View style={styles.last_container}>
                  {allDepartment && allDepartment.length && (
                    <Text style={styles.or_text}>Or</Text>
                  )}
                  <CustomButton
                    onPress={() => setModalVisible(true)}
                    text="+ Add New Department"
                    properties={{
                      fieldType: 'dotted',
                    }}
                  />
                </View>
              )}
            </View>
            {orientation === 'LANDSCAPE' && (
              <View style={styles.po_input_button_con}>
                <View style={styles.input_con}>
                  <TextInput
                    placeholder="Search"
                    placeholderTextColor={CssVariables.gray}
                    onChangeText={value => fillterData(value)}
                    style={styles.input}
                  />
                  <Image source={FilePaths.search} style={styles.search_icon} />
                  <Image
                    source={FilePaths.fillter}
                    style={styles.filter_icon}
                  />
                </View>

                <View style={styles.last_container}>
                  {allDepartment && allDepartment.length && (
                    <Text style={styles.or_text}>Or</Text>
                  )}
                  <CustomButton
                    onPress={() => setModalVisible(true)}
                    text="+ Add New Department"
                    properties={{
                      fieldType: 'dotted',
                    }}
                  />
                </View>
              </View>
            )}
          </View>
          <Modal
            animationType="slide"
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
                    Create a New Department
                  </Text>
                  <View style={styles.create_depa_input_con}>
                    <CoustomTextInput
                      ref={department}
                      properties={{
                        fieldType: 'createdepart',
                      }}
                    />
                  </View>
                  <View style={styles.button_con}>
                    <CustomButton
                      onPress={addDepartment}
                      text={
                        activeLoader.secondLoader ? (
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
              success: 'createdepa',
              modalFalse: setSecModlaVisible,
              message: message,
            }}
          />
          <FailedModal
            visible={wrongModal}
            onRequestClose={() => setWrongModal(false)}
            properties={{
              failed: 'wrong',
              modalFalse: setWrongModal,
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
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    height: '75%',
  },
  po_body: {
    height: '78%',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  depa_con: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
  po_depa_con: {
    height: '100%',
    justifyContent: 'space-evenly',
    width: '50%',
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
  po_input_button_con: {
    overflow: 'hidden',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'space-between',
    height: '90%',
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
    width: 22,
    height: 13,
    alignSelf: 'center',
    right: 10,
  },
  select_depart_con: {
    alignItems: 'center',
  },
  select_depart_text: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 20,
    color: CssVariables.black,
    marginVertical: 10,
  },
  paragraph_text: {
    fontFamily: CssVariables.mulishregular,
    fontSize: 16,
    color: CssVariables.black,
  },
  middle_con: {
    width: '100%',
    height: '50%',
    paddingHorizontal: 20,
  },
  last_container: {
    width: '100%',
    paddingHorizontal: '12%',
    marginTop: '2%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  or_text: {
    color: CssVariables.black,
    fontSize: 15,
    fontFamily: CssVariables.mulishmedium,
  },
  job_role_con: {
    paddingHorizontal: '8%',
    paddingVertical: 7,
    marginVertical: 7,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CssVariables.assign_shift_color,
  },
  item_lable: {
    color: CssVariables.white,
    fontSize: 18,
    fontFamily: CssVariables.mulishmedium,
  },
  item_value: {
    color: CssVariables.white,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
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
    paddingBottom: 28,
  },
  button_con: {
    width: '80%',
    alignItems: 'center',
  },
});
