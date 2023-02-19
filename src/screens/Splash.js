import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import {SplashScreen} from '../constants/Svg';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filePath';
import {Helper} from '../classes/Helper';
export default function Splash({navigation}) {
  useEffect(() => {
    // Helper.getLoginData(data => {
    //   if (data !== null) {
    //     navigation.navigate('Home');
    //   } else if (data === null) {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    // }
    // });
  }, []);

  return (
    <View style={Styles.body}>
      <StatusBar backgroundColor={'#036BB9'} />
      <Image source={FilePaths.ninepay} style={{width: 92, height: 127}} />
    </View>
  );
}

const Styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CssVariables.border_color,
  },
  text: {
    fontSize: 20,
    color: CssVariables.white_color,
    fontFamily: CssVariables.readex_font,
  },
});
