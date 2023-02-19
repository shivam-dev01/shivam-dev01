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

  static async storeIntroValue(obj, callback) {
    await AsyncStorages.storeValue('INTRO_VALUE', obj, callback);
  }

  static async getStoreValue(callback) {
    await AsyncStorages.getValue('INTRO_VALUE', data => {
      callback(data);
    });
  }

  static async handleLoginData(obj, callback) {
    await AsyncStorages.storeObject('USER_DATA', obj, callback);
  }

  static async getLoginData(callback) {
    await AsyncStorages.getObject('USER_DATA', data => {
      callback(data);
    });
  }

  static async storeCompanyId(obj, callback) {
    await AsyncStorages.storeValue('COMPANY_ID', obj, callback);
  }

  static async getCompanyId(callback) {
    await AsyncStorages.getValue('COMPANY_ID', data => {
      callback(data);
    });
  }
  static async handlePassword(obj, callback) {
    await AsyncStorages.storeValue('PASSWORD', obj, callback);
  }

  static async getPassword(callback) {
    await AsyncStorages.getValue('PASSWORD', data => {
      callback(data);
    });
  }

  static async handleNumber(obj, callback) {
    await AsyncStorages.storeValue('NUMBER', obj, callback);
  }

  static async getNumber(callback) {
    await AsyncStorages.getValue('NUMBER', data => {
      callback(data);
    });
  }

  static async handleStatus(obj, callback) {
    await AsyncStorages.storeValue('STATUS', obj, callback);
  }

  static async getStatus(callback) {
    await AsyncStorages.getValue('STATUS', data => {
      callback(data);
    });
  }

  static async removeLoginData() {
    await AsyncStorages.removeItem('USER_DATA', () => {
      console.log('--data removed--');
      this.navigationApi.navigate('Login');
    });
  }

  static async removeCompanyId() {
    await AsyncStorages.removeItem('COMPANY_ID', () => {
      console.log('--COMPANY_ID removed--');
    });
  }

  static async removeNumberData() {
    await AsyncStorages.removeItem('NUMBER', () => {
      console.log('--Number removed--');
    });
  }

  static async removePasswordData() {
    await AsyncStorages.removeItem('PASSWORD', () => {
      console.log('--Password removed--');
    });
  }

  static async removeStatus() {
    await AsyncStorages.removeItem('STATUS', () => {
      console.log('--Status removed--');
    });
  }

  static async handleImage(obj, callback) {
    await AsyncStorages.storeValue('IMAGE', obj, callback);
  }

  static async getImage(callback) {
    await AsyncStorages.getValue('IMAGE', data => {
      callback(data);
    });
  }

  static async removeImage() {
    await AsyncStorages.removeItem('IMAGE', () => {
      console.log('--image removed--');
    });
  }

  static async getUserToken() {
    return new Promise((resolve, reject) => {
      Helper.getLoginData(data => {
        // console.log('sssssssssssssssssssss', data.result.accessToken);
        if (data && data.result.accessToken) {
          resolve(data.result.accessToken);
        } else {
          resolve(null);
        }
      });
    });
  }
}
