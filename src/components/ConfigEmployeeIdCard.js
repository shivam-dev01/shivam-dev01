import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../components/CustomButton';
import {CssVariables} from '../constants/CssVariables';
import {Api} from '../classes/Api';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Helper} from '../classes/Helper';
import SuccessModal from './SuccessModal';
import {useOrientation} from './useOrientation';

export default function ConfigEmployeeIdCard({
  change,
  setChange,
  setConfigEmpId,
  setconfigChngPass,
  setConfigOffTime,
  showConfigureEmployeeId,
}) {
  const orientation = useOrientation();

  const backFunction = () => {
    setChange(!change);
    setConfigEmpId(false);
    setConfigOffTime(false);
    setconfigChngPass(false);
  };

  const [employeeId, setEmployeeId] = useState('');
  const [generatedId, setGeneratedId] = useState('');
  const [idCreatedModal, setIdCreatedModal] = useState(false);
  const [message, setMessage] = useState('');
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
  });

  // console.log('----', employeeId);
  useEffect(() => {
    if (showConfigureEmployeeId) {
      getEmplooyeId();
    }
  }, [showConfigureEmployeeId]);

  const getEmplooyeId = () => {
    setActiveLoader({firstLoader: true});
    const apiParams = {
      url: apiEndPoints.last_generated_employee_id,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setActiveLoader({firstLoader: false});
        console.log('--res--', res);
        setGeneratedId(res.result);
      },
      errorFunction: error => {
        console.log('--error--', error);
        if (error.result === 'config') {
          // setNoDataModalVisible(true);
          setActiveLoader({firstLoader: false});
        } else if (error === undefined) {
          setActiveLoader({firstLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else if (error.message === 'Failed') {
          setActiveLoader({firstLoader: false});
          Helper.showToastMessage('Failed.');
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

  const configureEmployeeId = () => {
    if (employeeId.length < 2) {
      Helper.showToastMessage('The id should be at least 2 characters long.');
    } else if (employeeId && employeeId.length === 2) {
      const isValid = isNaN(employeeId);
      if (isValid) {
        setActiveLoader({secondLoader: true});
        const apiParams = {
          url: apiEndPoints.configuration_employeeId,
          requestMethod: 'post',
          hideResponseMsg: true,
          response: res => {
            // console.log('--config employee id res--', res);
            setActiveLoader({secondLoader: false});
            if (res.status === 200) {
              setIdCreatedModal(true);
              setMessage(res.message);
              getEmplooyeId();
            }
          },
          errorFunction: error => {
            // console.log('--config employee id error--', error);
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
          input: {
            employeeId: employeeId,
          },
        };
        Api.callApi(apiParams);
      } else {
        Alert.alert(
          'Invalid value',
          'At least one letter should be an alphabet.',
        );
      }
    }
  };

  return (
    <Modal
      visible={showConfigureEmployeeId}
      animationType="fade"
      onRequestClose={backFunction}>
      <View style={{height: '100%'}}>
        <View
          style={[
            styles.last_container,
            {
              justifyContent: activeLoader.firstLoader ? 'center' : null,
            },
            {alignItems: activeLoader.firstLoader ? 'center' : null},
          ]}>
          {activeLoader.firstLoader ? (
            <ActivityIndicator size={'large'} color={CssVariables.darkgreen} />
          ) : (
            <>
              <View style={styles.upper_text_cont}>
                <Text style={styles.upper_text}>Configure Employee Id</Text>
              </View>
              <ScrollView
                contentContainerStyle={
                  orientation === 'PORTRAIT'
                    ? styles.scroll_view
                    : styles.po_scroll_view
                }
                disableScrollViewPanResponder={true}>
                <View style={styles.configure_employee_id_text_con}>
                  <Text style={styles.configure_employee_id_text}>
                    Configure Employee Id
                  </Text>
                </View>
                <View style={styles.employee_id_cont}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.generated_id_text}>
                      The prefix of Employee ID
                    </Text>
                    <TextInput
                      style={styles.prefix_id_text}
                      placeholder="Id"
                      placeholderTextColor={CssVariables.gray}
                      autoCapitalize="characters"
                      value={
                        generatedId && generatedId.length
                          ? generatedId
                          : employeeId
                      }
                      onChangeText={value => setEmployeeId(value.toUpperCase())}
                      maxLength={2}
                    />
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.generated_id_text}>
                      Last Generated Employee ID
                    </Text>
                    {/* <View> */}
                    <Text style={styles.employee_id_text}>
                      {generatedId && generatedId.length ? generatedId : 'Null'}
                    </Text>
                    {/* </View> */}
                  </View>
                </View>
                <View style={styles.save_cancle_button_con}>
                  {generatedId && generatedId.length ? (
                    <View
                      style={{
                        width: '84%',
                        height: 44,
                        backgroundColor: CssVariables.meduimgray,
                        borderWidth: 1,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: CssVariables.light_gray,
                      }}>
                      <Text
                        style={{
                          fontFamily: CssVariables.mulishmedium,
                          color: CssVariables.white,
                          fontSize: 16,
                        }}>
                        Save
                      </Text>
                    </View>
                  ) : (
                    <CustomButton
                      onPress={configureEmployeeId}
                      text={
                        activeLoader.secondLoader ? (
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
                  )}
                  <CustomButton
                    onPress={backFunction}
                    text="Cancel"
                    properties={{
                      fieldType: 'white',
                    }}
                  />
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </View>
      <SuccessModal
        visible={idCreatedModal}
        onRequestClose={() => setIdCreatedModal(false)}
        properties={{
          success: 'createid',
          modalFalse: setIdCreatedModal,
          message: message,
        }}
      />
    </Modal>
  );
}
const styles = StyleSheet.create({
  last_container: {
    height: '100%',
    width: '100%',
  },
  button_con: {
    height: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: '5%',
  },

  employee_id_cont: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '50%',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '5%',
  },
  generated_id_text: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
  },
  employee_id_text: {
    color: CssVariables.red,
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    fontSize: 20,
    fontFamily: CssVariables.mulishmedium,
    paddingVertical: 6,
    margin: 5,
    textAlign: 'center',
    borderRadius: 4,
    paddingHorizontal: 10,
    width: 110,
    height: 45,
  },
  prefix_id_text: {
    borderWidth: 1,
    paddingVertical: 6,
    borderColor: CssVariables.light_gray,
    fontSize: 20,
    fontFamily: CssVariables.mulishmedium,
    borderRadius: 4,
    width: '100%',
    textAlign: 'center',
    margin: 5,
    color: CssVariables.black,
  },
  save_cancle_button_con: {
    alignItems: 'center',
  },
  upper_text_cont: {
    borderBottomWidth: 1,
    borderBottomColor: CssVariables.lightblack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upper_text: {
    fontSize: 16,
    color: CssVariables.black,
    padding: 6,
    fontFamily: CssVariables.mulishmedium,
  },
  scroll_view: {
    height: '90%',
    justifyContent: 'space-evenly',
    paddingBottom: '5%',
  },
  po_scroll_view: {
    height: '100%',
    justifyContent: 'space-evenly',
    paddingVertical: '5%',
  },
  content_container: {
    width: '100%',
    height: '100%',
    backgroundColor: CssVariables.white,
  },
  right_menu_cross_icon: {
    width: 48,
    height: 48,
    right: 15,
  },
  left_back_icon: {
    width: 48,
    height: 48,
    left: 15,
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
