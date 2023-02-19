import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import {Api} from '../classes/Api';
import {apiEndPoints} from '../constants/apiEndPoints';
import {useOrientation} from './useOrientation';
import {Helper} from '../classes/Helper';

export default function ShiftCard({item, getEmployee}) {
  const orientation = useOrientation();
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [activeLoader, setActiveLoader] = useState({
    fourthLoader: false,
    fifthLoader: false,
  });
  const DropdownButton = useRef();

  const assignShiftEmployee = (id, dayType) => {
    // console.log('--id--', id);
    // console.log('--type--', dayType);
    if (dayType === 'Day') {
      setActiveLoader({fourthLoader: true});
    } else if (dayType === 'Night') {
      setActiveLoader({fifthLoader: true});
    }
    const apiParams = {
      url: `${apiEndPoints.assign_shift}/${id}`,
      requestMethod: 'put',
      response: res => {
        console.log('--res--', res);
        setActiveLoader({fourthLoader: false});
        setActiveLoader({fifthLoader: false});
        if (res.status === 200) {
          getEmployee();
          Helper.showToastMessage('Shift assigned successfully.');
        }
      },
      errorFnction: error => {
        // console.log('--error--', error);
        if (error === undefined) {
          setActiveLoader({fourthLoader: false});
          setActiveLoader({fifthLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({fourthLoader: false});
          setActiveLoader({fifthLoader: false});
        }
      },
      endFunction: () => {
        setActiveLoader({fourthLoader: false});
        setActiveLoader({fifthLoader: false});
        // console.log('End Function Called');
      },
      input: {
        assignShift: dayType === 'Day' ? 'DAY-SHIFT' : 'NIGHT-SHIFT',
      },
    };
    Api.callApi(apiParams);
  };
  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      // console.log('--py--', _fx, _fy, _w, h, _px, py);
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  return (
    <View style={styles.renderItem_texts_con}>
      <View style={styles.shift_con}>
        <View style={styles.shift_details_con}>
          <Text style={styles.shift_txt}>
            {item.assignedShift === 'NIGHT-SHIFT' ? 'Night' : 'Day'}
          </Text>
        </View>
      </View>
      <View style={styles.details_con}>
        <Text style={styles.full_name}>{item.fullName}</Text>
        <Text style={styles.matched_style_txt}>{item.employeeId}</Text>
        <Text style={styles.matched_style_txt}>{item.department}</Text>
        <Text style={styles.matched_style_txt}>{item.jobRole}</Text>
        <Pressable
          style={styles.assig_shift_con}
          onPress={toggleDropdown}
          ref={DropdownButton}>
          <Image
            source={
              item.assignedShift === 'NIGHT-SHIFT'
                ? FilePaths.nightshift
                : FilePaths.dayshift
            }
            style={{
              width: 22,
              height: 22,
            }}
          />
          <Text style={styles.assig_shift_txt}>
            {item.assignedShift === 'NIGHT-SHIFT' ? 'Night' : 'Day'}
          </Text>
          <Image
            source={FilePaths.dropdownicon}
            style={{
              width: 15,
              height: 8,
              transform: [
                {
                  rotate: visible ? '180deg' : '0deg',
                },
              ],
            }}
          />
        </Pressable>
      </View>
      {/* <View style={styles.full_name}>
        <Text
          style={{
            color: CssVariables.black,
            fontFamily: CssVariables.mulishmedium,
          }}>
          {item.fullName}
        </Text>
      </View>
      <View style={styles.full_name}>
        <Text
          style={{
            color: CssVariables.black,
            fontFamily: CssVariables.mulishregular,
          }}>
          {item.employeeId}
        </Text>
      </View>
      <View style={styles.day_night_con}>
        <View style={styles.day_night_cont_cont}>
          <TouchableOpacity
            onPress={() => assignShiftEmployee(item._id, 'Day')}
            style={styles.day_button}>
            <Text style={styles.date_text}>Day</Text>
            {activeLoader.fourthLoader ? (
              <ActivityIndicator
                color={CssVariables.light_gray}
                size={'small'}
              />
            ) : (
              <Image
                source={FilePaths.dayshift}
                style={{width: 19, height: 19}}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => assignShiftEmployee(item._id, 'Night')}
            style={styles.night_button}
            activeOpacity={0.5}>
            <Text style={styles.date_text}>Night</Text>
            {activeLoader.fifthLoader ? (
              <ActivityIndicator color={CssVariables.white} size={'small'} />
            ) : (
              <Image
                source={FilePaths.nightshift}
                style={{width: 17, height: 19}}
              />
            )}
          </TouchableOpacity>
        </View>
      </View> */}
      <Modal
        visible={visible}
        animationType={'fade'}
        transparent
        onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.modal_con} onPress={() => setVisible(false)}>
          <Pressable
            style={[styles.modal_data_Con, {top: dropdownTop}]}
            onPress={() => setVisible(true)}>
            <TouchableOpacity
              style={styles.day_night_shift_btn}
              onPress={() => assignShiftEmployee(item._id, 'Day')}>
              {activeLoader.fourthLoader ? (
                <ActivityIndicator
                  size={'small'}
                  color={CssVariables.sky_blue}
                />
              ) : (
                <Image
                  source={FilePaths.dayshift}
                  style={{width: 22, height: 22}}
                />
              )}
              <Text>Day shift</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.day_night_shift_btn}
              onPress={() => assignShiftEmployee(item._id, 'Night')}>
              {activeLoader.fifthLoader ? (
                <ActivityIndicator
                  size={'small'}
                  color={CssVariables.sky_blue}
                />
              ) : (
                <Image
                  source={FilePaths.nightshift}
                  style={{width: 22, height: 22}}
                />
              )}
              <Text>Night shift</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  renderItem_texts_con: {
    flexDirection: 'row',
    paddingVertical: 5,
    width: '97%',
    alignSelf: 'center',
    marginBottom: 5,
    backgroundColor: CssVariables.white,
    elevation: 2,
    borderRadius: 5,
  },
  shift_con: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shift_details_con: {
    height: 70,
    width: 70,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CssVariables.light_blue_white,
  },
  shift_txt: {
    color: CssVariables.sky_blue,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 14,
  },
  details_con: {
    flex: 2,
    justifyContent: 'space-evenly',
  },
  full_name: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 14,
    color: CssVariables.dark_blue,
  },
  matched_style_txt: {
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.gray,
    fontSize: 13,
  },
  assig_shift_con: {
    borderWidth: 1,
    flexDirection: 'row',
    width: 100,
    paddingVertical: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: CssVariables.light_gray,
    borderRadius: 3,
  },
  assig_shift_txt: {
    fontSize: 13,
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.dark_blue,
    marginLeft: 4,
  },
  modal_con: {
    flex: 1,
    backgroundColor: CssVariables.lightblack,
    alignItems: 'center',
  },
  modal_data_Con: {
    backgroundColor: CssVariables.white,
    borderRadius: 4,
  },
  day_night_shift_btn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 4,
    borderColor: CssVariables.light_gray,
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  day_night_con: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  day_night_cont_cont: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    borderRadius: 5,
    overflow: 'hidden',
  },
  day_button: {
    width: '50%',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: CssVariables.light_yellow,
  },
  night_button: {
    width: '50%',
    height: 38,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CssVariables.lightblack,
  },
  date_text: {
    color: CssVariables.department_red,
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
    marginLeft: 5,
  },
});
