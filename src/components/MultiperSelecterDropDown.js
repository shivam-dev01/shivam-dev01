import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import {useOrientation} from './useOrientation';

const MultipleSelecterDropDown = ({label, data, setWeekData}) => {
  const orientation = useOrientation();
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const DropdownButton = useRef();

  const renderCheckBox = () => {
    return data.map((item, key) => {
      return (
        <TouchableOpacity
          style={styles.item}
          key={key}
          onPress={() => onChecked(key, item)}
          activeOpacity={1}>
          {item.checked === true ? (
            <Image source={FilePaths.checkboxes} style={styles.check_box} />
          ) : (
            <View style={styles.check_box} />
          )}
          <Text style={styles.lable_text}>{item.value}</Text>
        </TouchableOpacity>
      );
    });
  };

  const onChecked = key => {
    let weeks = data;
    let index = weeks.findIndex(x => x.id === key);
    weeks[index].checked = !weeks[index].checked;
    setWeekData({data: weeks});
  };

  const renderDropdown = () => {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setVisible(false);
        }}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
          activeOpacity={1}>
          <View
            style={[
              orientation === 'PORTRAIT' ? styles.dropdown : styles.po_dropdown,
              {top: dropdownTop},
            ]}>
            <ScrollView disableScrollViewPanResponder={true}>
              {renderCheckBox()}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
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
    <>
      <TouchableOpacity
        ref={DropdownButton}
        style={styles.button}
        onPress={toggleDropdown}>
        {renderDropdown()}
        <Text style={styles.buttonText}>{label}</Text>
        <Image
          source={FilePaths.dropdownicon}
          style={{
            width: 15,
            height: 8,
            transform: [{rotate: visible ? '180deg' : '0deg'}],
          }}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: CssVariables.light_white,
    height: 50,
    backgroundColor: CssVariables.light_white,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    position: 'relative',
    width: '100%',
  },

  buttonText: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
  },
  overlay: {
    height: '100%',
  },
  dropdown: {
    backgroundColor: CssVariables.white,
    width: '75%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    alignSelf: 'center',
    height: '40%',
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 25,
    paddingVertical: 15,
  },
  po_dropdown: {
    backgroundColor: CssVariables.white,
    width: '50%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    alignSelf: 'center',
    height: '40%',
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 25,
    paddingVertical: 15,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: CssVariables.white,
    marginVertical: 3,
    borderColor: CssVariables.black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lable_text: {
    color: CssVariables.darkgray,
    fontSize: 15,
    fontFamily: CssVariables.mulishregular,
    marginLeft: 5,
  },
  check_box: {
    borderColor: CssVariables.light_gray,
    width: 17,
    height: 17,
    borderRadius: 2,
    borderWidth: 1,
    marginHorizontal: 5,
  },
});

export default MultipleSelecterDropDown;
