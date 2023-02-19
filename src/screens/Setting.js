import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FilePaths} from '../constants/filepath';
import CustomMenu from '../components/CustomMenu';
import CustomButton from '../components/CustomButton';
import {CssVariables} from '../constants/CssVariables';
import ConfigEmployeeIdCard from '../components/ConfigEmployeeIdCard';
import ConfigOfficeTimeCard from '../components/ConfigOfficeTimeCard';
import ChangePasswordCard from '../components/ChangePasswordCard';
import {useOrientation} from '../components/useOrientation';

export default function Setting({navigation}) {
  const orientation = useOrientation();

  const [showMenu, setShowMenu] = useState(false);
  const [change, setChange] = useState(false);
  const [showConfigureEmployeeId, setShowConfigureEmployeeId] = useState(false);
  const [showConfigureOfficeTime, setShowConfigureOfficeTime] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            setShowMenu(!showMenu);
          }}>
          <Image
            source={showMenu ? FilePaths.menucrossbutton : FilePaths.menubutton}
            style={styles.right_menu_cross_icon}
          />
        </TouchableOpacity>
      ),
    });
  }, [showMenu, change]);

  const configureEmployeeId = () => {
    setChange(!change);
    setShowConfigureEmployeeId(true);
    setShowConfigureOfficeTime(false);
    setShowChangePassword(false);
  };
  const configureOfficeTime = () => {
    setChange(!change);
    setShowConfigureOfficeTime(true);
    setShowConfigureEmployeeId(false);
    setShowChangePassword(false);
  };
  const changePassword = () => {
    setChange(!change);
    setShowChangePassword(true);
    setShowConfigureEmployeeId(false);
    setShowConfigureOfficeTime(false);
  };

  return (
    <View style={styles.body}>
      <View style={styles.content_container}>
        <CustomMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          navigation={navigation}
        />
        {change ? (
          <View style={{height: '100%', backgroundColor: CssVariables.white}}>
            <ConfigEmployeeIdCard
              change={change}
              setConfigOffTime={setShowConfigureOfficeTime}
              setChange={setChange}
              setConfigEmpId={setShowConfigureEmployeeId}
              setconfigChngPass={setShowChangePassword}
              showConfigureEmployeeId={showConfigureEmployeeId}
            />

            <ConfigOfficeTimeCard
              change={change}
              setConfigOffTime={setShowConfigureOfficeTime}
              setChange={setChange}
              setConfigEmpId={setShowConfigureEmployeeId}
              setconfigChngPass={setShowChangePassword}
              showConfigureOfficeTime={showConfigureOfficeTime}
            />

            <ChangePasswordCard
              change={change}
              setConfigOffTime={setShowConfigureOfficeTime}
              setChange={setChange}
              setConfigEmpId={setShowConfigureEmployeeId}
              setconfigChngPass={setShowChangePassword}
              showChangePassword={showChangePassword}
            />
          </View>
        ) : (
          <>
            <View style={{padding: orientation === 'PORTRAIT' ? 15 : 0}}>
              <Text style={styles.upper_text}>Configuration</Text>
            </View>
            <View
              style={
                orientation === 'PORTRAIT'
                  ? styles.button_con
                  : styles.po_button_con
              }>
              <CustomButton
                onPress={configureEmployeeId}
                text="Configure Employee ID"
                properties={{
                  fieldType: 'darkgreen',
                }}
              />
              <CustomButton
                text="Configure Project"
                properties={{
                  fieldType: 'darkgreen',
                }}
              />
              <CustomButton
                onPress={configureOfficeTime}
                text="Configure Office Time"
                properties={{
                  fieldType: 'darkgreen',
                }}
              />
              <CustomButton
                onPress={changePassword}
                text="Change Password"
                properties={{
                  fieldType: 'darkgreen',
                }}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  upper_text_cont: {
    borderBottomWidth: 1,
    borderBottomColor: CssVariables.lightblack,
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  upper_text: {
    fontSize: 16,
    color: CssVariables.black,
    padding: 6,
    fontFamily: CssVariables.mulishmedium,
  },
  content_container: {
    width: '100%',
    height: '100%',
    backgroundColor: CssVariables.white,
  },
  right_menu_cross_icon: {
    width: 48,
    height: 48,
    left: 15,
  },
  left_back_icon: {
    width: 48,
    height: 48,
    left: 15,
  },
  button_con: {
    height: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: '5%',
  },
  po_button_con: {
    height: '74%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  configure_employee_id_text_con: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  configure_employee_id_text: {
    color: CssVariables.darkgray,
    fontSize: 25,
    fontFamily: CssVariables.mulishregular,
  },
  middle_Text: {
    fontSize: 14,
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
  },
  last_container: {
    height: '100%',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  employee_id_cont: {
    alignItems: 'center',
  },
  generated_id_text: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
  },
  employee_id_text: {
    color: CssVariables.red,
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    fontSize: 20,
    fontFamily: CssVariables.mulishmedium,
    padding: 10,
    margin: 5,
    borderRadius: 4,
  },
  shift_con: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  prefix_id_text: {
    borderWidth: 1,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    fontSize: 20,
    fontFamily: CssVariables.mulishmedium,
    borderRadius: 4,
    width: '100%',
    textAlign: 'center',
  },
  number_text_con: {
    borderWidth: 1,
    width: '100%',
    borderColor: CssVariables.light_gray,
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: 'center',
  },
  one_text: {
    fontSize: 20,
    fontFamily: CssVariables.mulishmedium,
  },
  save_cancle_button_con: {
    height: '45%',
    alignItems: 'center',
  },
  day_shift_circle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: CssVariables.green,
    borderWidth: 1,
  },
  office_in_out_text: {
    fontSize: 16,
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.darkgray,
  },
  input_container: {
    paddingBottom: '8%',
  },
  input_upper_text: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
  },
  scroll_view: {
    height: 530,
  },
});
