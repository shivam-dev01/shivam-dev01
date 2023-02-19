import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  BackHandler,
  Pressable,
} from 'react-native';
import React, {useRef, useState, useCallback} from 'react';
import {FilePaths} from '../constants/filepath';
import InputField from '../components/CoustomTextInput';
import CustomButton from '../components/CustomButton';
import {CssVariables} from '../constants/CssVariables';
import {Api} from '../classes/Api';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Helper} from '../classes/Helper';
import {useFocusEffect} from '@react-navigation/native';
import {useOrientation} from '../components/useOrientation';
import NetworkInfo from '../components/NetworkInfo';

export default function Login({navigation}) {
  const orientation = useOrientation();
  const numberRef = useRef('');
  const passwordRef = useRef('');

  const [companyId, setCompanyId] = useState('');
  const [remeberMe, setRemeberMe] = useState(false);
  const [activeLoader, setActiveLoader] = useState(false);
  const [aliasImage, setAliasImage] = useState(false);
  // console.log('-----', companyId);

  useFocusEffect(
    useCallback(() => {
      getCompanyId();
      getRememberUser();
      BackHandler.addEventListener('hardwareBackPress', BackHandler.exitApp);
      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          BackHandler.exitApp,
        );
    }, []),
  );

  const getCompanyId = () => {
    Helper.getCompanyId(data => {
      // console.log('---data', data);
      setCompanyId(data);
    });
  };

  const toggleRememberMe = value => {
    setRemeberMe(!remeberMe);
    // console.log('--value--', value);
    if (value === false) {
      Helper.removeNumberData();
      Helper.removePasswordData();
      Helper.removeStatus();
    }
  };

  const remeberUser = () => {
    Helper.handleNumber(numberRef.current.textInput, () => {
      // console.log('Number Saved');
    });
    Helper.handlePassword(passwordRef.current.textInput, () => {
      // console.log('Password Saved');
    });
    Helper.handleStatus('true', () => {
      // console.log('Status Saved');
    });
  };

  const getRememberUser = () => {
    Helper.getNumber(data => {
      const userNumber = data;
      if (userNumber !== null) {
        numberRef.current.setTextInput(userNumber);
      }
    });

    Helper.getPassword(data => {
      const userPassword = data;
      if (userPassword !== null) {
        passwordRef.current.setTextInput(userPassword);
      }
    });

    Helper.getStatus(data => {
      const status = data;
      // console.log('--stat', status);
      if (status !== null) {
        setRemeberMe(JSON.parse(data));
      }
    });
  };

  const forgetUser = () => {
    Helper.removeNumberData();
    Helper.removePasswordData();
    Helper.removeStatus();
  };

  const loginSumbmition = () => {
    if (
      numberRef.current.textInput.length < 10 ||
      passwordRef.current.textInput.length < 6 ||
      !companyId
    ) {
      numberRef.current.inputError();
      passwordRef.current.inputError();
      setAliasImage(true);
    } else {
      setActiveLoader(true);
      const apiParams = {
        url: apiEndPoints.login,
        requestMethod: 'post',
        hideResponseMsg: true,
        response: res => {
          console.log('----login res----', res);
          setActiveLoader(false);
          if (remeberMe === true) {
            remeberUser();
          } else {
            forgetUser();
          }
          Helper.handleLoginData(res, () => {
            // console.log('Data saved');
          });
          if (res.result.userType === 'ROOT') {
            navigation.navigate('BottomTab');
          } else {
            numberRef.current.inputError('Invalid user.');
            return;
          }
        },
        errorFunction: error => {
          console.log('----login error----', error);
          if (error.status === 400) {
            numberRef.current.inputError(error.message);
          }
          if (error.status === 500) {
            passwordRef.current.inputError(error.message);
            numberRef.current.inputError(error.message);
          }
          if (error === undefined) {
            setActiveLoader(false);
            Helper.showToastMessage('Something went wrong.');
          } else {
            setActiveLoader(false);
          }
        },
        endFunction: () => {
          setActiveLoader(false);
          // console.log('End Function Called');
        },
        input: {
          mobileNumber: numberRef.current.textInput,
          password: passwordRef.current.textInput,
          companyAlias: companyId,
        },
      };
      Api.callApi(apiParams);
      Helper.storeCompanyId(companyId, () => {
        // console.log('Company Id Saved');
      });
    }
  };
  return (
    <>
      <View style={styles.body}>
        <View
          style={
            orientation === 'PORTRAIT'
              ? styles.input_container
              : styles.po_input_container
          }>
          <Text style={styles.upper_text}>Welcome !</Text>
          <Text style={styles.lower_text}>Sign in to continue</Text>
          <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            disableScrollViewPanResponder={true}>
            <View
              style={[
                styles.number_container,
                {position: 'relative', marginBottom: 22},
              ]}>
              <View style={styles.company_id_con}>
                <Image
                  source={FilePaths.companyid}
                  style={{
                    position: 'absolute',
                    left: 10,
                    alignSelf: 'center',
                    width: 18,
                    height: 20.5,
                  }}
                />
                <TextInput
                  style={styles.company_id_input}
                  value={companyId}
                  onChangeText={value => setCompanyId(value)}
                  placeholder="Enter your company Id"
                  placeholderTextColor={CssVariables.gray}
                />
                <Pressable
                  style={styles.id_error_icon}
                  onPress={() => setAliasImage(!aliasImage)}
                  android_ripple={{color: CssVariables.light_gray}}>
                  <Image
                    source={FilePaths.iderroricon}
                    style={{height: 17, width: 17}}
                  />
                </Pressable>
              </View>
              {aliasImage && (
                <View>
                  <Image
                    source={FilePaths.companyiderr}
                    style={styles.company_id_err}
                  />
                </View>
              )}
            </View>
            <View style={styles.number_container}>
              <InputField
                ref={numberRef}
                properties={{
                  fieldType: 'number',
                }}
              />
            </View>
            <View style={styles.password_container}>
              <InputField
                ref={passwordRef}
                properties={{
                  fieldType: 'password',
                }}
              />
            </View>
            <View style={styles.forgot_pass_reme_pass_con}>
              <TouchableOpacity
                onPress={() =>
                  toggleRememberMe(remeberMe === false ? true : false)
                }
                style={[
                  styles.fogot_password_container,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                {remeberMe ? (
                  <Image
                    source={FilePaths.checkboxes}
                    style={styles.radio_button}
                  />
                ) : (
                  <View
                    style={[
                      styles.radio_button,
                      {
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: CssVariables.blue,
                      },
                    ]}
                  />
                )}

                <Text style={styles.remember_me_text}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.fogot_password_container}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.fogot_password_text}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button_con}>
              <CustomButton
                text={
                  activeLoader ? (
                    <ActivityIndicator
                      size={'small'}
                      color={CssVariables.white}
                    />
                  ) : (
                    'Login'
                  )
                }
                onPress={loginSumbmition}
                properties={{
                  fieldType: 'widthlongdarkgreen',
                }}
              />
            </View>
            <View style={styles.already_acc_con}>
              <Text style={styles.already_acc_text}>
                Don`t have an account{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateAccount')}>
                <Text style={styles.sign_in_text}>Sign Up !</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      <NetworkInfo />
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.light_white,
    justifyContent: 'center',
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
  contentContainerStyle: {
    width: '100%',
  },
  input_container: {
    borderRadius: 10,
    backgroundColor: CssVariables.white,
    paddingHorizontal: '5%',
    width: '92%',
    paddingVertical: '5%',
    alignSelf: 'center',
  },
  po_input_container: {
    borderRadius: 10,
    backgroundColor: CssVariables.white,
    paddingHorizontal: '5%',
    width: '92%',
    paddingVertical: '5%',
    alignSelf: 'center',
    height: '95%',
  },
  upper_text: {
    fontSize: 22,
    color: CssVariables.sky_blue,
    fontFamily: CssVariables.mulishmedium,
    alignSelf: 'center',
  },
  lower_text: {
    fontSize: 16,
    color: CssVariables.dark_blue,
    fontFamily: CssVariables.mulishregular,
    alignSelf: 'center',
  },
  details_texts: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
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
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
  },
  id_error_icon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  company_id_err: {
    width: 196,
    height: 57,
    position: 'absolute',
    zIndex: 1,
    right: 10,
    top: -10,
  },
  remember_me_text: {
    color: CssVariables.black,
    borderColor: CssVariables.black,
  },
  fogot_password_text: {
    borderBottomWidth: 1,
    color: CssVariables.red_meduim,
    borderColor: CssVariables.red_meduim,
  },
  number_container: {
    marginVertical: 8,
  },
  forgot_pass_reme_pass_con: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  password_container: {
    marginVertical: 8,
  },
  fogot_password_container: {
    marginBottom: '15%',
  },
  radio_button: {
    width: 17,
    height: 17,
    marginRight: 5,
    borderRadius: 5,
  },
  button_con: {
    alignItems: 'center',
  },
  already_acc_con: {
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  already_acc_text: {
    color: CssVariables.dark_blue,
    fontSize: 16,
    fontFamily: CssVariables.mulishregular,
  },
  sign_in_text: {
    color: CssVariables.red_meduim,
    fontSize: 16,
    fontFamily: CssVariables.mulishmedium,
    paddingVertical: 5,
  },
});
