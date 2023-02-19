import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  Animated,
  ImageBackground,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {LoginScreen, LoginScreenPhoto} from '../constants/Svg';
import InputField from '../components/Inputfield';
import {CssVariables} from '../constants/CssVariables';
import {LoginButton, RegisterButton} from '../components/CustomButton';
import {apiEndpoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import {FilePaths} from '../constants/filePath';
import {Helper} from '../classes/Helper';
import {AppLoader} from '../components/Loader';
export default function Login({navigation}) {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [numberError, setNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [focus, setFocus] = useState(false);
  const [loaderOn, setLoaderOn] = useState(false);
  const spinValue = new Animated.Value(0);

  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert('Exit App.', 'Are you sure you want to exit app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    }
  };

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
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1, 3],
    outputRange: ['0deg', '3deg', '-3deg'],
  });

  const appLogin = () => {
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

    var passwordValid = false;
    if (password.length === 0) {
      setPasswordError('Password is required.');
    } else if (password.length < 6) {
      setPasswordError('Password must be 6 characters.');
    } else {
      setPasswordError('');
      passwordValid = true;
    }
    if (numberValid && passwordValid) {
      setLoaderOn(true);
      const apiParams = {
        url: apiEndpoints.LOGIN,
        requestMethod: 'post',
        response: res => {
          console.log(
            'SsSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
            res.access_token,
          );
          Helper.handleLoginData(res, () => {
            console.log('Data Saved');
          });
          navigation.navigate('Home');
        },
        errorFunction: error => {
          console.log(error);
          setLoaderOn(false);
        },
        endFunction: () => {
          console.log('End Function Called');
          setLoaderOn(false);
        },
        input: {
          mobile: number,
          password: password,
        },
      };
      Api.callApi(apiParams);
    }
  };
  return (
    <View style={Styles.body}>
      <StatusBar backgroundColor={'#036BB9'} />
      {/* <LoginScreen /> */}
      <ImageBackground
        source={FilePaths.loginscreenbg}
        resizeMode="cover"
        style={{flex: 1}}>
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
            <LoginScreenPhoto />
          </Animated.View>
          <Text style={Styles.sign_text}>Sign In</Text>
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

          <InputField
            placeholder="Password"
            maxLength={6}
            onChangeText={value => setPassword(value)}
            value={password}
            onBlur={() => setFocus(true)}
            properties={{
              fieldType: 'password',
            }}
          />
          {password.length !== 6 && focus ? (
            <Text style={Styles.error_message}>{passwordError}</Text>
          ) : (
            false
          )}
          <TouchableOpacity
            style={Styles.forgot_password_cont}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={Styles.forgot_text}>Forgot Password</Text>
          </TouchableOpacity>
          <View style={Styles.button_con}>
            <View style={Styles.button}>
              <RegisterButton
                text="Register"
                onPress={() => navigation.navigate('Register')}
              />
            </View>
            <View style={Styles.button}>
              {loaderOn ? (
                <AppLoader />
              ) : (
                <LoginButton text="Login" onPress={appLogin} />
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
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
  forgot_password_cont: {
    width: 145,
    position: 'absolute',
    right: 0,
    bottom: 60,
    // marginTop: 10,
  },
  forgot_text: {
    color: CssVariables.forgot_password_color,
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
