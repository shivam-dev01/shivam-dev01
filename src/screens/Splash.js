import {View, Image, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {FilePaths} from '../constants/filepath';
import {Helper} from '../classes/Helper';
import {useOrientation} from '../components/useOrientation';

export default function Splash({navigation}) {
  const orientation = useOrientation();
  useEffect(() => {
    Helper.getStoreValue(data => {
      if (data !== null) {
        Helper.getLoginData(data => {
          if (data !== null) {
            setTimeout(() => {
              navigation.replace('BottomTab');
            }, 3000);
          } else {
            setTimeout(() => {
              navigation.replace('Login');
            }, 3000);
          }
        });
      } else {
        setTimeout(() => {
          navigation.replace('IntroductionPage');
        }, 3000);
      }
    });
    Helper.setNavigationApi(navigation);
  }, []);
  return (
    <View style={styles.body}>
      <Image
        source={
          orientation === 'PORTRAIT'
            ? FilePaths.splashbackground
            : FilePaths.splashpotrait
        }
        resizeMode={'cover'}
        style={styles.background_image}
      />
      <View style={styles.image_container}>
        <Image source={FilePaths.netclacklogo} style={styles.image_iogo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background_image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image_container: {
    width: 200,
    height: 35,
  },
  image_iogo: {
    width: '100%',
    height: '100%',
  },
});
