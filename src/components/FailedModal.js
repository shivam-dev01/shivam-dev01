import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  Pressable,
  Button,
} from 'react-native';
import {FilePaths} from '../constants/filepath';
import {CssVariables} from '../constants/CssVariables';
import CustomButton from './CustomButton';
import {useOrientation} from './useOrientation';

export default function FailedModal(props) {
  const orientation = useOrientation();

  const successField = props.properties;

  const failedText = () => {
    if (successField.failed === 'reject') {
      return `You have rejected the profile 
 verification of the employee.`;
    }
    if (successField.failed === 'nodata') {
      return `Data not available.`;
    }
    if (successField.failed === 'wrong') {
      return `Something went wrong please 
            try after some time.`;
    }
    if (successField.failed === 'departFaliure') {
      return `Department already exists.`;
    }
    if (successField.failed === 'noconfigid') {
      return `You have not created an employee Id.
                Please create first.`;
    }
    if (successField.failed === 'existjobrole') {
      return `Job Role is already exist 
     for this department.`;
    }
    if (successField.failed === 'noconfigId') {
      return `You have not created an employee Id.
                Please create first.`;
    }
  };

  const ConfigId = () => {
    if (successField.failed === 'noconfigId') {
      return (
        <View style={styles.button_con}>
          {/* <CustomButton
            text="Configure Employee Id"
            onPress={() => (
              successField.navigation.navigate('Setting'),
              successField.modalFalse(false),
              successField.backFunction()
            )}
            properties={{
              fieldType: 'white',
            }}
          /> */}
          <Button
            title="Configure Employee Id"
            color={CssVariables.red}
            onPress={() => (
              successField.navigation.navigate('Setting'),
              successField.modalFalse(false),
              successField.backFunction()
            )}
          />
        </View>
      );
    }
  };

  return (
    <Modal
      transparent
      visible={props.visible}
      animationType="fade"
      onRequestClose={props.onRequestClose}>
      <Pressable
        style={styles.modal_body}
        onPress={() => successField.modalFalse(false)}>
        <Pressable
          style={
            orientation === 'PORTRAIT'
              ? styles.modal_mess_con
              : styles.po_modal_mess_con
          }
          onPress={() => successField.modalFalse(true)}>
          <Image
            source={
              orientation === 'PORTRAIT'
                ? FilePaths.failed
                : FilePaths.potraitfailed
            }
            style={styles.failed_image}
          />
          <Pressable
            onPress={() => successField.modalFalse(false)}
            style={styles.cancle_icon_con}>
            <Image source={FilePaths.cancleicon} style={styles.cancle_icon} />
          </Pressable>
          <View style={styles.message_con}>
            <Text style={styles.well_done_text}>Oh Snap!</Text>
            <Text style={styles.success_message}>{failedText()}</Text>
          </View>
          {/* <View style={styles.button_con}>
            <CustomButton
              text="Login"
              onPress={() => (
                navigation.navigate('Login'), setModalVisible(false)
              )}
              properties={{
                fieldType: 'widthlongdarkgreen',
              }}
            />
          </View> */}
          <ConfigId />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal_body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CssVariables.lightblack,
  },
  modal_mess_con: {
    width: '80%',
    height: '50%',
    elevation: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  po_modal_mess_con: {
    width: '50%',
    height: '95%',
    elevation: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  failed_image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cancle_icon_con: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  cancle_icon: {
    height: 30,
    width: 30,
  },
  message_con: {
    width: '100%',
    alignItems: 'center',
    height: 100,
    justifyContent: 'flex-end',
  },
  well_done_text: {
    fontSize: 25,
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
  },
  success_message: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
  },
  button_con: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
});
