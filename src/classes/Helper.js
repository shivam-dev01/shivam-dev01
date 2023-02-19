import {ToastAndroid} from 'react-native';
import {AsyncStorages} from './AsyncStorage';
export class Helper {
  navigationApi = null;

  static setNavigationApi(navigationApi) {
    this.navigationApi = navigationApi;
  }

  static showToastMessage(message) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }
  static async handleLoginData(obj, callback) {
    await AsyncStorages.storeObject('USER_DATA', obj, callback);
  }

  static async getLoginData(callback) {
    await AsyncStorages.getObject('USER_DATA', data => {
      callback(data);
    });
  }
  static async removeLoginData() {
    await AsyncStorages.removeItem('USER_DATA', () => {
      console.log('.,.,..,..,Remove Item,.,..,,,', this.navigationApi);
      this.navigationApi.navigate('Login');
    });
  }

  static async handleProfileData(obj, callback) {
    await AsyncStorages.storeObject('USER PROFILE', obj, callback);
  }

  static async getImageData(callback) {
    await AsyncStorages.getObject('USER PROFILE', data => {
      callback(data);
    });
  }

  static async getUserToken() {
    return new Promise((resolve, reject) => {
      Helper.getLoginData(data => {
        if (data && data.access_token) {
          resolve(data.access_token);
        } else {
          resolve(null);
        }
      });
    });
  }
}
