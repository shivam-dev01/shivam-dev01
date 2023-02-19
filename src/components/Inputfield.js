import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
//   import {UseTogglePasswordVisibility} from './UseTogglePasswordVisibility';
import {CssVariables} from '../constants/CssVariables';
import {PhoneIcon} from '../constants/Svg';
import {PasswordIcon} from '../constants/Svg';
import {FilePaths} from '../constants/filePath';
import Icon from 'react-native-vector-icons/Ionicons';

export default function InputField(props) {
  const fieldProperties = props.properties;

  // const {passwordVisibility, rightIcon, handlePasswordVisibility} =
  //   UseTogglePasswordVisibility();

  // const [number, setNumber] = useState('');
  // const [focusOut, setFocusOut] = useState(false);
  // const [passwordFocusOut, setPasswordFocusOut] = useState(false);
  // const [password, setPassword] = useState('');

  const inputField = (search, password) => {
    return (
      <View
        style={{
          width: '87%',
          height: search ? 46 : 50,
          borderWidth: search ? 2 : 1.5,
          flexDirection: 'row',
          alignSelf: 'center',
          backgroundColor: search
            ? CssVariables.white_color
            : CssVariables.white_color,
          borderRadius: 10,
          justifyContent: 'center',
          borderColor: search
            ? CssVariables.border_color
            : CssVariables.border_color,
          margin: 10,
        }}>
        <TextInput
          style={{
            width: '85%',
            height: search ? 42 : 47,
            backgroundColor: search
              ? CssVariables.white_color
              : CssVariables.white_color,
            fontSize: 14,
            fontFamily: CssVariables.readex_font,
            borderColor: CssVariables.input_border_color,
            alignSelf: 'center',
            color: search ? CssVariables.black_color : CssVariables.black_color,
            paddingLeft: search ? 18 : 0,
          }}
          placeholder={props.placeholder}
          placeholderTextColor={
            search
              ? CssVariables.light_grey_color
              : CssVariables.light_grey_color
          }
          value={props.value}
          maxLength={props.maxLength}
          onChangeText={props.onChangeText}
          onBlur={props.onBlur}
          keyboardType={
            fieldProperties && fieldProperties.fieldType === 'number'
              ? 'numeric'
              : 'default'
          }
          //   secureTextEntry={
          //     fieldProperties && fieldProperties.fieldType === 'password'
          //       ? passwordVisibility
          //       : false
          //   }
        />
        {fieldProperties.fieldType === 'number' ? <PhoneIcon /> : null}
        {fieldProperties.fieldType === 'password' ? <PasswordIcon /> : null}
        {fieldProperties.fieldType === 'amount' ? (
          <>
            <Image source={FilePaths.rupee} style={styles.rupee_image} />
            <View style={styles.text_con}>
              <TouchableOpacity>
                <Text style={styles.promo_text}>Apply Promo</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>
    );
  };
  return (
    // <View style={styles.input_body}>
    //   <TextInput
    //     style={styles.input}
    //     placeholder={props.placeholder}
    //     // placeholderTextColor="#000"
    //     value={props.value}
    //     maxLength={props.maxLength}
    //     onChangeText={props.onChangeText}
    //     onBlur={props.onBlur}
    //     keyboardType={
    //       fieldProperties && fieldProperties.fieldType === 'number'
    //         ? 'numeric'
    //         : 'default'
    //     }
    //     //   secureTextEntry={
    //     //     fieldProperties && fieldProperties.fieldType === 'password'
    //     //       ? passwordVisibility
    //     //       : false
    //     //   }
    //   />

    //   {/* {fieldProperties.fieldType === 'password' ? (
    //       <Pressable
    //         onPress={handlePasswordVisibility}
    //         style={styles.parent_showhide_icon}>
    //         <Icon name={rightIcon} style={styles.show_hide_icons} />
    //       </Pressable>
    //     ) : null} */}

    //   {fieldProperties.fieldType === 'number' ? <PhoneIcon /> : null}
    //   {fieldProperties.fieldType === 'password' ? <PasswordIcon /> : null}
    // </View>
    <View>
      {inputField(
        fieldProperties.fieldType === 'amount',
        fieldProperties.fieldType === 'password',
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  input_body: {
    width: '87%',
    height: 50,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: CssVariables.white_color,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: CssVariables.border_color,
    margin: 10,
  },
  search_icon: {
    fontSize: 30,
    position: 'absolute',
    left: 10,
    alignSelf: 'center',
    color: CssVariables.white_color,
  },

  input: {
    width: '85%',
    height: 47,
    backgroundColor: CssVariables.white_color,
    fontSize: 16,
    fontFamily: CssVariables.popins_regular,
    borderColor: CssVariables.input_border_color,
    alignSelf: 'center',
    color: CssVariables.text_color,
  },
  parent_showhide_icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 48,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: CssVariables.input_border_color,
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    opacity: 0.8,
  },
  show_hide_icons: {
    fontSize: 27,
    color: CssVariables.white_color,
  },
  rupee_image: {
    width: 17,
    height: 19,
    position: 'absolute',
    left: 10,
    alignSelf: 'center',
  },
  text_con: {
    width: 50,
    height: '100%',
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: CssVariables.border_color,
  },
  promo_text: {
    alignSelf: 'center',
    color: CssVariables.white_color,
    fontFamily: CssVariables.readex_font,
    // height:'100%',
  },
});
