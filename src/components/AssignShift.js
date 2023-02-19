import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
  Pressable,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {CssVariables} from '../constants/CssVariables';
import CustomDropDown from './CustomDropDown';
import {FilePaths} from '../constants/filepath';
import {Api} from '../classes/Api';
import {apiEndPoints} from '../constants/apiEndPoints';
import FailedModal from './FailedModal';
import {useOrientation} from './useOrientation';
import {Helper} from '../classes/Helper';
import ShiftCard from './ShiftCard';

export default function AssignShift({
  setAssignShift,
  assignShift,
  setChange,
  change,
}) {
  const orientation = useOrientation();
  const backFunction = () => {
    setChange(!change);
    setAssignShift(false);
  };
  const [selected, setSelected] = useState('');
  const [allDepartment, setAllDepartment] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState('');
  const [fillterByDetails, setFillterByDetails] = useState('');
  const [fetchJobRole, setFetchJobeRole] = useState('');
  const [dayShift, setDayShift] = useState(false);
  const [nightshift, setNightShift] = useState(false);
  const [noDataModal, setNoDataModal] = useState(false);
  const [jobRole, setJobRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordPerPage] = useState(10);
  const [pageVisible, setPageVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
    thirdLoader: false,
  });
  const DropdownButton = useRef();

  useEffect(() => {
    getEmployee();
  }, [jobRole, selected]);

  const nPages = Math.ceil(15 / recordsPerPage);

  const record = [10, 20, 30, 40];

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const onPgPress = value => {
    setRecordPerPage(value);
    setPageVisible(false);
  };
  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      // console.log('--py--', _fx, _fy, _w, h, _px, py);
      setDropdownTop(py + h);
    });
    setPageVisible(true);
  };
  const noDepa = [
    {
      error: activeLoader.secondLoader
        ? 'Loading...'
        : 'You have not created department.Please Create first.',
    },
  ];
  const noJobRole = [
    {
      error: activeLoader.thirdLoader
        ? 'Loading...'
        : 'You have not created job role for this department.Please Create first.',
    },
  ];
  const getAllDepartment = () => {
    setActiveLoader({secondLoader: true});
    const apiParams = {
      url: apiEndPoints.get_all_department,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setAllDepartment(res.result);
        setActiveLoader({secondLoader: false});
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error.status === 400) {
          Helper.showToastMessage('Failed.');
        }
        if (error === undefined) {
          Helper.showToastMessage('Something went wrong.');
          setActiveLoader({secondLoader: false});
        } else {
          setActiveLoader({secondLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({secondLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const getAllJobeRole = id => {
    setActiveLoader({thirdLoader: true});
    const apiParams = {
      url: `${apiEndPoints.get_all_job_role}/${id}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setFetchJobeRole(res.result);
        setActiveLoader({thirdLoader: false});
      },
      errorFunction: error => {
        // console.log('--error Job--', error);
        if (error.status === 400) {
          Helper.showToastMessage('Failed.');
        }
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
    };
    Api.callApi(apiParams);
  };

  const fillterEmployess = () => {
    if (selected && jobRole)
      return `${apiEndPoints.filter_employee}?department=${selected.department}&jobRole=${jobRole.jobRole}`;
    if (selected && !jobRole)
      return `${apiEndPoints.filter_employee}?department=${selected.department}`;
    if (!selected && !jobRole) return `${apiEndPoints.get_all_employee}`;
  };

  const getEmployee = () => {
    setActiveLoader({firstLoader: true});
    const apiParams = {
      url: fillterEmployess(),
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setActiveLoader({firstLoader: false});
        console.log('--res--', res);
        if (res.result.length) {
          setEmployeeDetails(res.result);
          setFillterByDetails(res.result);
          getAllDepartment();
        } else {
          setNoDataModal(true);
          setEmployeeDetails(res.result);
          setFillterByDetails(res.result);
        }
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error.status === 400) {
          Helper.showToastMessage('Failed.');
        }
        if (error === undefined) {
          setActiveLoader({firstLoader: false});
          Helper.showToastMessage('Something went wrong.');
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({firstLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const fillterData = text => {
    if (fillterByDetails && fillterByDetails.length) {
      if (text) {
        const fillterDetails = fillterByDetails.filter(item => {
          const fillterName = item.fullName;
          const fillterId = item.employeeId;
          return fillterName.indexOf(text) > -1 || fillterId.indexOf(text) > -1;
        });
        setEmployeeDetails(fillterDetails);
      } else {
        setEmployeeDetails(fillterByDetails);
      }
    }
  };

  return (
    <>
      <View style={{flex: 1}}>
        <View style={orientation === 'LANDSCAPE' && {flexDirection: 'row'}}>
          <View
            style={
              orientation === 'PORTRAIT'
                ? styles.upper_con
                : styles.po_password_container
            }>
            <View style={styles.drop_down_con}>
              <CustomDropDown
                label="Department"
                data={allDepartment}
                onSelect={setSelected}
                noData={noDepa}
                getJobRole={getAllJobeRole}
              />
            </View>
            {selected ? (
              <View style={styles.drop_down_con}>
                <CustomDropDown
                  label="Job Role"
                  data={fetchJobRole}
                  onSelect={setJobRole}
                  noData={noJobRole}
                />
              </View>
            ) : (
              <View style={styles.drop_down_con}>
                <Text style={styles.desable_select_text}>Job Role</Text>
              </View>
            )}
            {/* {jobRole ? (
              <View style={styles.search_pagination_con}>
                <View style={styles.input_con}>
                  <TextInput
                    placeholder="Search"
                    placeholderTextColor={CssVariables.gray}
                    onChangeText={value => fillterData(value)}
                    style={styles.input}
                  />
                  <Image source={FilePaths.search} style={styles.search_icon} />
                </View>
                <View style={styles.page_filter_con}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.page_filter_text}>Row per page : </Text>
                    <TouchableOpacity
                      ref={DropdownButton}
                      onPress={openDropdown}
                      style={styles.page_filter_drop_down}>
                      <Text style={styles.page_filter_text}>
                        {recordsPerPage}
                      </Text>
                      <Image
                        source={FilePaths.dropdownicon}
                        style={[
                          styles.page_filter_drop_down_icon,
                          {
                            transform: [
                              {rotate: pageVisible ? '180deg' : '0deg'},
                            ],
                          },
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.page_filter_text}>
                      {recordsPerPage} of {employeeDetails.length}
                    </Text>
                  </View>

                  <TouchableOpacity onPress={prevPage}>
                    <Image
                      source={FilePaths.leftarrow}
                      style={styles.page_filter_arrow_icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={nextPage}>
                    <Image
                      source={FilePaths.leftarrow}
                      style={[
                        styles.page_filter_arrow_icon,
                        {transform: [{rotate: '180deg'}]},
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                <Modal
                  visible={pageVisible}
                  animationType={'fade'}
                  transparent
                  onRequestClose={() => setPageVisible(false)}>
                  <Pressable
                    style={{flex: 1}}
                    onPress={() => setPageVisible(false)}>
                    <View
                      style={[
                        styles.modal_page_fillter_con,
                        {
                          top: dropdownTop,
                        },
                      ]}>
                      {record.map(data => {
                        return (
                          <TouchableOpacity
                            style={styles.modal_page_fillter_text}
                            onPress={() => onPgPress(data)}
                            key={data}>
                            <Text style={styles.page_filter_text}>{data}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </Pressable>
                </Modal>
              </View>
            ) : null} */}
            {/* </View> */}
          </View>
          <View style={orientation === 'LANDSCAPE' && styles.po_upper_items}>
            {activeLoader.firstLoader ? (
              <ActivityIndicator size={'large'} color={CssVariables.sky_blue} />
            ) : (
              <FlatList
                data={employeeDetails}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={activeLoader.firstLoader}
                    onRefresh={getEmployee}
                  />
                }
                renderItem={({item}) => {
                  return <ShiftCard item={item} getEmployee={getEmployee} />;
                }}
              />
            )}
          </View>
        </View>
        <FailedModal
          visible={noDataModal}
          onRequestClose={() => setNoDataModal(false)}
          properties={{
            failed: 'nodata',
            modalFalse: setNoDataModal,
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  create_empl_con: {
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
  depa_date_con: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  shift_radio_button: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: CssVariables.light_gray,
  },
  check_box: {
    width: 12,
    height: 12,
    borderRadius: 10,
  },
  date_text: {
    color: CssVariables.department_red,
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
    marginLeft: 5,
  },
  details_header_text: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: CssVariables.pencile,
    paddingHorizontal: 5,
  },
  name_emp_id_con: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assign_shift_con: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shift_con: {
    width: '20%',
    flexDirection: 'row',
    backgroundColor: CssVariables.light_yellow,
    borderRadius: 5,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details_header_texts: {
    color: CssVariables.gray,
  },
  create_empl_img: {
    width: 63,
    height: 60,
    marginRight: 10,
  },
  input_con: {
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    height: 40,
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: CssVariables.light_white,
    marginVertical: 10,
    width: '37%',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    paddingLeft: 34,
    borderRadius: 4,
    flexShrink: 1,
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
  },
  search_icon: {
    position: 'absolute',
    width: 18,
    height: 18,
    alignSelf: 'center',
    left: 5,
  },
  upper_con: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  po_password_container: {
    height: '95%',
    width: '50%',
  },
  drop_down_con: {
    width: '45%',
    borderRadius: 50,
    overflow: 'hidden',
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: CssVariables.drop_down_bg,
  },
  po_upper_items: {
    width: '50%',
    height: '95%',
    borderWidth: 1,
  },
  details_texts: {
    color: CssVariables.department_red,
    fontFamily: CssVariables.mulishmedium,
    fontSize: 15,
  },
  depa_date_input: {
    width: '65%',
    height: 44,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 4,
    borderColor: CssVariables.light_gray,
    justifyContent: 'center',
  },
  desable_select_text: {
    color: CssVariables.light_gray,
    marginLeft: 10,
    fontFamily: CssVariables.mulishregular,
    fontSize: 15,
  },
  search_pagination_con: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 2,
  },
  page_filter_con: {
    width: '63%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    alignItems: 'center',
  },
  page_filter_text: {
    fontFamily: CssVariables.mulishregular,
    fontSize: 13,
    color: CssVariables.black,
  },
  page_filter_drop_down: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page_filter_drop_down_icon: {
    width: 13,
    height: 7,
    marginLeft: 3,
  },
  page_filter_arrow_icon: {
    width: 18,
    height: 18,
  },
  modal_page_fillter_con: {
    alignSelf: 'center',
    backgroundColor: CssVariables.white,
    elevation: 10,
  },
  modal_page_fillter_text: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  day_night_button: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
