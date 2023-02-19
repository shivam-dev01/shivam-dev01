import {View, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {CssVariables} from '../constants/CssVariables';

export const AppLoader = () => {
  return (
    //   <View style={styles.container}>
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: CssVariables.border_color,
          // zIndex: 1,
          width: 145,
          height: 46,
          borderRadius: 100,
        },
      ]}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          source={require('../../assets/images/107098-loader.json')}
          autoPlay
          loop
          style={{
            width: '85%',
            height: '85%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    </View>
    // </View>
  );
};

export const SecondLoader = () => {
  return (
    //   <View style={styles.container}>
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: CssVariables.border_color,
          zIndex: 1,
          // width: 145,
          // height: 46,
          // borderRadius: 100,
        },
      ]}>
      <View style={{}}>
        <LottieView
          source={require('../../assets/images/107550-loader.json')}
          autoPlay
          loop
          style={{
            width: '130%',
            height: '130%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    </View>
    // </View>
  );
};

export const ThirdLoader = () => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(3, 107, 185, 0.2)',
          zIndex: 1,
          // width: 145,
          // height: 46,
          // borderRadius: 100,
        },
      ]}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          source={require('../../assets/images/106169-loading-eight.json')}
          autoPlay
          loop
          style={{
            width: '50%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    </View>
  );
};
