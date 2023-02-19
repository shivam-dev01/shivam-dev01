import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import CustomDropDown from './CustomDropDown';
import CustomButton from './CustomButton';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import {Helper} from '../classes/Helper';

export default function CreateHoliday({
  change,
  setChange,
  setHolidayCreation,
  holidayCraeation,
}) {
  const backFunction = () => {
    setChange(!change);
    setHolidayCreation(false);
  };

  const months = [
    {month: 'January', value: '01'},
    {month: 'February', value: '02'},
    {month: 'March', value: '03'},
    {month: 'April', value: '04'},
    {month: 'May', value: '05'},
    {month: 'June', value: '06'},
    {month: 'July', value: '07'},
    {month: 'August', value: '08'},
    {month: 'September', value: '09'},
    {month: 'October', value: '10'},
    {month: 'November', value: '11'},
    {month: 'December', value: '12'},
  ];

  const years = [
    {year: '2022'},
    {year: '2023'},
    {year: '2024'},
    {year: '2025'},
    {year: '2026'},
    {year: '2027'},
    {year: '2028'},
    {year: '2029'},
    {year: '2030'},
    {year: '2031'},
    {year: '2032'},
  ];

  const [dMonths, setDmonths] = useState('');
  const [dYear, setDyear] = useState('');
  const [invalidDate, setInvalidDate] = useState({month: false, year: false});
  const [activeLoader, setActiveLoader] = useState({firstLoader: false});
  const [formInputs, setFormInputs] = useState([
    {
      key: '',
      month: dMonths.value,
      year: dYear.year,
      date: '',
      dateError: '',
      title: '',
      titleError: '',
      description: '',
      descriptionError: '',
      holidayDate: '',
    },
  ]);

  console.log('---formInput---', formInputs);

  const handleAddMoreLine = () => {
    const inputs = [...formInputs];
    inputs.push({
      key: '',
      month: dMonths.value,
      year: dYear.year,
      date: '',
      dateError: '',
      title: '',
      titleError: '',
      description: '',
      descriptionError: '',
      holidayDate: '',
    });
    setFormInputs(inputs);
  };

  const removeInputs = index => {
    // console.log('---scdsf');
    let item = [...formInputs];
    // let index = item.findIndex(x => x.id === value);
    item.splice(index, 1);
    setFormInputs(item);
  };

  const dateText = (text, key) => {
    const reg = /^(?:[0-9]|[12][0-9]|3[01])$/;
    const number = +text;
    console.log('dsfkdsflkdsfsd', number.length);
    if (reg.test(number) === false) {
      text = '';
    }
    const dateInputs = [...formInputs];
    // console.log('--_dateInputs---', dateInputs);
    dateInputs[key].key = key;
    dateInputs[key].holidayDate = text;
    setFormInputs(dateInputs);
  };

  const dateTextEndEdditing = (text, key) => {
    const dateValid = [...formInputs];
    dateValid[key].key = key;
    if (key == 0 && (text == null || text == '')) {
      dateValid[key].dateError = 'Required!';
    } else {
      dateValid[key].holidayDate;
      dateValid[key].dateError = '';
    }
    setFormInputs(dateValid);
  };

  const eventTitleText = (text, key) => {
    const titleInputs = [...formInputs];
    titleInputs[key].key = key;
    titleInputs[key].title = text;
    setFormInputs(titleInputs);
  };

  const eventTitle = (text, key) => {
    const titleValid = [...formInputs];
    titleValid[key].key = key;
    if (key == 0 && (text == null || text == '')) {
      titleValid[key].titleError = 'Required!';
    } else {
      titleValid[key].titleError = '';
    }
    setFormInputs(titleValid);
  };

  const eventDescription = (text, key) => {
    const descInouts = [...formInputs];
    descInouts[key].key = key;
    descInouts[key].description = text;
    setFormInputs(descInouts);
  };

  // const eventDescEndEdditing = (text, key) => {
  //   const descValid = [...formInputs];
  //   descValid[key].key = key;
  //   if (key == 0 && (text == null || text == '')) {
  //     descValid[key].descriptionError = 'Required!';
  //   } else {
  //     descValid[key].descriptionError = '';
  //   }
  //   setFormInputs(descValid);
  // };

  function validateFormMultipleFields() {
    let isValid = true;

    formInputs.map((input, key) => {
      dateTextEndEdditing(input.holidayDate, key);
      eventTitle(input.title, key);
      // eventDescEndEdditing(input.description, key);

      if (
        input.dateError != '' ||
        input.titleError != '' ||
        // input.descriptionError != '' ||
        dMonths.length > 0 ||
        dYear.length > 0
      ) {
        isValid = false;
        return;
      }
    });

    return isValid;
  }

  const handlePressSubmitButton = () => {
    if (
      (!validateFormMultipleFields() && dMonths.length === 0) ||
      dYear.length === 0
    ) {
      // console.log('Form data is not valid. And not ready to submit.');
      setInvalidDate({month: true, year: true});
      return;
    } else {
      setActiveLoader({firstLoader: true});
      let inputs = [];
      for (let i = 0; i < formInputs.length; i++) {
        inputs.push({
          date: `${
            formInputs[i].holidayDate.length === 1
              ? 0 + formInputs[i].holidayDate
              : formInputs[i].holidayDate
          }-${dMonths.value}-${dYear.year}`,
          name: formInputs[i].title,
          description: formInputs[i].description,
          month: dMonths.value,
          year: dYear.year,
          holidayDate:
            formInputs[i].holidayDate.length === 1
              ? 0 + formInputs[i].holidayDate
              : formInputs[i].holidayDate,
        });
      }
      // console.log('--input--', inputs);
      const apiParams = {
        url: apiEndPoints.add_holiday,
        requestMethod: 'post',
        response: res => {
          console.log('--res--', res);
          if (res.status === 200) {
            setActiveLoader({firstLoader: false});
            setFormInputs([
              {
                key: '',
                month: dMonths.value,
                year: dYear.year,
                date: '',
                dateError: '',
                title: '',
                titleError: '',
                description: '',
                descriptionError: '',
              },
            ]);
          }
        },
        errorFunction: error => {
          console.log('--error--sdjskjd', error);
          if (error === undefined) {
            setActiveLoader({firstLoader: false});
            Helper.showToastMessage('Something went wrong.');
          } else {
            setActiveLoader({firstLoader: false});
          }
        },
        endFunction: () => {
          // console.log('End Function Called');
          setActiveLoader({firstLoader: false});
        },
        input: inputs,
      };
      Api.callApi(apiParams);
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        visible={holidayCraeation}
        onRequestClose={backFunction}>
        <View style={styles.body}>
          <View style={styles.create_holiday_con}>
            <Text style={styles.upper_text}>Create Holiday</Text>
            <Image
              source={FilePaths.createHoliday}
              style={styles.create_holiday_image}
            />
          </View>
          <View style={styles.drop_down_main_con}>
            <View
              style={[
                styles.drop_down_con,
                {
                  borderColor: invalidDate.month
                    ? CssVariables.red
                    : CssVariables.light_gray,
                },
              ]}>
              <CustomDropDown
                label="Select month"
                data={months}
                onSelect={setDmonths}
              />
            </View>
            <View
              style={[
                styles.drop_down_con,
                {
                  borderColor: invalidDate.year
                    ? CssVariables.red
                    : CssVariables.light_gray,
                },
              ]}>
              <CustomDropDown
                label="Select year"
                data={years}
                onSelect={setDyear}
              />
            </View>
          </View>
          {/* <View style={styles.button_con}>
            <CustomButton
              text="Find Weekoff"
              properties={{
                fieldType: 'darkgreen',
              }}
            />
          </View> */}
          <View style={styles.header_con}>
            <View style={styles.date_text_con}>
              <Text style={styles.header_text}>Date</Text>
            </View>
            <View style={styles.title_con}>
              <Text style={styles.header_text}>Event Title</Text>
            </View>
            <View style={styles.desc_con}>
              <Text style={styles.header_text}>Event Description</Text>
            </View>
          </View>
          <ScrollView
            disableScrollViewPanResponder={true}
            contentContainerStyle={styles.scrollView}>
            <View style={styles.submitFormWrapper}>
              {formInputs.map((input, key) => (
                <View key={key + 1} style={styles.submitFormRow}>
                  {formInputs.length === 1 ? (
                    ''
                  ) : (
                    <TouchableOpacity
                      style={{padding: 10}}
                      onPress={() => removeInputs(key)}>
                      <Image
                        source={FilePaths.removeitem}
                        style={{width: 18, height: 18}}
                      />
                    </TouchableOpacity>
                  )}

                  <View style={{width: '15%'}}>
                    <TextInput
                      value={input.holidayDate}
                      onChangeText={text => dateText(text, key)}
                      maxLength={2}
                      onEndEditing={e =>
                        dateTextEndEdditing(e.nativeEvent.text, key)
                      }
                      keyboardType="numeric"
                      textAlign="center"
                      returnKeyType="next"
                      style={[
                        styles.formNumberInputStyle,
                        {
                          fontSize: 22,
                          borderColor:
                            input.dateError != '' ? '#e74c3c' : '#dfdfdf',
                        },
                      ]}
                    />

                    {input.dateError != '' ? (
                      <View style={styles.errorTextViewStyle}>
                        <Text style={styles.errorTextStyle}>
                          {input.dateError}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={{width: '28%'}}>
                    <TextInput
                      value={input.title}
                      onChangeText={text => eventTitleText(text, key)}
                      onEndEditing={e => eventTitle(e.nativeEvent.text, key)}
                      textAlign="center"
                      returnKeyType="next"
                      style={[
                        styles.formNumberInputStyle,
                        {
                          color: CssVariables.black,
                          borderColor:
                            input.dateError != '' ? '#e74c3c' : '#dfdfdf',
                        },
                      ]}
                    />

                    {input.titleError != '' ? (
                      <View style={styles.errorTextViewStyle}>
                        <Text style={styles.errorTextStyle}>
                          {input.titleError}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={{width: '40%'}}>
                    <TextInput
                      value={input.description}
                      onChangeText={text => eventDescription(text, key)}
                      // onEndEditing={e =>
                      //   eventDescEndEdditing(e.nativeEvent.text, key)
                      // }
                      textAlign="center"
                      returnKeyType="go"
                      style={[
                        styles.formNumberInputStyle,
                        {
                          color: CssVariables.black,
                          borderColor:
                            input.descriptionError != ''
                              ? '#e74c3c'
                              : '#dfdfdf',
                        },
                      ]}
                    />

                    {input.descriptionError != '' ? (
                      <View style={styles.errorTextViewStyle}>
                        <Text style={styles.errorTextStyle}>
                          {input.descriptionError}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.submitFormButtons}>
              <CustomButton
                text="+ Add Input"
                onPress={handleAddMoreLine}
                properties={{
                  fieldType: 'dotted',
                }}
              />
              <View style={{marginTop: '5%'}}></View>
              <CustomButton
                onPress={handlePressSubmitButton}
                text={
                  activeLoader.firstLoader ? (
                    <ActivityIndicator
                      color={CssVariables.white}
                      size="small"
                    />
                  ) : (
                    'Create'
                  )
                }
                properties={{
                  fieldType: 'widthlongdarkgreen',
                }}
              />
              <CustomButton
                onPress={backFunction}
                text="Cancel"
                properties={{
                  fieldType: 'white',
                }}
              />
              {/* </View> */}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.white,
    position: 'relative',
  },
  create_holiday_con: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CssVariables.darkgreen,
    flexDirection: 'row',
    paddingVertical: 4,
  },
  upper_text: {
    fontSize: 16,
    color: CssVariables.white,
    padding: 6,
    fontFamily: CssVariables.mulishmedium,
  },
  create_holiday_image: {
    width: 63,
    height: 60,
    marginRight: 10,
  },
  drop_down_main_con: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  drop_down_con: {
    width: '40%',
    height: 44,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 4,
    justifyContent: 'center',
  },
  button_con: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  header_con: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: CssVariables.blue,
    justifyContent: 'space-evenly',
    paddingLeft: 28,
  },
  date_text_con: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_text: {
    color: CssVariables.white,
    fontSize: 15,
    fontFamily: CssVariables.mulishregular,
  },
  title_con: {
    width: '28%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc_con: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  submitFormWrapper: {},
  submitFormRow: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 6,
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  formNumberInputStyle: {
    width: '100%',
    height: 42,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#cccccc',
    color: CssVariables.black,
  },
  errorTextViewStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTextStyle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 11,
    color: '#ff0000',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 2,
    paddingRight: 2,
    alignSelf: 'center',
  },
  submitFormButtons: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '20%',
    bottom: 0,
  },
});
