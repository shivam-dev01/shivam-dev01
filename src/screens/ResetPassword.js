import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {FilePaths} from '../constants/filePath';
import {CssVariables} from '../constants/CssVariables';
import {RightIcon, WrongIcon} from '../constants/Svg';
import {Helper} from '../classes/Helper';
import {LoginButton} from '../components/CustomButton';
import {apiEndpoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';

export default function ResetPassword() {
  const [focus, setFocus] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [errorIcon, setErrorIcon] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const [rightIcon, setRighIcon] = useState();

  const submitPassword = () => {
    setFocus(true);
    var validPassword = false;
    if (newPassword.length === 0) {
      setPasswordErrorMessage('Password is required.');
      setErrorIcon(<WrongIcon />);
    } else if (newPassword.length !== 6) {
      setPasswordErrorMessage('New password must be 6 digits.');
      setErrorIcon(<WrongIcon />);
    } else if (newPassword !== confirmPassword) {
      setErrorIcon(<WrongIcon />);
      Helper.showToastMessage(
        'New password and confirm password should be same.',
      );
    } else {
      setPasswordErrorMessage('');
      validPassword = true;
    }

    var validConfirmPassword = false;
    if (confirmPassword.length == 0) {
      setConfirmPasswordError('Confirm Password required.');
    } else if (confirmPassword == newPassword) {
      setRighIcon(<RightIcon />);
    } else {
      setConfirmPasswordError('');
      validConfirmPassword = true;
    }
    if (validPassword) {
      const apiParams = {
        url: apiEndpoints.SET_PASSWORD,
        requestMethod: 'post',
        response: res => {
          console.log('RRR,.,..,...,.', res);
          navigation.navigate('RegisteredDone');
        },
        errorFunction: error => {
          console.log('ERRR././/.//', error);
        },
        endFunction: () => {
          console.log('End Function Called');
        },
        input: {
          sessionId: sessionid,
          otpValue: otpValue,
          mobile: mobile,
          password: newPassword,
        },
      };
      Api.callApi(apiParams);
    }
  };

  return (
    <View style={Styles.body}>
      <ImageBackground
        source={FilePaths.resetpasswordbg}
        style={Styles.bg_image}
        resizeMode="cover">
        <ScrollView disableScrollViewPanResponder={true}>
          <Image source={FilePaths.resetpasswordiamge} style={Styles.image} />
          <Text style={Styles.reset_password}>Create New Password</Text>
          <View style={Styles.input_cont}>
            <TextInput
              style={Styles.input}
              placeholder="New Password"
              maxLength={6}
              onChangeText={value => setNewPassword(value)}
              value={newPassword}
              onBlur={() => setFocus(true)}
            />
            {newPassword.length === 6 && focus ? (
              <View style={Styles.right_icon}>
                <RightIcon />
              </View>
            ) : (
              false
            )}
            {newPassword.length !== 6 && focus ? (
              <View style={Styles.right_icon}>{errorIcon}</View>
            ) : (
              false
            )}
          </View>
          {newPassword.length !== 6 && focus ? (
            <Text style={Styles.error_text}>{passwordErrorMessage}</Text>
          ) : (
            false
          )}
          <View style={Styles.input_cont}>
            <TextInput
              style={Styles.input}
              placeholder="Confirm Password"
              maxLength={6}
              onChangeText={value => setConfirmPassword(value)}
              value={confirmPassword}
              onBlur={() => setFocus(true)}
            />
            {newPassword !== confirmPassword && focus ? (
              <View style={Styles.right_icon}>{errorIcon}</View>
            ) : (
              false
            )}
            {newPassword == confirmPassword && focus ? (
              <View style={Styles.right_icon}>{rightIcon}</View>
            ) : (
              false
            )}
          </View>

          {confirmPassword.length !== 6 && focus ? (
            <Text style={Styles.error_text}>{confirmPasswordError}</Text>
          ) : (
            false
          )}
          <View style={{alignSelf: 'center', marginTop: 20}}>
            <LoginButton text="Continue" onPress={submitPassword} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const Styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  bg_image: {
    flex: 1,
  },
  image: {
    width: 250,
    height: 263,
    alignSelf: 'center',
  },
  reset_password: {
    fontSize: 21,
    color: CssVariables.black_color,
    marginLeft: 35,
    marginBottom: 10,
    fontFamily: CssVariables.readex_font,
    marginTop: 10,
  },
  input_cont: {
    width: '87%',
    height: 50,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: CssVariables.white_color,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: CssVariables.border_color,
    margin: 10,
  },
  input: {
    width: '85%',
    height: 47,
    backgroundColor: CssVariables.white_color,
    fontSize: 16,
    fontFamily: CssVariables.popins_regular,
    borderColor: CssVariables.input_border_color,
    alignSelf: 'center',
    color: CssVariables.text_color,
  },
  right_icon: {
    right: 20,
    bottom: 15,
    position: 'absolute',
  },
  error_text: {
    color: CssVariables.red_color,
    fontFamily: CssVariables.readex_light_font,
    marginLeft: 35,
  },
  body: {
    flex: 1,
    backgroundColor: CssVariables.white_color,
  },
  otp_verification: {
    fontSize: 18,
    color: CssVariables.medium_black_color,
    alignSelf: 'center',
    fontFamily: CssVariables.readex_font,
    marginBottom: 10,
  },

  enter_otp: {
    fontSize: 14,
    color: CssVariables.light_grey_color,
    fontFamily: CssVariables.readex_light_font,
  },
  mobile_text: {
    color: CssVariables.medium_black_color,
    fontSize: 14,
    fontFamily: CssVariables.readex_font,
  },
  time_text: {
    fontSize: 14,
    color: CssVariables.medium_black_color,
    alignSelf: 'center',
    marginTop: 10,
  },
  code_text: {
    fontSize: 14,
    color: CssVariables.light_grey_color,
    fontFamily: CssVariables.readex_light_font,
  },
  resend_code: {
    fontSize: 14,
    color: CssVariables.medium_black_color,
    fontFamily: CssVariables.readex_font,
  },
});
