import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {CssVariables} from '../constants/CssVariables';
import {RgisteredSuccess} from '../constants/Svg';
import {LoginButton} from '../components/CustomButton';

export default function RegisteredDone({navigation}) {
  return (
    <View style={StyleSheet.body}>
      <RgisteredSuccess />
      <View style={Styles.btn_con}>
        <LoginButton
          text="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.border_color,
  },
  btn_con: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
