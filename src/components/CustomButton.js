import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {CssVariables} from '../constants/CssVariables';
export const LoginButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
      <Text style={styles.button_text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 145,
    height: 45,
    borderRadius: 100,
    backgroundColor: CssVariables.forgot_password_color,
    justifyContent: 'center',
    margin: 5,
  },
  button_text: {
    fontSize: 18,
    color: CssVariables.white_color,
    fontFamily: 'ReadexPro-SemiBold',
    alignSelf: 'center',
  },
});

export const RegisterButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        width: 145,
        height: 45,
        borderRadius: 100,
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: CssVariables.border_color,
        margin: 5,
        backgroundColor: CssVariables.white_color,
      }}>
      <Text
        style={{
          fontSize: 18,
          color: CssVariables.border_color,
          fontFamily: 'ReadexPro-SemiBold',
          alignSelf: 'center',
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
