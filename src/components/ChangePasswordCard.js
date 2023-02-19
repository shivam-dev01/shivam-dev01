import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CoustomTextInput from '../components/CoustomTextInput';
import {CssVariables} from '../constants/CssVariables';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import {Helper} from '../classes/Helper';
import SuccessModal from '../components/SuccessModal';

export default function ChangePasswordCard({
  change,
  setChange,
  setConfigEmpId,
  setconfigChngPass,
  setConfigOffTime,
  showChangePassword,
}) {
  const backFunction = () => {
    setChange(!change);
    setConfigEmpId(false);
    setConfigOffTime(false);
    setconfigChngPass(false);
  };

  const oldPassword = useRef('');
  const newPassword = useRef('');
  const confirmPassword = useRef('');
  const [id, setId] = useState('');
  const [activeLoader, setActiveLoader] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    Helper.getLoginData(data => {
      setId(data.result.id);
    });
  }, []);

  const changePassword = () => {
    if (
      oldPassword.current.textInput.length < 6 ||
      newPassword.current.textInput.length < 6 ||
      confirmPassword.current.textInput.length < 6
    ) {
      oldPassword.current.inputError();
      newPassword.current.inputError();
      confirmPassword.current.inputError();
    } else {
      if (newPassword.current.textInput === confirmPassword.current.textInput) {
        setActiveLoader(true);
        const apiParams = {
          url: `${apiEndPoints.change_password}/${id}`,
          requestMethod: 'put',
          hideResponseMsg: true,
          response: res => {
            // console.log('--res--', res);
            setActiveLoader(false);
            if (res.status === 200) {
              setSuccessModal(true);
              setMessage(res.message);
            }
          },
          errorFunction: error => {
            // console.log('--error--', error);
            if (error.status === 400) {
              Helper.showToastMessage(
                "An old password and a new password can't be identical.",
              );
            }
            if (error === undefined) {
              setActiveLoader(false);
              Helper.showToastMessage('Something went wrong.');
            } else {
              setActiveLoader(false);
            }
          },
          endFunction: () => {
            // console.log('End Function Called');
            setActiveLoader(false);
          },
          input: {
            oldPassword: oldPassword.current.textInput,
            newPassword: newPassword.current.textInput,
          },
        };
        Api.callApi(apiParams);
      } else {
        confirmPassword.current.inputError("Password didn't match.");
      }
    }
  };

  return (
    <Modal
      visible={showChangePassword}
      animationType="fade"
      onRequestClose={backFunction}>
      <View style={styles.last_container}>
        <View style={styles.upper_text_cont}>
          <Text style={styles.upper_text}>Change Password</Text>
        </View>
        <View style={styles.configure_employee_id_text_con}>
          <Text style={styles.configure_employee_id_text}>
            Change Your Password
          </Text>
        </View>
        <View style={{alignItems: 'center', paddingVertical: 5}}>
          <Text style={styles.middle_Text}>{`Stay safe and secure by updating
         your password regularly.`}</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scroll_view}
          disableScrollViewPanResponder={true}>
          <View style={{paddingHorizontal: '6%'}}>
            <View style={styles.input_container}>
              <Text style={styles.input_upper_text}>Old Password</Text>
              <CoustomTextInput
                ref={oldPassword}
                properties={{
                  fieldType: 'oldpassword',
                }}
              />
            </View>
            <View style={styles.input_container}>
              <Text style={styles.input_upper_text}>New Password</Text>
              <CoustomTextInput
                ref={newPassword}
                properties={{
                  fieldType: 'newpassword',
                }}
              />
            </View>
            <View style={[styles.input_container, {marginBottom: '10%'}]}>
              <Text style={styles.input_upper_text}>Confirm Password</Text>
              <CoustomTextInput
                ref={confirmPassword}
                properties={{
                  fieldType: 'confirmpassword',
                }}
              />
            </View>
          </View>
          <View style={styles.save_cancle_button_con}>
            <CustomButton
              onPress={changePassword}
              text={
                activeLoader ? (
                  <ActivityIndicator
                    size={'small'}
                    color={CssVariables.white}
                  />
                ) : (
                  'Change'
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
      </View>
      <SuccessModal
        visible={successModal}
        onRequestClose={() => setSuccessModal(false)}
        properties={{
          success: 'changePass',
          modalFalse: setSuccessModal,
          message: message,
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  last_container: {
    height: '100%',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  save_cancle_button_con: {
    alignItems: 'center',
  },
  input_container: {
    paddingBottom: '8%',
  },
  input_upper_text: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
  },
  scroll_view: {
    paddingBottom: 15,
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
