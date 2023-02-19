import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  LoginScreen,
  RegisterScreen,
  VerScreenImage,
  VerScreenBackgroound,
} from '../constants/Svg';
import InputField from '../components/Inputfield';
import {CssVariables} from '../constants/CssVariables';
import {LoginButton, RegisterButton} from '../components/CustomButton';
import {Api} from '../classes/Api';
import {apiEndpoints} from '../constants/apiEndPoints';
import CodeInput from 'react-native-confirmation-code-input';
import {AppLoader} from '../components/Loader';
// import RNOtpVerify from 'react-native-otp-verify';

export default function Register({navigation}) {
  const spinValue = new Animated.Value(0);
  const [number, setNumber] = useState('');
  const [focus, setFocus] = useState(false);
  const [numberError, setNumberError] = useState('');
  const [success, setSuccess] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loaderOn, setLoaderOn] = useState(false);

  console.log('.,.,.,.,.,.,.,OTP', otp);

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

  // useEffect(() => {
  //   RNOtpVerify.getHash().then(console.log).catch(console.log);
  //   RNOtpVerify.getOtp()
  //     .then(p => RNOtpVerify.addListener(otpHandler))
  //     .catch(p => console.log('nmnmnmnmnmmn', p));

  //   return () => RNOtpVerify.removeListener();
  // }, []);

  // const otpHandler = message => {
  //   const lotp = /(\d{6})/g.exec(message)[1];
  //   setOtp(lotp);
  //   console.log('././...lll', lotp);
  //   RNOtpVerify.removeListener();
  // };

  const spin = spinValue.interpolate({
    inputRange: [0, 1, 3],
    outputRange: ['0deg', '3deg', '-3deg'],
  });

  const appRegister = () => {
    setFocus(true);
    var numberValid = false;
    const reg = /^[0]?[6789]\d{9}$/;
    if (number.length === 0) {
      setNumberError('Mobile number is required.');
    } else if (number.length < 10) {
      setNumberError('Please enter valid mobile number.');
    } else if (reg.test(number) === false) {
      setNumberError('Please enter valid mobile number.');
    } else {
      setNumberError('');
      numberValid = true;
    }
    if (numberValid) {
      setLoaderOn(true);
      const apiParams = {
        url: apiEndpoints.REGISTRATION,
        requestMethod: 'post',
        response: res => {
          console.log(',.,.,.,,', res);
          // navigation.navigate('VerificationScreen', {
          //   mobile: number,
          // });
          setSessionId(res.Details), setSuccess(res);
        },
        errorFunction: error => {
          console.log(',.,.,.,', error);
          setLoaderOn(false);
        },
        endFunction: () => {
          console.log('End Function Called.');
          setLoaderOn(false);
        },
        input: {
          mobile: number,
        },
      };
      Api.callApi(apiParams);
    }
  };

  const verifyOtp = () => {
    var otpValid = false;
    setFocus(true);
    if (otp.length === 0) {
      setErrorMessage('Otp is required.');
    } else {
      setErrorMessage('');
      otpValid = true;
    }
    if (otpValid) {
      const apiParams = {
        url: apiEndpoints.VERIFY_OTP,
        requestMethod: 'post',
        response: res => {
          console.log('res,.,.,,.,.', res);
          if (res) {
            navigation.navigate('VerificationScreen', {
              otpValue: otp,
              mobile: number,
              sessionid: sessionId,
            });
          }
        },
        errorFunction: error => {
          console.log('error,.,,.,,.', error);
        },
        endFunction: () => {
          console.log('End Function Called.');
        },
        input: {
          sessionId: sessionId,
          otpValue: otp,
          mobile: number,
        },
      };
      Api.callApi(apiParams);
    }
  };

  return (
    <View style={Styles.body}>
      {success ? (
        <>
          <View style={Styles.first_body}>
            <Text>{otp}</Text>
            <VerScreenBackgroound />
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
                <VerScreenImage />
              </Animated.View>
              <Text style={Styles.otp_verification}>OTP VERIFICATION</Text>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={Styles.enter_otp}>Enter the otp sent to - </Text>
                <Text style={Styles.mobile_text}>+91-{number}</Text>
              </View>
              <CodeInput
                // ref="codeInputRef1"
                // secureTextEntry
                className={'border-box'}
                keyboardType="numeric"
                codeLength={6}
                // compareWithCode='AsDW2'
                inputPosition="center"
                activeColor={CssVariables.border_color}
                inactiveColor={'rgba(3, 107, 185, 0.4)'}
                space={10}
                size={40}
                onFulfill={code => setOtp(code)}
                codeInputStyle={{fontWeight: '800'}}
                cellBorderWidth={2}
                autoFocus={true}
              />

              {otp.length !== 6 && focus ? (
                <Text style={Styles.error_text}>{errorMessage}</Text>
              ) : (
                false
              )}
              <Text style={Styles.time_text}>00:12 sec</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: 15,
                }}>
                <Text style={Styles.code_text}>Don't receive code ?</Text>
                <TouchableOpacity onPress={appRegister}>
                  <Text style={Styles.resend_code}> Re-send</Text>
                </TouchableOpacity>
              </View>
              <View style={{alignSelf: 'center', marginTop: 15}}>
                <LoginButton text="Continue" onPress={verifyOtp} />
              </View>
            </ScrollView>
          </View>
        </>
      ) : (
        <>
          <View style={Styles.second_body}>
            <LoginScreen />
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
                <RegisterScreen />
              </Animated.View>
              <Text style={Styles.sign_text}>Sign Up</Text>
              <InputField
                placeholder="Mobile number"
                maxLength={10}
                onChangeText={value => setNumber(value)}
                value={number}
                onBlur={() => setFocus(true)}
                properties={{
                  fieldType: 'number',
                }}
              />
              {number.length !== 10 && focus ? (
                <Text style={Styles.error_message}>{numberError}</Text>
              ) : (
                false
              )}
              <View style={Styles.button_con}>
                <View style={Styles.button}>
                  {loaderOn ? (
                    <AppLoader />
                  ) : (
                    <LoginButton text="Register" onPress={appRegister} />
                  )}
                </View>
                <View style={Styles.button}>
                  <RegisterButton
                    text="Login"
                    onPress={() => navigation.navigate('Login')}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  body: {
    position: 'relative',
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    overflow: 'hidden',
    transform: [{translateX: 0}, {translateY: 0}, {rotate: '0deg'}],
    left: 0,
    top: 0,
    backgroundColor: CssVariables.border_color,
  },
  sign_text: {
    fontSize: 21,
    color: CssVariables.black_color,
    marginLeft: 35,
    marginBottom: 10,
    fontFamily: CssVariables.readex_font,
    marginTop: 10,
  },
  error_message: {
    color: CssVariables.red_color,
    fontFamily: CssVariables.readex_light_font,
    marginLeft: 35,
  },
  button_con: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  first_body: {
    flex: 1,
    backgroundColor: CssVariables.white_color,
  },
  second_body: {
    flex: 1,
    backgroundColor: CssVariables.border_color,
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
  error_text: {
    color: CssVariables.red_color,
    fontFamily: CssVariables.readex_light_font,
    marginLeft: 35,
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
  button_con: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
    width: 350,
    justifyContent: 'space-around',
  },
  button: {
    width: 145,
    height: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
