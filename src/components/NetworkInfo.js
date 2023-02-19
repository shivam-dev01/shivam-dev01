import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';

export default function NetworkInfo() {
  useEffect(() => {
    NetInfo.addEventListener(state => {
      // console.log('--state--', state);
      setNoInternet(state.isConnected);
    });
  }, []);
  const [noInternet, setNoInternet] = useState('');
  return (
    <>
      {noInternet === false && (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: CssVariables.white,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 17,
              color: CssVariables.black,
              fontFamily: CssVariables.mulishregular,
              marginBottom: 5,
            }}>
            No internet Connection
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: CssVariables.black,
              fontFamily: CssVariables.mulishregular,
              marginBottom: 5,
            }}>
            {`Check your network it seems
    the network is unavailable.`}
          </Text>
          <Image
            source={FilePaths.nointernet}
            style={{width: '100%', height: 275}}
          />
        </View>
      )}
    </>
  );
}
