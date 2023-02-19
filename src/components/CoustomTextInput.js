import {TextInput, View, Text, Pressable, Image} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';

const InputField = (props, ref) => {
  const fieldProperties = props.properties;
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState(FilePaths.eyeslash);
  const [date, setDate] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const input_container = {
    // borderBottomWidth:
    //   fieldProperties.fieldType === 'password' ||
    //   fieldProperties.fieldType === 'oldpassword' ||
    //   fieldProperties.fieldType === 'newpassword' ||
    //   fieldProperties.fieldType === 'confirmpassword'
    //     ? 1
    //     : null,
    // borderWidth: 1,

    // borderColor: error ? CssVariables.red : CssVariables.light_gray,
    flexBasis: fieldProperties.fieldType === 'rejectdes' ? 90 : 50,
    height:
      fieldProperties.fieldType === 'paddress' ||
      fieldProperties.fieldType === 'orgadd' ||
      fieldProperties.fieldType === 'rejectdes'
        ? 120
        : 50,
    flexDirection: 'row',
    flexShrink: 1,
    borderRadius: 25,
    backgroundColor: CssVariables.drop_down_bg,
  };
  const input = {
    width: '100%',
    paddingLeft: fieldProperties.fieldType === 'search' ? 40 : 42,
    borderRadius: 25,
    flexShrink: 1,
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 15,
  };
  const error_text = {
    top: 5,
    left: 25,
    color: CssVariables.red,
    fontFamily: CssVariables.mulishregular,
  };
  const secure_entry_text_button = {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const search_icon = {
    position: 'absolute',
    width: 25,
    height: 25,
    alignSelf: 'center',
    left: 5,
  };
  const filter_icon = {
    position: 'absolute',
    width: 22,
    height: 13,
    alignSelf: 'center',
    right: 10,
  };
  const dob_icon = {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const placeholder = () => {
    if (fieldProperties.fieldType === 'number') {
      return 'Enter your mobile number.';
    } else if (fieldProperties.fieldType === 'password') {
      return 'Enter your password.';
    } else if (fieldProperties.fieldType === 'registerednumber') {
      return 'Enter your registered number.';
    } else if (fieldProperties.fieldType === 'oldpassword') {
      return 'Enter your old password.';
    } else if (fieldProperties.fieldType === 'newpassword') {
      return 'Enter your new password.';
    } else if (fieldProperties.fieldType === 'confirmpassword') {
      return 'Confirm new password.';
    } else if (fieldProperties.fieldType === 'name') {
      return 'Enter your full name';
    } else if (fieldProperties.fieldType === 'dob') {
      return 'Enter your date of birth(DD/MM/YY)';
    } else if (fieldProperties.fieldType === 'emailid') {
      return 'Enter your email';
    } else if (fieldProperties.fieldType === 'adhnumber') {
      return 'Enter your aadhaar number';
    } else if (fieldProperties.fieldType === 'pnnumber') {
      return 'Enter your pan number (Optional) ';
    } else if (fieldProperties.fieldType === 'paddress') {
      return 'Enter your address';
    } else if (fieldProperties.fieldType === 'orgname') {
      return "Enter your organization's name";
    } else if (fieldProperties.fieldType === 'designation') {
      return 'Select your designation';
    } else if (fieldProperties.fieldType === 'orgtype') {
      return 'Enter organization type';
    } else if (fieldProperties.fieldType === 'officialnum') {
      return 'Enter your official Phone number';
    } else if (fieldProperties.fieldType === 'busswbsite') {
      return 'Enter your business website (Optional)';
    } else if (fieldProperties.fieldType === 'bussemail') {
      return "Enter your organization's email";
    } else if (fieldProperties.fieldType === 'busspan') {
      return 'Enter your business PAN number (Optional)';
    } else if (fieldProperties.fieldType === 'gstinnum') {
      return 'Enter your gstin number';
    } else if (fieldProperties.fieldType === 'orgadd') {
      return 'Enter organization address';
    } else if (fieldProperties.fieldType === 'search') {
      return 'Search';
    } else if (fieldProperties.fieldType === 'employee_name') {
      return 'Employee name';
    } else if (fieldProperties.fieldType === 'employee_number') {
      return "Employee's mobile number";
    } else if (fieldProperties.fieldType === 'employee_emailid') {
      return 'Employee email Id';
    } else if (fieldProperties.fieldType === 'employee_adhnumber') {
      return 'Enter documents number';
    } else if (fieldProperties.fieldType === 'createdepart') {
      return 'Enter department name';
    } else if (fieldProperties.fieldType === 'createjobrole') {
      return 'Enter job role';
    } else if (fieldProperties.fieldType === 'rejectdes') {
      return `Describe the reason for rejection`;
    } else if (fieldProperties.fieldType === 'otherdoc') {
      return `Enter document type`;
    } else if (fieldProperties.fieldType === 'team') {
      return `Enter team name`;
    } else if (fieldProperties.fieldType === 'teamdesc') {
      return `Enter description`;
    }
  };

  const maxlength = () => {
    if (fieldProperties.fieldType === 'number') {
      return 10;
    } else if (fieldProperties.fieldType === 'password') {
      return 15;
    } else if (fieldProperties.fieldType === 'registerednumber') {
      return 10;
    } else if (fieldProperties.fieldType === 'oldpassword') {
      return 15;
    } else if (fieldProperties.fieldType === 'newpassword') {
      return 15;
    } else if (fieldProperties.fieldType === 'confiempassword') {
      return 15;
    } else if (fieldProperties.fieldType === 'adhnumber') {
      return 12;
    } else if (fieldProperties.fieldType === 'pnnumber') {
      return 10;
    } else if (fieldProperties.fieldType === 'officialnum') {
      return 10;
    } else if (fieldProperties.fieldType === 'busspan') {
      return 10;
    } else if (fieldProperties.fieldType === 'employee_number') {
      return 10;
    } else if (fieldProperties.fieldType === 'employee_adhnumber') {
      return 12;
    }
  };

  const keyboardType = () => {
    if (fieldProperties.fieldType === 'number') {
      return 'numeric';
    } else if (fieldProperties.fieldType === 'password') {
      return 'default';
    } else if (fieldProperties.fieldType === 'registerednumber') {
      return 'numeric';
    } else if (fieldProperties.fieldType === 'dob') {
      return 'numeric';
    } else if (fieldProperties.fieldType === 'adhnumber') {
      return 'numeric';
    } else if (fieldProperties.fieldType === 'officialnum') {
      return 'numeric';
    } else if (fieldProperties.fieldType === 'employee_number') {
      return 'numeric';
    } else if (fieldProperties.fieldType === 'employee_adhnumber') {
      return 'numeric';
    } else if (fieldProperties.fieldType === 'emailid') {
      return 'email-address';
    } else if (fieldProperties.fieldType === 'bussemail') {
      return 'email-address';
    } else if (fieldProperties.fieldType === 'employee_emailid') {
      return 'email-address';
    }
  };

  const inputError = value => {
    // console.log('--value---', value);

    if (fieldProperties.fieldType === 'number') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 10) {
        setError('The number should be 10 digits.');
      } else if (value) {
        setError(value);
      } else {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'password') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 6) {
        setError('The password should be 6 digits.');
      } else if (value) {
        setError(value);
      } else if (textInput.length >= 6) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'registerednumber') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 10) {
        setError('The number should be 10 digits.');
      } else if (value) {
        setError(value);
      } else {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'oldpassword') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 6) {
        setError('The password should be 6 digits.');
      } else if (textInput.length >= 6) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'newpassword') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 6) {
        setError('The password should be 6 digits.');
      } else if (textInput.length >= 6) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'confirmpassword') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 6) {
        setError('The password should be 6 digits.');
      } else if (value) {
        setError(value);
      } else if (textInput.length >= 6) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'name') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 3) {
        setError('The name should be 3 digits.');
      } else if (textInput.length >= 3) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'dob') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 4) {
        setError('Date of birth should be 4 digits.');
      } else if (textInput.length >= 4) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'emailid') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 6) {
        setError('Please enter a valid email Id.');
      } else if (textInput.length >= 6) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'adhnumber') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 12) {
        setError('Please enter a valid aadhaar number.');
      } else if (textInput.length === 12) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'paddress') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 5) {
        setError('Please enter a valid address.');
      } else if (textInput.length >= 5) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'orgname') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 4) {
        setError('The organization name should be 4 digits.');
      } else if (value) {
        setError(value);
        // console.log('--ifvalue---', value);
      } else if (textInput.length >= 4) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'orgtype') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 2) {
        setError('The organization name should be 2 digits.');
      } else if (textInput.length >= 2) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'designation') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 2) {
        setError('The designation should be 2 digits.');
      } else if (textInput.length >= 2) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'officialnum') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 10) {
        setError('The number should be 10 digits.');
      } else {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'bussemail') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 6) {
        setError('Please enter a valid email Id.');
      } else if (textInput.length >= 6) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'gstinnum') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 10) {
        setError('Please enter a valid GSTIN Number.');
      } else if (textInput.length === 10) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'orgadd') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 5) {
        setError('Please enter a valid address.');
      } else if (textInput.length >= 5) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'employee_name') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 3) {
        setError('The name should be 3 digits.');
      } else if (textInput.length >= 3) {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'employee_number') {
      var registerednumberValid = false;
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 10) {
        setError('The number should be 10 digits.');
      } else if (value) {
        setError(value);
      } else {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'employee_emailid') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (textInput.length < 6) {
        setError('Please enter a valid email Id.');
      } else if (value) {
        setError(value);
      } else if (textInput.length >= 6) {
        setError('');
      }
    }
    // if (fieldProperties.fieldType === 'employee_adhnumber') {
    //   if (textInput.length === 0) {
    //     setError('This field is required.');
    //   } else if (textInput.length < 12) {
    //     setError('Please enter a valid aadhaar number.');
    //   } else if (value) {
    //     setError(value);
    //   } else if (textInput.length === 12) {
    //     setError('');
    //   }
    // }
    if (fieldProperties.fieldType === 'createdepart') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (value) {
        setError(value);
      } else {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'createjobrole') {
      if (textInput.length === 0) {
        setError('This field is required.');
      } else if (value) {
        setError(value);
      } else {
        setError('');
      }
    }
    if (fieldProperties.fieldType === 'rejectdes') {
      if (textInput.length === 0) {
        setError('This field is required.');
      }
    }
    if (fieldProperties.fieldType === 'team') {
      if (textInput.length === 0) {
        setError('This field is required.');
      }
    }
    if (fieldProperties.fieldType === 'teamdesc') {
      if (textInput.length === 0) {
        setError('This field is required.');
      }
    }
  };
  useImperativeHandle(ref, () => ({
    inputError,
    textInput,
    setTextInput,
    date,
    onChange,
  }));

  const handlePasswordVisibility = () => {
    if (rightIcon === FilePaths.eyeslash) {
      setRightIcon(FilePaths.eye);
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === FilePaths.eye) {
      setRightIcon(FilePaths.eyeslash);
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const value = () => {
    if (fieldProperties.fieldType === 'number') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'password') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'name') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'dob') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'orgname') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'emailid') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'adhnumber') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'paddress') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'pnnumber') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'designation') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'orgtype') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'officialnum') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'busswbsite') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'bussemail') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'busspan') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'gstinnum') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'orgadd') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'employee_name') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'employee_number') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'employee_emailid') {
      return textInput;
    }
    if (fieldProperties.fieldType === 'employee_adhnumber') {
      return textInput;
    }
  };

  const autoFocus = () => {
    if (fieldProperties.fieldType === 'otherdoc') {
      return true;
    }
  };

  const multiLine = () => {
    if (fieldProperties.fieldType === 'officialnum') {
      return true;
    }
    if (fieldProperties.fieldType === 'paddress') {
      return true;
    }
    if (fieldProperties.fieldType === 'rejectdes') {
      return true;
    }
    if (fieldProperties.fieldType === 'teamdesc') {
      return true;
    }
  };

  const onChange = (event, selectedTime) => {
    // console.log('=--event--', event);
    if (fieldProperties.fieldType === 'dob') {
      const currentDate = selectedTime;
      setShow(false);
      setDate(currentDate);
      setTextInput(moment(currentDate).format('D/M/Y'));
    }
  };

  const showMode = currentMode => {
    setShow(false);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
    setShow(true);
  };

  const Icon = () => {
    if (fieldProperties.fieldType === 'number') {
      return FilePaths.Icon_phone;
    }
    if (fieldProperties.fieldType === 'password') {
      return FilePaths.Icon_lock;
    }
    if (fieldProperties.fieldType === 'confirmpassword') {
      return FilePaths.Icon_lock;
    }
    if (fieldProperties.fieldType === 'name') {
      return FilePaths.Icon_user;
    }
    if (fieldProperties.fieldType === 'orgname') {
      return FilePaths.companyid;
    }
    if (fieldProperties.fieldType === 'registerednumber') {
      return FilePaths.Icon_phone;
    }
  };

  return (
    <>
      <View style={input_container}>
        <TextInput
          placeholder={placeholder()}
          editable={fieldProperties.editable ? false : true}
          placeholderTextColor={CssVariables.gray}
          onChangeText={value => {
            setTextInput(value) || setError();
          }}
          style={input}
          maxLength={maxlength()}
          keyboardType={keyboardType()}
          onBlur={() => inputError()}
          value={value()}
          autoFocus={autoFocus()}
          multiline={multiLine()}
          secureTextEntry={
            fieldProperties.fieldType === 'password' ||
            fieldProperties.fieldType === 'oldpassword' ||
            fieldProperties.fieldType === 'newpassword' ||
            fieldProperties.fieldType === 'confirmpassword'
              ? passwordVisibility
              : false
          }
        />
        {fieldProperties.fieldType === 'password' ||
        fieldProperties.fieldType === 'oldpassword' ||
        fieldProperties.fieldType === 'newpassword' ||
        fieldProperties.fieldType === 'confirmpassword' ? (
          <Pressable
            style={secure_entry_text_button}
            onPress={handlePasswordVisibility}>
            <Image
              source={rightIcon}
              resizeMode="cover"
              style={{width: 28, height: 21.3}}
            />
          </Pressable>
        ) : null}
        {fieldProperties.fieldType === 'search' ? (
          <>
            <Image source={FilePaths.search} style={search_icon} />
            <Image source={FilePaths.fillter} style={filter_icon} />
          </>
        ) : null}
        {fieldProperties.fieldType === 'dob' ? (
          <Pressable
            style={dob_icon}
            onPress={() => showDatePicker()}
            disabled={fieldProperties.editable ? true : false}>
            <Image source={FilePaths.dob} style={{width: 25, height: 25}} />
          </Pressable>
        ) : null}
        <Image
          source={Icon()}
          style={{
            position: 'absolute',
            left: 13,
            alignSelf: 'center',
            width: 18,
            height: 19,
          }}
        />
      </View>
      <Text style={error_text}>{error}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          dayOfWeekFormat={'{dayofweek.abbreviated(2)}'}
        />
      )}
    </>
  );
};

export default forwardRef(InputField);
