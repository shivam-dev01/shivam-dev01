import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filePath';
import InputField from '../components/Inputfield';
import {LoginButton, RegisterButton} from '../components/CustomButton';
import {apiEndpoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import {VerScreenBackgroound, VerScreenImage} from '../constants/Svg';
import CodeInput from 'react-native-confirmation-code-input';

export default function ForgotPassword({navigation}) {
  const spinValue = new Animated.Value(0);
  const [number, setNumber] = useState('');
  const [focus, setFocus] = useState(false);
  const [numberError, setNumberError] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [success, setSuccess] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loaderOn, setLoaderOn] = useState(false);

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

  const forgotPassword = () => {
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
      const apiParams = {
        url: apiEndpoints.FORGOT_PASSWORD,
        requestMethod: 'post',
        response: res => {
          console.log(',.,.,.,,', res);
          setSuccess(res);
          setSessionId(res.Details);
        },
        errorFunction: error => {
          console.log(',.,.,.,', error);
        },
        endFunction: () => {
          console.log('End Function Called.');
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
              <TouchableOpacity onPress={forgotPassword}>
                <Text style={Styles.resend_code}> Re-send</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center', marginTop: 15}}>
              <LoginButton text="Continue" onPress={verifyOtp} />
            </View>
          </ScrollView>
        </View>
      ) : (
        <ImageBackground
          source={FilePaths.forgotpassword}
          resizeMode="cover"
          style={Styles.background_image}>
          <ScrollView disableScrollViewPanResponder={true}>
            <Image
              source={FilePaths.forgotpasswordimage}
              style={Styles.image}
            />
            <Text style={Styles.forgot_password_text}>{`Forgot
Password ?`}</Text>

            <InputField
              placeholder="Enter the phone number"
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
            <View style={{alignSelf: 'center', marginTop: 25}}>
              <LoginButton text="Continue" onPress={forgotPassword} />
            </View>
            <View style={{alignSelf: 'center', marginTop: 10}}>
              <RegisterButton
                text="Log In"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  background_image: {
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
  forgot_password_text: {
    fontSize: 24,
    color: CssVariables.black_color,
    fontFamily: CssVariables.readex_font,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
  },

  error_message: {
    color: CssVariables.red_color,
    fontFamily: CssVariables.readex_light_font,
    marginLeft: 35,
  },
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
