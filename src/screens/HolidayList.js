import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FilePaths} from '../constants/filepath';
import {CssVariables} from '../constants/CssVariables';
import CustomDropDown from '../components/CustomDropDown';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import FailedModal from '../components/FailedModal';
import {Helper} from '../classes/Helper';
import {useOrientation} from '../components/useOrientation';
import CustomButton from '../components/CustomButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function HolidayList({
  change,
  setChange,
  setHolidayLists,
  holidayLists,
}) {
  const backFunction = () => {
    setChange(!change);
    setHolidayLists(false);
  };
  const orientation = useOrientation();
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
  const [holidaylist, setHolidayList] = useState('');
  const [noDataModal, setNoDataModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [id, setId] = useState('');
  const [cDate, setCdate] = useState('');
  const [cTitle, setCtitle] = useState('');
  const [cDesc, setCdesc] = useState('');
  const [error, setError] = useState(false);
  const [datep, setDatep] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [holidayFilter, setHolidayFilter] = useState([]);
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
    thirdLoader: false,
  });

  useEffect(() => {}, []);

  useEffect(() => {
    if (dYear.year) {
      getHoliday();
    } else {
      getHoliday();
    }
  }, [dYear]);

  useEffect(() => {
    if (dMonths.month) {
      searchFilterText();
    }
  }, [dMonths]);

  const apiUrl = () => {
    if (dYear.year) {
      return `${apiEndPoints.get_holiday}?&year=${dYear.year}`;
    } else {
      return apiEndPoints.get_holiday;
    }
  };

  const getHoliday = () => {
    setActiveLoader({firstLoader: true});
    const apiParams = {
      url: apiUrl(),
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        console.log('--res--', res);
        if (res.result.length) {
          setHolidayList(res.result);
          setActiveLoader({firstLoader: false});
          setHolidayFilter(res.result);
          if (dMonths.month) {
            const newValue = res.result.filter(item => {
              const itemData = item.month;
              const textData = dMonths.value;
              return itemData.indexOf(textData) > -1;
            });
            setHolidayList(newValue);
          }
        } else {
          setNoDataModal(true);
          setHolidayList(res.result);
          setHolidayFilter(res.result);
        }
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error === undefined) {
          setActiveLoader({firstLoader: false});
        } else {
          setActiveLoader({firstLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({firstLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const searchFilterText = value => {
    if (dMonths.month) {
      const newValue = holidayFilter.filter(item => {
        const itemData = item.month;
        const textData = value ? value : dMonths.value;
        return itemData.indexOf(textData) > -1;
      });
      setHolidayList(newValue);
    } else {
      setHolidayList(holidayFilter);
    }
  };

  const deleteHoliday = id => {
    Alert.alert('Delete', 'Are you want to delete this holiday?', [
      {
        text: 'Yes',
        onPress: () => {
          onYes(id);
        },
      },
      {text: 'No', onPress: () => {}},
    ]);
  };

  const onYes = id => {
    const apiParams = {
      url: `${apiEndPoints.dele_holiday}/${id}`,
      requestMethod: 'delete',
      response: res => {
        // console.log('--res--', res);
        if (res.status === 200) {
          getHoliday();
        }
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error === undefined) {
          Helper.showToastMessage('Something went wrong.');
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
      },
    };
    Api.callApi(apiParams);
  };

  const openModal = (id, date, name, descp) => {
    setModalVisible(true);
    setId(id);
    setDate(date);
    setTitle(name);
    setDesc(descp);
  };

  const onUpdate = () => {
    setActiveLoader({secondLoader: true});
    const apiParams = {
      url: `${apiEndPoints.update_holiday}/${id}`,
      requestMethod: 'put',
      response: res => {
        // console.log('--res--', res);
        if (res.status === 200) {
          setActiveLoader({secondLoader: false});
          setModalVisible(false);
          getHoliday();
          setCdate('');
        }
      },
      errorFunction: error => {
        console.log('--error--', error);
        if (error === undefined) {
          setActiveLoader({secondLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({secondLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({secondLoader: false});
      },
      input: {
        month: moment(cDate).format('MM'),
        year: moment(cDate).format('YYYY'),
        date: moment(cDate).format('DD-MM-YYYY'),
        name: title,
        description: desc,
        holidayDate: moment(cDate).format('DD'),
      },
    };
    Api.callApi(apiParams);
  };

  const onChange = (event, selectedTime) => {
    console.log('=vdsfsdf===', selectedTime);
    setShow(false);
    setCdate(selectedTime);
  };

  const showMode = currentMode => {
    setShow(false);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
    setShow(true);
  };

  const onHolidaySubmit = () => {
    if (!cDate || !cTitle || !cDesc) {
      setError(true);
    } else {
      setActiveLoader({thirdLoader: true});
      const apiParams = {
        url: apiEndPoints.add_holiday,
        requestMethod: 'post',
        response: res => {
          console.log('--res--', res);
          setAddModal(false);
          setCdate('');
          setCdesc('');
          setCtitle('');
          setError(false);
          getHoliday();
        },
        errorFunction: error => {
          console.log('--error--sdjskjd', error);
          if (error === undefined) {
            setActiveLoader({thirdLoader: false});
            Helper.showToastMessage('Something went wrong.');
          } else {
            setActiveLoader({thirdLoader: false});
          }
        },
        endFunction: () => {
          // console.log('End Function Called');
          setActiveLoader({thirdLoader: false});
        },
        input: [
          {
            month: moment(cDate).format('MM'),
            year: moment(cDate).format('YYYY'),
            date: moment(cDate).format('DD-MM-YYYY'),
            name: cTitle,
            description: cDesc,
            holidayDate: moment(cDate).format('DD'),
          },
        ],
      };
      Api.callApi(apiParams);
    }
  };

  const renderItem = ({item}) => {
    // const date = () => {
    //   if (item.holidayDate) {
    //     return `${item.holidayDate}-${item.month}-${item.year}`;
    //   } else {
    //     return `${item.holidayDate}-${item.month}-${item.year}`;
    //   }
    // };
    return (
      <View style={styles.render_item_con}>
        <View style={styles.row_con}>
          <Pressable
            style={styles.item_button}
            onPress={() =>
              openModal(item._id, item.date, item.name, item.description)
            }>
            <Image source={FilePaths.edith} style={{width: 15, height: 15}} />
            <Text style={styles.edit_text}>Edit</Text>
          </Pressable>
          <View style={styles.midle_con}>
            <View style={{flex: 0.5}}>
              <Image
                source={FilePaths.holidaym}
                style={{width: 24, height: 24}}
              />
            </View>
            <View style={{flex: 4}}>
              <Text style={styles.date_text}>{item.date}</Text>
              <Text style={styles.name_text}>{item.name}</Text>
              <Text style={styles.desc_text}>{item.description}</Text>
            </View>
          </View>

          <Pressable
            style={styles.item_sec_button}
            onPress={() => deleteHoliday(item._id)}>
            <Image source={FilePaths.trash} style={{width: 11, height: 14}} />
            <Text style={styles.remove_text}>Remove</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.body}>
      <View style={{width: '95%', alignSelf: 'center', marginTop: 10}}>
        <CustomButton
          text="+ Add Holiday"
          properties={{
            fieldType: 'darkgreen',
          }}
          onPress={() => setAddModal(true)}
        />
      </View>
      <View style={styles.drop_down_main_con}>
        <View style={styles.drop_down_con}>
          <CustomDropDown
            label="Select year"
            data={years}
            onSelect={setDyear}
          />
        </View>
        {dYear && dYear.year ? (
          <View style={styles.drop_down_con}>
            <CustomDropDown
              label="Select month"
              data={months}
              onSelect={setDmonths}
            />
          </View>
        ) : (
          <View style={styles.drop_down_con}>
            <Text style={styles.desable_select_text}>Select month</Text>
          </View>
        )}
      </View>
      <View style={{height: '78%'}}>
        <FlatList
          data={holidaylist}
          renderItem={renderItem}
          keyExtractor={(item, key) => key.toString()}
          refreshControl={
            <RefreshControl
              refreshing={activeLoader.firstLoader}
              onRefresh={getHoliday}
            />
          }
        />
      </View>
      {activeLoader.firstLoader && (
        <View style={styles.loader_style}>
          <ActivityIndicator size={'large'} color={CssVariables.darkgreen} />
        </View>
      )}

      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent
        onRequestClose={() => {
          setModalVisible(false) || setCdate('');
        }}>
        <View style={styles.create_depa_body}>
          <ScrollView
            contentContainerStyle={styles.scroll_view_style}
            disableScrollViewPanResponder={true}>
            <View
              style={
                orientation === 'PORTRAIT'
                  ? styles.create_depa_input
                  : styles.po_create_depa_input
              }>
              <Text style={styles.update_holidat_text}>Update holiday</Text>
              <View style={{width: '80%'}}>
                <Pressable
                  style={[
                    styles.input_con,
                    {
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      marginVertical: 0,
                      borderWidth: 1,
                      borderColor: CssVariables.light_gray,
                    },
                  ]}
                  onPress={showDatePicker}>
                  <Text
                    style={{
                      color: CssVariables.gray,
                      fontFamily: CssVariables.mulishregular,
                      fontSize: 14,
                    }}>
                    {cDate ? moment(cDate).format('DD-MM-YYYY') : date}
                  </Text>
                  <Image
                    source={FilePaths.calendar}
                    style={{width: 15, height: 15}}
                  />
                </Pressable>
              </View>
              <View style={styles.input_con}>
                <TextInput
                  placeholder="Event title"
                  style={styles.input}
                  onChangeText={value => setTitle(value)}
                  value={title}
                />
              </View>
              <View style={styles.input_con}>
                <TextInput
                  placeholder="Event description"
                  style={styles.input}
                  onChangeText={value => setDesc(value)}
                  value={desc}
                />
              </View>
              <View style={styles.button_con}>
                <CustomButton
                  onPress={onUpdate}
                  text={
                    activeLoader.secondLoader ? (
                      <ActivityIndicator
                        size={'small'}
                        color={CssVariables.white}
                      />
                    ) : (
                      'Update'
                    )
                  }
                  properties={{
                    fieldType: 'widthlongdarkgreen',
                  }}
                />
                <CustomButton
                  onPress={() => {
                    setModalVisible(false) || setCdate('');
                  }}
                  text="Cancel"
                  properties={{
                    fieldType: 'white',
                  }}
                />
              </View>
            </View>
          </ScrollView>
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
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={addModal}
        transparent
        onRequestClose={() => {
          setAddModal(false) || setCdate('');
        }}>
        <View style={styles.create_depa_body}>
          <ScrollView
            contentContainerStyle={styles.scroll_view_style}
            disableScrollViewPanResponder={true}>
            <View
              style={
                orientation === 'PORTRAIT'
                  ? styles.create_depa_input
                  : styles.po_create_depa_input
              }>
              <Text style={styles.update_holidat_text}>Add holiday</Text>
              <View style={{width: '80%'}}>
                <Pressable
                  style={[
                    styles.input_con,
                    {
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      marginVertical: 0,
                      borderWidth: 1,
                      borderColor: CssVariables.light_gray,
                    },
                  ]}
                  onPress={showDatePicker}>
                  <Text
                    style={{
                      color: CssVariables.gray,
                      fontFamily: CssVariables.mulishregular,
                      fontSize: 14,
                    }}>
                    {cDate ? moment(cDate).format('DD-MM-YYYY') : 'Select date'}
                  </Text>
                  <Image
                    source={FilePaths.calendar}
                    style={{width: 15, height: 15}}
                  />
                </Pressable>
                <Text style={styles.error_text}>
                  {error && !cDate && 'This field is required'}
                </Text>
              </View>
              <View style={{width: '80%'}}>
                <TextInput
                  placeholder="Event title"
                  style={styles.input}
                  onChangeText={value => setCtitle(value)}
                  value={cTitle}
                  placeholderTextColor={CssVariables.gray}
                />
                <Text style={styles.error_text}>
                  {error && !cTitle && 'This field is required'}
                </Text>
              </View>
              <View style={{height: 120, width: '80%'}}>
                <TextInput
                  placeholder="Event description"
                  style={[styles.input, {height: 120}]}
                  onChangeText={value => setCdesc(value)}
                  value={cDesc}
                  placeholderTextColor={CssVariables.gray}
                />
                <Text style={styles.error_text}>
                  {error && !cDesc && 'This field is required'}
                </Text>
              </View>
              <View style={styles.button_con}>
                <CustomButton
                  onPress={onHolidaySubmit}
                  text={
                    activeLoader.thirdLoader ? (
                      <ActivityIndicator
                        size={'small'}
                        color={CssVariables.white}
                      />
                    ) : (
                      'Submit'
                    )
                  }
                  properties={{
                    fieldType: 'widthlongdarkgreen',
                  }}
                />
              </View>
              <Pressable
                style={{position: 'absolute', top: 5, right: 5}}
                onPress={() => {
                  setAddModal(false) || setCdate('');
                }}>
                <Image
                  style={{height: 34, width: 34}}
                  source={FilePaths.cancleicon}
                />
              </Pressable>
            </View>
          </ScrollView>
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
        </View>
      </Modal>

      <FailedModal
        visible={noDataModal}
        onRequestClose={() => setNoDataModal(false)}
        properties={{
          failed: 'nodata',
          modalFalse: setNoDataModal,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.white,
    position: 'relative',
  },
  holiday_list_con: {
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
  holiday_list_image: {
    width: 63,
    height: 60,
    marginRight: 10,
  },
  drop_down_main_con: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  drop_down_con: {
    width: '45%',
    paddingHorizontal: 10,
    height: 44,
    overflow: 'hidden',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: CssVariables.drop_down_bg,
  },
  desable_select_text: {
    color: CssVariables.light_gray,
    marginLeft: 10,
    fontFamily: CssVariables.mulishregular,
    fontSize: 15,
  },
  render_item_con: {
    width: '97%',
    backgroundColor: '#FFC0C0',
    alignSelf: 'center',
    marginTop: 5,
    elevation: 2,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 5,
    overflow: 'hidden',
  },
  row_con: {
    width: '100%',
    backgroundColor: CssVariables.white,
    padding: 5,
  },
  date_con: {
    width: '26%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date_text: {
    color: CssVariables.black,
    fontSize: 15,
    fontFamily: CssVariables.mulishregular,
  },
  name_con: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name_text: {
    color: CssVariables.black,
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
  },
  desc_con: {
    width: '24%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc_text: {
    color: CssVariables.black,
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
  },
  item_button: {
    width: 50,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  edit_text: {
    color: CssVariables.dark_blue,
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
    marginLeft: 5,
  },
  midle_con: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 2,
  },
  item_sec_button: {
    width: 75,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  remove_text: {
    color: CssVariables.red,
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
    marginLeft: 5,
  },
  create_depa_body: {
    flex: 1,
    backgroundColor: CssVariables.lightblack,
  },
  scroll_view_style: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  create_depa_input: {
    width: '95%',
    height: 400,
    backgroundColor: CssVariables.white,
    borderRadius: 15,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  update_holidat_text: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 20,
    color: CssVariables.black,
    marginVertical: 5,
  },
  po_create_depa_input: {
    width: '50%',
    height: '95%',
    backgroundColor: CssVariables.white,
    borderRadius: 15,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input_con: {
    // borderWidth: 1,
    // borderColor: CssVariables.light_gray,
    height: 45,
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: CssVariables.light_white,
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    backgroundColor: CssVariables.light_white,
    height: 45,
    borderRadius: 4,
    flexShrink: 1,
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
  },
  error_text: {
    color: CssVariables.red_meduim,
    fontSize: 13,
    fontFamily: CssVariables.mulishregular,
  },
  button_con: {
    width: '80%',
    alignItems: 'center',
  },

  loader_style: {
    backgroundColor: CssVariables.white,
    width: '100%',
    height: '100%',
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
