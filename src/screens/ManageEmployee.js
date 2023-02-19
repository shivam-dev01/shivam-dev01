import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {CssVariables} from '../constants/CssVariables';
import ViewEmployeeCard from '../components/ViewEmployeeCard';
import AssignShift from '../components/AssignShift';
import CreateEmployeeCard from '../components/CreateEmployeeCard';

export default function ManageEmployee({navigation}) {
  const [currentTab, setCurrentTab] = useState('Employees');

  const headerButtons = (title, currentTab, setCurrentTab) => {
    const onTabPress = () => {
      if (title === 'Employees') return setCurrentTab(title);
      if (title === 'Shifts') return setCurrentTab(title);
      if (
        title ===
        `     Add
Employees`
      )
        return setCurrentTab(title);
    };

    return (
      <TouchableOpacity
        style={[
          styles.body_header_button,
          {
            backgroundColor:
              currentTab === title
                ? CssVariables.sky_blue
                : CssVariables.light_white,
          },
        ]}
        onPress={onTabPress}>
        <Text
          style={[
            styles.body_header_button_text,
            {
              color:
                currentTab === title
                  ? CssVariables.white
                  : CssVariables.dark_blue,
            },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.body}>
      <View style={styles.body_header}>
        {headerButtons('Employees', currentTab, setCurrentTab)}
        {headerButtons('Shifts', currentTab, setCurrentTab)}
        {headerButtons(
          `     Add
Employees`,
          currentTab,
          setCurrentTab,
        )}
      </View>
      <View style={styles.body_data}>
        {currentTab === 'Employees' && <ViewEmployeeCard />}
        {currentTab === 'Shifts' && <AssignShift />}
        {currentTab ===
          `     Add
Employees` && <CreateEmployeeCard navigation={navigation} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.white,
  },
  body_header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  body_header_button: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 3,
  },
  body_header_button_text: {
    fontSize: 13,
    fontFamily: CssVariables.mulishmedium,
  },
  body_data: {
    // borderWidth: 1,
    flex: 1,
  },
});
