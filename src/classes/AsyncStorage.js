import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorages {
  static async storeValue(keyName, value, callback) {
    try {
      // const json = JSON.stringify(value);
      const result = await AsyncStorage.setItem(keyName, value);
      callback(result);
    } catch (e) {
      console.log(e);
    }
  }

  static async storeObject(keyName, obj, callback) {
    try {
      const json = JSON.stringify(obj);
      const result = await AsyncStorage.setItem(keyName, json);
      callback(result);
    } catch (e) {
      console.log(e);
    }
  }

  static async getObject(keyName, callback) {
    try {
      let result = await AsyncStorage.getItem(keyName);
      if (result) {
        result = JSON.parse(result);
      } else {
        result = null;
      }
      callback(result);
    } catch (e) {
      console.log(e);
    }
  }

  static async getValue(keyName, callback) {
    try {
      let result = await AsyncStorage.getItem(keyName);
      if (!result) {
        result = null;
      }
      callback(result);
    } catch (e) {
      console.log(e);
    }
  }

  static async removeItem(keyName, callback) {
    try {
      await AsyncStorage.removeItem(keyName);
      callback();
    } catch (e) {
      console.log(e);
    }
  }
}
