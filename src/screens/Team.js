import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {CssVariables} from '../constants/CssVariables';
import CustomButton from '../components/CustomButton';
import CustomDropDown from '../components/CustomDropDown';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import CoustomTextInput from '../components/CoustomTextInput';

export default function Team() {
  const createTeam = () => {
    const apiParams = {
      url: apiEndPoints.create_team,
      requestMethod: 'post',
      response: res => {
        console.log('--res--', res);
      },
      errorFunction: err => {
        console.log('--Error--', err);
      },
      endFunction: () => {
        console.log('End Function called');
      },
      input: {
        teamName: 'Final testing team name',
        teamLead: 'intially null',
        teamMember: ['63b92522eace095143d5adeb'],
        teamDescription: 'Final testing team description ---- ',
      },
    };
    Api.callApi(apiParams);
  };

  return (
    <View style={styles.body}>
      <View style={styles.button_con}>
        <CustomButton
          text="+ Add Teams"
          properties={{
            fieldType: 'darkgreen',
          }}
        />
      </View>
      <View>
        <Text style={styles.create_team_txt}>Create Team</Text>
        <View style={styles.input_con}>
          <CoustomTextInput
            properties={{
              fieldType: 'team',
            }}
          />
        </View>
        <View style={styles.input_con}>
          <CoustomTextInput
            properties={{
              fieldType: 'teamdesc',
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.light_white,
  },
  create_team_txt: {
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.dark_blue,
    fontSize: 17,
    alignSelf: 'center',
  },
  button_con: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  input_con: {
    marginTop: 8,
    alignSelf: 'center',
    width: '90%',
  },
});
