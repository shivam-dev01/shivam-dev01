import {TouchableOpacity, StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import LinearGradient from 'react-native-linear-gradient';
export default function CustomButton(props) {
  const fieldProperties = props.properties;

  const styles = StyleSheet.create({
    button: {
      justifyContent:
        fieldProperties.manageEmployee === 'createemployees' ? null : 'center',
      alignItems: 'center',
      flexBasis:
        fieldProperties.manageEmployee === 'createemployees' ? '30%' : 50,
      height: fieldProperties.manageEmployee === 'createemployees' ? 100 : 50,
      flexShrink: 1,
      borderWidth:
        fieldProperties.fieldType === 'dotted' ||
        fieldProperties.fieldType === 'white'
          ? 1
          : null,
      width: '100%',
      backgroundColor:
        fieldProperties.fieldType === 'darkgreen' ||
        fieldProperties.fieldType === 'widthlongdarkgreen' ||
        fieldProperties.manageEmployee === 'createemployees'
          ? CssVariables.sky_blue
          : CssVariables.white,
      borderRadius: 25,
      flexDirection: 'row',
      borderStyle: fieldProperties.fieldType === 'dotted' ? 'dashed' : null,
      // elevation: 10,
      borderColor:
        fieldProperties.fieldType === 'white' ? CssVariables.red_meduim : null,
      marginTop: fieldProperties.fieldType === 'white' ? 10 : 0,
    },

    text: {
      fontSize: 16,
      fontFamily: CssVariables.mulishmedium,
    },
    // buttonGrad: {
    //   height: '100%',
    //   width: '100%',
    //   borderRadius: 5,
    //   position: 'absolute',
    //   alignItems: 'center',
    //   width: '100%',
    //   height: '100%',
    //   display: 'flex',
    //   flexDirection: 'row',
    //   overflow: 'hidden',
    // },
  });

  const btnTxtColor = () => {
    if (
      fieldProperties.fieldType === 'darkgreen' ||
      fieldProperties.fieldType === 'widthlongdarkgreen' ||
      fieldProperties.manageEmployee === 'createemployees'
    ) {
      return CssVariables.white;
    } else if (fieldProperties.fieldType === 'white') {
      return CssVariables.red_meduim;
    } else {
      return CssVariables.sky_blue;
    }
  };

  const imageType = () => {
    if (fieldProperties.imageType === 'createemployees') {
      return FilePaths.createemployee;
    } else if (fieldProperties.imageType === 'createteam') {
      return FilePaths.createteam;
    } else if (fieldProperties.imageType === 'selectdepa') {
      return FilePaths.selectdepartment;
    } else if (fieldProperties.imageType === 'viewemployees') {
      return FilePaths.viewemployees;
    } else if (fieldProperties.imageType === 'jobrole') {
      return FilePaths.createjobrole;
    } else if (fieldProperties.imageType === 'viewteam') {
      return FilePaths.viewteam;
    } else if (fieldProperties.imageType === 'assign') {
      return FilePaths.assign;
    } else if (fieldProperties.imageType === 'attendreport') {
      return FilePaths.attendancerprt;
    } else if (fieldProperties.imageType === 'assignshift') {
      return FilePaths.assignshift;
    } else if (fieldProperties.imageType === 'downloadimage') {
      return FilePaths.download;
    } else if (fieldProperties.imageType === 'createholiday') {
      return FilePaths.createHoliday;
    } else if (fieldProperties.imageType === 'holidaylist') {
      return FilePaths.holidaylist;
    } else if (fieldProperties.imageType === 'leaveapplication') {
      return FilePaths.leaveapplication;
    }
  };

  return (
    <>
      {/* {fieldProperties.manageEmployee !== 'createemployees' ? ( */}
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
        activeOpacity={0.8}>
        {fieldProperties.imageType === 'downloadimage' && (
          <Image
            source={imageType()}
            style={{width: 21, height: 20, marginRight: 10}}
          />
        )}
        {fieldProperties.manageEmployee === 'createemployees' ? (
          <Image
            source={imageType()}
            style={{width: 63, height: 63, marginHorizontal: 20}}
          />
        ) : null}
        <Text style={[styles.text, {color: btnTxtColor()}]}>{props.text}</Text>
      </TouchableOpacity>
      {/* // ) : (
      //   <View style={styles.linearButton}>
      //     <LinearGradient */}
      {/* //       style={[styles.buttonGrad]}
      //       colors={[CssVariables.linerSecond]}
      //       start={{x: 0, y: 1}}
      //       end={{x: 1, y: 0}}>
      //       <Image */}
      {/* //         source={imageType()}
      //         style={{width: 63, height: 63, marginHorizontal: 20}}
      //       />
      //       <Text style={styles.text}>{props.text}</Text>
      //     </LinearGradient>
      //   </View>
      // )} */}
    </>
  );
}
