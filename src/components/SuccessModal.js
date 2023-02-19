import React from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {FilePaths} from '../constants/filepath';
import {CssVariables} from '../constants/CssVariables';
import CustomButton from './CustomButton';
import {useOrientation} from './useOrientation';
import {Api} from '../classes/Api';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export default function SuccessModal(props) {
  const orientation = useOrientation();

  const successField = props.properties;
  //   const [modalVisible, setModalVisible] = useState(false);

  // const successText = () => {
  //   if (successField.success === 'createdepa') {
  //     Api.handleAfterResponse(apiParams, response);
  //     return response['message'];
  //   }
  //   if (successField.success === 'createemployee') {
  //     return `The employee successfully created.`;
  //   }
  //   if (successField.success === 'createjobrole') {
  //     return `Job role created successfully.`;
  //   }
  //   if (successField.success === 'createAccount') {
  //     Api.handleAfterResponse(apiParams, response);
  //     return response['message'];
  //   }
  //   if (successField.success === 'createid') {
  //     return ` Employee id formate successfully created.`;
  //   }
  //   if (successField.success === 'vrifysuccess') {
  //     return `Employee verification is done.`;
  //   }
  //   if (successField.success === 'fogotPassword') {
  //     return ` Your Password was changed
  // successfully log in to continue.`;
  //   }
  //   if (successField.success === 'changePass') {
  //     return ` Your password was changed successfully.`;
  //   }
  //   if (successField.success === 'adminProfileUpdate') {
  //     return ` Your profile updated successfully.`;
  //   }
  //   if (successField.success === 'adminorgfill') {
  //     return ` Organization details were submitted
  //                     successfully. `;
  //   }
  //   if (successField.success === 'configofftime') {
  //     return ` Office time configured successfully.`;
  //   }
  // };

  console.log('--api---', successField.message);

  const LoginButton = () => {
    if (
      successField.success === 'createAccount' ||
      successField.success === 'fogotPassword'
    ) {
      return (
        <View style={styles.button_con}>
          <CustomButton
            text="Take me to sign in"
            onPress={() => (
              successField.navigation.navigate('Login'),
              successField.modalFalse(false)
            )}
            properties={{
              fieldType: 'widthlongdarkgreen',
            }}
          />
        </View>
      );
    }
  };
  console.log('-----oriantaion---', orientation);

  return (
    <Modal
      transparent
      visible={props.visible}
      animationType="fade"
      onRequestClose={props.onRequestClose}>
      {/* <View> */}
      <Pressable
        style={styles.modal_body}
        onPress={() => successField.modalFalse(false)}>
        <View
          style={
            orientation === 'PORTRAIT'
              ? styles.modal_mess_con
              : styles.po_modal_mess_con
          }>
          <Image
            source={FilePaths.done_icon}
            style={
              orientation === 'PORTRAIT'
                ? styles.done_icon
                : styles.po_done_icon
            }
          />
          <View style={styles.message_con}>
            <Text style={styles.success_message}>{successField.message}</Text>
          </View>
          <LoginButton />
        </View>
      </Pressable>
      {/* </View> */}
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
    width: '95%',
    height: '75%',
    elevation: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-evenly',
    backgroundColor: CssVariables.white,
    alignItems: 'center',
  },
  po_modal_mess_con: {
    width: '50%',
    height: '95%',
    elevation: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: CssVariables.white,
  },
  success_image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  done_icon_con: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  done_icon: {
    height: 194,
    width: 194,
  },
  po_done_icon: {
    height: 150,
    width: 150,
  },
  message_con: {
    width: '100%',
    alignItems: 'center',
  },
  well_done_text: {
    fontSize: 25,
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
  },
  success_message: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 15,
  },
  button_con: {
    width: '80%',
    alignItems: 'center',
  },
});
