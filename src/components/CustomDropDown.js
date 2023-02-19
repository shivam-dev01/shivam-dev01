import React, {FC, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import {useOrientation} from './useOrientation';

const CustomDropDown = ({label, onSelect, data, noData, getJobRole}) => {
  const orientation = useOrientation();
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [selected, setSelected] = useState(undefined);
  const DropdownButton = useRef();

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
          <Pressable
            style={[
              orientation === 'PORTRAIT' ? styles.dropdown : styles.po_dropdown,
              {top: dropdownTop},
            ]}
            onPress={() => setVisible(true)}>
            <FlatList
              data={data && data.length ? data : noData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </Pressable>
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

  const renderItem = ({item, index}) => {
    return (
      <>
        {item && item.error ? (
          <Text style={styles.no_data_text}>{item.error}</Text>
        ) : (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onItemPress(item)}>
            <Text style={styles.lable_text}>
              {item.department ||
                item.jobRole ||
                item.doc ||
                item.month ||
                item.year ||
                item.reportType}
            </Text>
          </TouchableOpacity>
        )}
      </>
    );
  };
  const onItemPress = item => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
    if (item && item.department) {
      setTimeout(() => {
        getJobRole(item._id);
      }, 2000);
    } else {
      return null;
    }
  };

  return (
    <>
      <TouchableOpacity
        ref={DropdownButton}
        style={styles.button}
        onPress={toggleDropdown}>
        {renderDropdown()}
        <Text
          style={[
            styles.buttonText,
            {color: selected ? CssVariables.dark_blue : CssVariables.gray},
          ]}>
          {selected
            ? selected.department ||
              selected.jobRole ||
              selected.doc ||
              selected.month ||
              selected.year ||
              selected.reportType
            : label}
        </Text>
        <Image
          source={FilePaths.dropdownicon}
          style={{
            width: 15,
            height: 8,
            marginLeft: 8,
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
    height: 50,
    backgroundColor: CssVariables.drop_down_bg,
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
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: CssVariables.white,
    marginVertical: 2,
    borderColor: CssVariables.light_gray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    borderColor: CssVariables.light_gray,
  },
  lable_text: {
    color: CssVariables.darkgray,
    fontSize: 15,
    fontFamily: CssVariables.mulishregular,
    marginLeft: 5,
  },
  no_data_text: {
    alignSelf: 'center',
    textAlign: 'center',
    color: CssVariables.lightblack,
    fontFamily: CssVariables.mulishregular,
    fontSize: 16,
  },
});

export default CustomDropDown;
