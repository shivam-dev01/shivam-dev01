import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  VerScreenBackgroound,
  VerScreenImage,
  CreatePasswordBg,
  PasswordScreenImg,
  RightIcon,
  WrongIcon,
} from '../constants/Svg';
import {LoginButton} from '../components/CustomButton';
import {CssVariables} from '../constants/CssVariables';
import {Api} from '../classes/Api';
import {apiEndpoints} from '../constants/apiEndPoints';
import {Helper} from '../classes/Helper';
import {FilePaths} from '../constants/filePath';
import {AppLoader} from '../components/Loader';
export default function VerificationScreen({navigation, route}) {
  const {otpValue, sessionid, mobile} = route.params;
  const [focus, setFocus] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [errorIcon, setErrorIcon] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const [rightIcon, setRighIcon] = useState();
  const [loaderOn, setLoaderOn] = useState(false);
  const spinValue = new Animated.Value(0);

  // console.log(',,,.,RRRRRRRR.,.,.,,.', otpValue, sessionid, mobile);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: 2,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1, 3],
    outputRange: ['0deg', '3deg', '-3deg'],
  });

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
      setLoaderOn(true);
      const apiParams = {
        url: apiEndpoints.SET_PASSWORD,
        requestMethod: 'post',
        response: res => {
          console.log('RRR,.,..,...,.', res);
          navigation.navigate('RegisteredDone');
        },
        errorFunction: error => {
          console.log('ERRR././/.//', error);
          setLoaderOn(false);
        },
        endFunction: () => {
          console.log('End Function Called');
          setLoaderOn(false);
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
      <View style={Styles.first_body}>
        <ImageBackground
          source={FilePaths.resetpasswordbg}
          style={Styles.bg_image}
          resizeMode="cover">
          <ScrollView disableScrollViewPanResponder={true}>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      rotate: spin,
                    },
                  ],
                },
              ]}>
              <Image
                source={FilePaths.resetpasswordiamge}
                style={Styles.image}
              />
            </Animated.View>
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
            <View style={Styles.button}>
              {loaderOn ? (
                <AppLoader />
              ) : (
                <LoginButton text="Submit" onPress={submitPassword} />
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  first_body: {
    flex: 1,
    backgroundColor: CssVariables.border_color,
  },
  bg_image: {
    flex: 1,
  },
  image: {
    minWidth: '20%',
    maxWidth: 190,
    minHeight: '10%',
    maxHeight: 200,
    width: 190,
    height: 200,
    alignSelf: 'center',
    marginTop: 30,
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
  otp_box_style: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: CssVariables.grey_color,
    elevation: 5,
    color: CssVariables.black_color,
  },
  otp_box_HighLighted: {
    borderColor: CssVariables.border_color,
  },
  button: {
    width: 145,
    height: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
});
