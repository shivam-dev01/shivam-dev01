import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {FilePaths} from '../constants/filepath';
import InputField from '../components/CoustomTextInput';
import CustomButton from '../components/CustomButton';
import {CssVariables} from '../constants/CssVariables';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import {Helper} from '../classes/Helper';
import SuccessModal from '../components/SuccessModal';
import {useOrientation} from '../components/useOrientation';

export default function Login({navigation}) {
  const oriantaion = useOrientation();
  const numberRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [pageChange, setPageChange] = useState(false);
  const [otpVal, setOtpVal] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [companyId, setCompanyId] = useState({storageId: '', inputId: ''});
  const [modalVisible, setModalVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpError, setOtpError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [time, setTime] = React.useState(0 || 30);
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
    thirdLoader: false,
    fourthLoader: false,
  });
  const timerRef = useRef(time);

  useEffect(() => {
    Helper.getCompanyId(data => {
      setCompanyId({storageId: data});
    });
  }, []);

  const otpTimer = () => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  };

  const forgotPassword = () => {
    if (numberRef.current.textInput.length === 10 && companyId.inputId !== '') {
      setActiveLoader({firstLoader: true});
      const apiParams = {
        url: apiEndPoints.send_otp,
        requestMethod: 'post',
        response: res => {
          setActiveLoader({firstLoader: false});
          if (res.result.Status === 'Success') {
            setPageChange(true);
            otpTimer();
            setSessionId(res.result.Details);
          }
          // console.log('--send-otp-result--', res);
        },
        errorFunction: error => {
          console.log('--send-otp-error--', error);
          if (error.result[0].param === 'mobileNumber') {
            numberRef.current.inputError(error.message);
          }
          if (error === undefined) {
            setActiveLoader({firstLoader: false});
            Helper.showToastMessage('Something went wrong.');
          } else {
            setActiveLoader({firstLoader: false});
          }
        },
        endFunction: () => {
          // console.log('End Function Called');
          setActiveLoader({firstLoader: false});
        },
        input: {
          mobileNumber: numberRef.current.textInput,
          companyAlias: companyId.storageId || companyId.inputId,
        },
      };
      Api.callApi(apiParams);
      setMobileNumber(numberRef.current.textInput);
    } else {
      numberRef.current.inputError();
      // numberRef.current.textInput;
    }
  };

  const resendPassword = () => {
    setActiveLoader({fourthLoader: true});
    const apiParams = {
      url: apiEndPoints.send_otp,
      requestMethod: 'post',
      response: res => {
        setActiveLoader({fourthLoader: false});
        if (res.result.Status === 'Success') {
          otpTimer();
        }
        // console.log('--send-otp-result--', res);
      },
      errorFunction: error => {
        // console.log('--send-otp-error--', error);
        if (error === undefined) {
          setActiveLoader({fourthLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({fourthLoader: false});
        }
      },
      endFunction: () => {
        otpTimer();
        // console.log('End Function Called');
        setActiveLoader({fourthLoader: false});
      },
      input: {
        mobileNumber: mobileNumber,
        companyAlias: companyId.storageId || companyId.inputId,
      },
    };
    Api.callApi(apiParams);
  };

  const verifyOtp = () => {
    if (otpVal.length === 6) {
      setActiveLoader({secondLoader: true});
      const apiParams = {
        url: apiEndPoints.verify_otp,
        requestMethod: 'post',
        response: res => {
          // console.log('---res--', res);
          setActiveLoader({secondLoader: false});
          if (res.result.Status === 'Success' && res.status === 200) {
            setOtpVerified(true);
          }
        },
        errorFunction: error => {
          // console.log('--error---', error);
          if (error.status === 400) {
            setOtpError('OTP does not match.');
          }
          if (error === undefined) {
            setActiveLoader({secondLoader: false});
            Helper.showToastMessage('Something went wrong.');
          } else {
            setActiveLoader({secondLoader: false});
          }
        },
        endFunction: () => {
          // console.log('End Function called');
          setActiveLoader({secondLoader: false});
        },
        input: {
          sessionId: sessionId,
          otpValue: otpVal,
          companyAlias: companyId.storageId || companyId.inputId,
        },
      };
      Api.callApi(apiParams);
    } else {
      setOtpError('Enter valid OTP.');
    }
  };

  const ressetPassword = () => {
    if (
      passwordRef.current.textInput < 6 ||
      confirmPasswordRef.current.textInput < 6
    ) {
      passwordRef.current.inputError();
      confirmPasswordRef.current.inputError();
    } else if (
      passwordRef.current.textInput === confirmPasswordRef.current.textInput
    ) {
      setActiveLoader({thirdLoader: true});
      const apiParams = {
        url: apiEndPoints.reset_pass,
        requestMethod: 'post',
        response: res => {
          // console.log('---res--', res);
          setActiveLoader({thirdLoader: false});
          if (res.result && res.status === 200) {
            setModalVisible(true);
            setSuccessMsg(res.message);
            Helper.removePasswordData();
            Helper.removeStatus();
          }
        },
        errorFunction: error => {
          // console.log('--error---', error);
          if (error === undefined) {
            setActiveLoader({thirdLoader: false});
            Helper.showToastMessage('Something went wrong.');
          } else {
            setActiveLoader({thirdLoader: false});
          }
        },
        endFunction: () => {
          // console.log('End Function called');
          setActiveLoader({thirdLoader: false});
        },
        input: {
          mobileNumber: mobileNumber,
          password: passwordRef.current.textInput,
          companyAlias: companyId.storageId || companyId.inputId,
          otpValue: otpVal,
          sessionId: sessionId,
        },
      };
      Api.callApi(apiParams);
    } else {
      confirmPasswordRef.current.inputError("Password didn't match.");
    }
  };

  return (
    <View style={oriantaion === 'PORTRAIT' ? styles.body : styles.po_body}>
      <View
        style={
          oriantaion === 'PORTRAIT'
            ? styles.input_container
            : styles.po_input_container
        }>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          disableScrollViewPanResponder={true}>
          {otpVerified ? (
            <Text style={styles.upper_text}>Create a New Password</Text>
          ) : (
            <Text style={styles.upper_text}>
              {pageChange
                ? 'Enter The OTP Received'
                : `We will send an OTP to your 
   registered mobile number.`}
            </Text>
          )}
          {otpVerified ? (
            <View>
              <View style={styles.password_container}>
                <InputField
                  ref={passwordRef}
                  properties={{
                    fieldType: 'password',
                  }}
                />
              </View>
              <View style={styles.password_container}>
                <InputField
                  ref={confirmPasswordRef}
                  properties={{
                    fieldType: 'confirmpassword',
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.password_container}>
              {pageChange ? (
                <>
                  <TextInput
                    onChangeText={value => {
                      if (isNaN(value)) {
                        return;
                      }
                      if (value.length > 6) {
                        return;
                      }
                      setOtpVal(value);
                      setOtpError();
                    }}
                    style={styles.otp_text_input}
                    autoFocus={true}
                    keyboardType="numeric"
                    caretHidden={true}
                    maxLength={6}
                  />
                  <View style={styles.otpBoxesContainer}>
                    {[0, 1, 2, 3, 4, 5].map((item, index) => (
                      <Text style={styles.otpBox} key={index}>
                        {otpVal[item]}
                      </Text>
                    ))}
                  </View>
                  <Text style={styles.otp_error}>{otpError}</Text>
                </>
              ) : (
                <>
                  <View
                    style={[styles.number_container, {position: 'relative'}]}>
                    <View style={styles.company_id_con}>
                      <Image
                        source={FilePaths.companyid}
                        style={{
                          position: 'absolute',
                          left: 10,
                          alignSelf: 'center',
                          width: 22,
                          height: 22,
                        }}
                      />
                      <TextInput
                        style={styles.company_id_input}
                        value={companyId.storageId || companyId.inputId}
                        onChangeText={value => setCompanyId({inputId: value})}
                        placeholder="Enter your company Id"
                        placeholderTextColor={CssVariables.gray}
                      />
                      <Image
                        source={FilePaths.iderroricon}
                        style={styles.id_error_icon}
                      />
                    </View>
                    {(companyId.storageId && companyId.storageId.length) ||
                    (companyId.inputId && companyId.inputId.length) ? null : (
                      <View>
                        <Image
                          source={FilePaths.companyiderr}
                          style={styles.company_id_err}
                        />
                      </View>
                    )}
                  </View>
                  <InputField
                    ref={numberRef}
                    properties={{
                      fieldType: 'registerednumber',
                    }}
                  />
                </>
              )}
            </View>
          )}
          {otpVerified ? null : (
            <View>
              {pageChange ? (
                <>
                  {time !== 0 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginBottom: 15,
                      }}>
                      <Text
                        style={[
                          styles.timer_text,
                          {color: CssVariables.red_meduim},
                        ]}>
                        Resend OTP in{' '}
                      </Text>
                      <Text style={styles.timer_text}>
                        00:{time.toString().length === 1 ? `0${time}` : time}{' '}
                        Sec
                      </Text>
                    </View>
                  ) : null}
                  {time === 0 && (
                    <View style={styles.not_otp_con}>
                      <Pressable onPress={resendPassword}>
                        {activeLoader.fourthLoader ? (
                          <ActivityIndicator
                            size={'small'}
                            color={CssVariables.red_meduim}
                          />
                        ) : (
                          <Text
                            style={{
                              color:
                                time === 0
                                  ? CssVariables.red_meduim
                                  : CssVariables.gray,
                              fontFamily: CssVariables.mulishmedium,
                              fontSize: 16,
                            }}>
                            Resend Now!
                          </Text>
                        )}
                      </Pressable>
                    </View>
                  )}
                </>
              ) : null}
            </View>
          )}
          {otpVerified ? (
            <View style={{width: '100%', alignItems: 'center'}}>
              <CustomButton
                onPress={ressetPassword}
                text={
                  activeLoader.thirdLoader ? (
                    <ActivityIndicator
                      size={'small'}
                      color={CssVariables.white}
                    />
                  ) : (
                    'Countinue'
                  )
                }
                properties={{
                  fieldType: 'widthlongdarkgreen',
                }}
              />
            </View>
          ) : (
            <View style={{width: '100%', alignItems: 'center'}}>
              {pageChange ? (
                <CustomButton
                  onPress={verifyOtp}
                  text={
                    activeLoader.secondLoader ? (
                      <ActivityIndicator
                        size={'small'}
                        color={CssVariables.white}
                      />
                    ) : (
                      'Validate'
                    )
                  }
                  properties={{
                    fieldType: 'widthlongdarkgreen',
                  }}
                />
              ) : (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <CustomButton
                    text={
                      activeLoader.firstLoader ? (
                        <ActivityIndicator
                          size={'small'}
                          color={CssVariables.white}
                        />
                      ) : (
                        'Countinue'
                      )
                    }
                    onPress={forgotPassword}
                    properties={{
                      fieldType: 'widthlongdarkgreen',
                    }}
                  />
                </View>
              )}
            </View>
          )}
          {pageChange && (
            <View style={{width: '100%', alignItems: 'center'}}>
              <CustomButton
                text="Cancel"
                onPress={() => navigation.navigate('Login')}
                properties={{
                  fieldType: 'white',
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
      <SuccessModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        properties={{
          success: 'fogotPassword',
          modalFalse: setModalVisible,
          navigation: navigation,
          message: successMsg,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: CssVariables.light_white,
  },
  po_body: {
    flex: 1,
    flexDirection: 'row',
  },
  bg_image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  contentContainerStyle: {
    width: '100%',
    paddingBottom: 5,
  },
  image_container: {
    width: 200,
    height: 35,
    alignSelf: 'center',
    marginVertical: '12%',
  },
  po_image_container: {
    width: '34%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_logo: {
    width: '100%',
    height: '100%',
  },
  po_image_logo: {
    width: 200,
    height: 35,
  },

  input_container: {
    borderRadius: 10,
    backgroundColor: CssVariables.white,
    paddingHorizontal: '5%',
    width: '92%',
    paddingVertical: '10%',
    alignSelf: 'center',
  },
  po_input_container: {
    borderRadius: 10,
    backgroundColor: CssVariables.white,
    elevation: 10,
    paddingHorizontal: '5%',
    width: '60%',
    paddingVertical: '5%',
    height: '95%',
    alignSelf: 'center',
  },
  upper_text: {
    fontSize: 16,
    color: CssVariables.darkgray,
    // fontWeight: 'bold',
    fontFamily: CssVariables.mulishregular,
    marginBottom: '10%',
    alignSelf: 'center',
  },
  details_texts: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
  },
  not_recev_otp: {
    alignSelf: 'center',
    // marginVertical: 5,
    fontFamily: CssVariables.mulishregular,
    fontSize: 16,
    color: CssVariables.black,
  },
  resend_con: {
    flexDirection: 'row',
    marginBottom: '15%',
    alignSelf: 'center',
  },
  timer_text: {
    alignSelf: 'center',
    color: CssVariables.black,
    fontFamily: CssVariables.mulishmedium,
    marginBottom: 5,
  },
  not_otp_con: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '96%',
    marginBottom: 15,
  },
  number_container: {
    marginBottom: 25,
    position: 'relative',
  },
  password_container: {
    marginVertical: 8,
  },
  otpBoxesContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  otp_text_input: {
    position: 'absolute',
    width: '100%',
    color: 'transparent',
    backgroundColor: 'transparent',
  },
  otpBox: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: CssVariables.light_gray,
    borderColor: CssVariables.blue,
    height: 35,
    width: 40,
    alignSelf: 'center',
    color: CssVariables.black,
    fontFamily: CssVariables.mulishmedium,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  otp_error: {
    color: CssVariables.red,
    fontFamily: CssVariables.mulishregular,
    marginLeft: 15,
  },
  company_id_con: {
    borderRadius: 25,
    flexBasis: 50,
    borderColor: CssVariables.light_gray,
    flexShrink: 1,
    height: 50,
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: CssVariables.light_white,
  },
  company_id_input: {
    borderRadius: 4,
    width: '100%',
    flexShrink: 1,
    paddingLeft: 42,
    color: CssVariables.black,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 14,
  },
  id_error_icon: {
    position: 'absolute',
    alignSelf: 'center',
    right: 20,
    height: 17,
    width: 17,
  },
  company_id_err: {
    width: 196,
    height: 57,
    position: 'absolute',
    zIndex: 1,
    right: 5,
  },
});
