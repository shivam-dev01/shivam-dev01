import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {FilePaths} from '../constants/filepath';
import InputField from '../components/CoustomTextInput';
import CustomButton from '../components/CustomButton';
import {CssVariables} from '../constants/CssVariables';
import {Api} from '../classes/Api';
import {Helper} from '../classes/Helper';
import {apiEndPoints} from '../constants/apiEndPoints';
import SuccessModal from '../components/SuccessModal';
import GeoLocation from 'react-native-geolocation-service';
import {useOrientation} from '../components/useOrientation';
import NetInfo from '@react-native-community/netinfo';
import NetworkInfo from '../components/NetworkInfo';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Login({navigation}) {
  const orientation = useOrientation();
  // console.log('---oriantaion--', orientation);
  useEffect(() => {
    NetInfo.addEventListener(state => {
      // console.log('--state--', state);
      setIpV4Address(state.details.ipAddress);
    });
    requestLocationPermission();
  }, []);

  const nameRef = useRef('');
  const phoneRef = useRef('');
  const orgnizationRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const [ipV4Address, setIpV4Address] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [activeLoader, setActiveLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  // console.log('----ipv4---', ipV4Address);

  const requestLocationPermission = async () => {
    try {
      const grantedReq = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission',
          message: 'Netclack Admin needs access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (grantedReq === PermissionsAndroid.RESULTS.GRANTED) {
        GeoLocation.getCurrentPosition(
          position => {
            // console.log('--position--', position);
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
          },
          error => {
            // console.log(error.code, error.message);
          },
          {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
        );
      } else {
        // console.log('Location permission denied');
      }
    } catch (err) {
      // console.warn(err);
    }
  };

  const createAccount = () => {
    if (
      nameRef.current.textInput.length < 3 ||
      phoneRef.current.textInput.length < 10 ||
      orgnizationRef.current.textInput.length < 3 ||
      passwordRef.current.textInput.length < 6
    ) {
      nameRef.current.inputError();
      phoneRef.current.inputError();
      orgnizationRef.current.inputError();
      passwordRef.current.inputError();
      confirmPasswordRef.current.inputError();
    } else if (
      passwordRef.current.textInput === confirmPasswordRef.current.textInput
    ) {
      setActiveLoader(true);
      const apiParams = {
        url: apiEndPoints.employer_register,
        requestMethod: 'post',
        hideResponseMsg: true,
        response: res => {
          setActiveLoader(false);
          if (res.status === 200) {
            Helper.storeCompanyId(res.result.companyAlias, () => {});
            setMessage(res.message);
            setSuccessModal(true);
          }
          console.log('--res--', res);
        },
        errorFunction: error => {
          if (error.result[0].param === 'companyAlias') {
            orgnizationRef.current.inputError(error.message);
          }
          if (error === undefined) {
            setActiveLoader(false);
            Helper.showToastMessage('Something went wrong.');
          } else {
            setActiveLoader(false);
          }
          console.log('--error--', error);
        },
        endFunction: () => {
          setActiveLoader(false);
          // console.log('End Function Called');
        },
        input: {
          fullName: nameRef.current.textInput,
          password: passwordRef.current.textInput,
          mobileNumber: phoneRef.current.textInput,
          companyName: orgnizationRef.current.textInput,
          ipAddress: ipV4Address,
          location: `${lat} ${long}`,
          companyAlias: orgnizationRef.current.textInput.substring(
            0,
            orgnizationRef.current.textInput.indexOf(' '),
          )
            ? orgnizationRef.current.textInput.substring(
                0,
                orgnizationRef.current.textInput.indexOf(' '),
              )
            : orgnizationRef.current.textInput,
        },
      };
      Api.callApi(apiParams);
    } else {
      confirmPasswordRef.current.inputError("Password didn't match.");
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
          <Text style={styles.upper_text}>Sign up with</Text>
          <Text style={styles.lower_text}>phone number</Text>
          <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            disableScrollViewPanResponder={true}>
            <View style={styles.number_container}>
              <InputField
                ref={nameRef}
                properties={{
                  fieldType: 'name',
                }}
              />
            </View>
            <View style={styles.number_container}>
              <InputField
                ref={phoneRef}
                properties={{
                  fieldType: 'number',
                }}
              />
            </View>
            <View style={styles.number_container}>
              <InputField
                ref={orgnizationRef}
                properties={{
                  fieldType: 'orgname',
                }}
              />
            </View>
            <View style={styles.number_container}>
              <InputField
                ref={passwordRef}
                properties={{
                  fieldType: 'password',
                }}
              />
            </View>
            <View style={styles.number_container}>
              <InputField
                ref={confirmPasswordRef}
                properties={{
                  fieldType: 'confirmpassword',
                }}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <CustomButton
                text={
                  activeLoader ? (
                    <ActivityIndicator
                      size={'small'}
                      color={CssVariables.white}
                    />
                  ) : (
                    'Sign Up'
                  )
                }
                onPress={createAccount}
                properties={{
                  fieldType: 'widthlongdarkgreen',
                }}
              />
            </View>
            <View style={styles.already_acc_con}>
              <Text style={styles.already_acc_text}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.sign_in_text}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <SuccessModal
          visible={successModal}
          onRequestClose={() => setSuccessModal(false)}
          properties={{
            success: 'createAccount',
            modalFalse: setSuccessModal,
            navigation: navigation,
            message: message,
          }}
        />
      </View>
      <NetworkInfo />
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: CssVariables.light_white,
  },
  bg_image: {
    position: 'absolute',
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
    alignItems: 'center',
    width: '92%',
    paddingVertical: '4%',
    alignSelf: 'center',
    height: '95%',
  },
  po_input_container: {
    borderRadius: 10,
    backgroundColor: CssVariables.white,
    paddingHorizontal: '5%',
    alignItems: 'center',
    width: '92%',
    paddingVertical: '5%',
    alignSelf: 'center',
    height: '95%',
  },
  upper_text: {
    fontSize: 22,
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishmedium,
  },
  lower_text: {
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.gray,
    fontSize: 20,
    marginBottom: 10,
  },
  details_texts: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
  },
  number_container: {
    marginVertical: 8,
  },
  already_acc_con: {
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    width: '100%',
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
