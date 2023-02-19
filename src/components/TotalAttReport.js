import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  TextInput,
  ActivityIndicator,
  Pressable,
  PermissionsAndroid,
  RefreshControl,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import FailedModal from './FailedModal';
import SuccessModal from './SuccessModal';
import {Helper} from '../classes/Helper';
import {useOrientation} from './useOrientation';
import CustomDropDown from './CustomDropDown';
import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default function TotalAttReport({
  change,
  setChange,
  setTotalReport,
  totalReport,
  totalEmployee,
}) {
  const orientation = useOrientation();

  const backFunction = () => {
    setChange(!change);
    setTotalReport(false);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState('');
  const [fillterByDetails, setFillterByDetails] = useState('');
  const [specificDetails, setSpecificDetails] = useState([]);
  const [secModalVisible, setSecModalVisible] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState('');
  const [noDataModal, setNoDataModal] = useState(false);
  const [empId, setEmpId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordPerPage] = useState(10);
  const [pageVisible, setPageVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [reportType, setReportType] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [workingDay, setWorkingDay] = useState('');
  const [unPaidLeave, setUnPaidLeave] = useState('');
  const [paidLeave, setPaidLeave] = useState('');
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
    thirdLoader: false,
    fourthLoader: false,
    fifthLoader: false,
  });
  const DropdownButton = useRef();

  useEffect(() => {
    if (totalReport === true) {
      getAllEmplooyee();
    }
  }, [totalReport, currentPage, recordsPerPage]);
  useEffect(() => {
    if (reportType.reportType === 'Monthly Report') {
      if (month && year) {
        reports();
      }
    }
    if (reportType.reportType === 'Yearly Report') {
      setMonth('');
      if (year.year) {
        reports();
      }
    }
  }, [year, reportType]);

  const reportTypes = [
    {
      reportType: 'Monthly Report',
    },
    {
      reportType: 'Yearly Report',
    },
  ];
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

  const date = new Date();

  const nPages = Math.ceil(totalEmployee / recordsPerPage);

  const record = [10, 20, 30, 40];

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    console.log('-==-=', nPages);
    console.log('-=-=-=-=', totalEmployee);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const onPgPress = value => {
    setRecordPerPage(value);
    setPageVisible(false);
  };

  const getAllEmplooyee = () => {
    setActiveLoader({firstLoader: true});
    const apiParams = {
      url: `${apiEndPoints.get_all_employeebypage}?page=${currentPage}&limit=${recordsPerPage}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        // console.log('--res--', res);
        setActiveLoader({firstLoader: false});
        if (res.result.length) {
          setEmployeeDetails(res.result);
          setFillterByDetails(res.result);
        } else {
          setNoDataModal(true);
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

  const fillterData = value => {
    if (fillterByDetails && fillterByDetails.length) {
      if (value) {
        setActiveLoader({fifthLoader: true});
        const apiParams = {
          url: `${apiEndPoints.employee_filter}${value}`,
          requestMethod: 'get',
          hideResponseMsg: true,
          response: res => {
            console.log('--res--', res);
            setEmployeeDetails(res.result);
            setActiveLoader({fifthLoader: false});
          },
          errorFunction: error => {
            console.log('--erorr--', error);
            if (error === undefined) {
              setActiveLoader({fifthLoader: false});
            } else {
              setActiveLoader({fifthLoader: false});
            }
          },
          endFunction: () => {
            console.log('End Function called.');
            setActiveLoader({fifthLoader: false});
          },
        };
        Api.callApi(apiParams);
      } else {
        setEmployeeDetails(fillterByDetails);
      }
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.details_cont_text}>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.details_name_texts}>{item.fullName}</Text>
          </View>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.details_depart_texts}>{item.employeeId}</Text>
          </View>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.details_depart_texts}>{item.department}</Text>
          </View>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Pressable
              //   disabled={item.profileUpdate === true ? false : true}
              onPress={() => viewDetails(item.mobileNumber, item._id)}>
              <Text
                style={[
                  styles.details_view_texts,
                  {
                    color: CssVariables.blue,
                  },
                ]}>
                View
              </Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  };

  const viewDetails = (number, id) => {
    setEmpId(id);
    reports(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setWorkingDay([]);
    setUnPaidLeave([]);
    setPaidLeave([]);
    setMonth('');
    setYear('');
  };

  const url = id => {
    if (year && !month) {
      return `${apiEndPoints.monthly_annual_report}${empId}&year=${year.year}`;
    }
    if (month && year) {
      return `${apiEndPoints.monthly_annual_report}${empId}&year=${year.year}&month=${month.value}`;
    }
    if (!month && !year) {
      return `${apiEndPoints.monthly_annual_report}${id}&year=${moment(
        date,
      ).format('YYYY')}&month=${moment(date).format('MM')}`;
    }
  };

  const reports = id => {
    setActiveLoader({secondLoader: true});
    const apiParams = {
      url: url(id),
      requestMethod: 'get',
      //   hideResponseMsg: true,
      response: res => {
        console.log('--ressadhajksdhjashdkjasdashj--', res);
        setActiveLoader({secondLoader: false});
        if (res.status === 200 && res.result.length) {
          setSpecificDetails(res.result);
          let unpaidArray = [];
          let workingDay = [];
          let paidLeave = [];
          res.result.map(item => {
            if (item.leaveType === 'UNPAID') {
              unpaidArray.push(item);
            }
            setUnPaidLeave(unpaidArray.length);
            if (item.leaveType === 'PAID') {
              paidLeave.push(item);
            }
            setPaidLeave(paidLeave.length);
            if (item.attendanceType) {
              workingDay.push(item);
            }
            setWorkingDay(workingDay.length);
          });
        } else if (res.result.length === 0) {
          setSpecificDetails([]);
          setWorkingDay([]);
          setPaidLeave([]);
          setUnPaidLeave([]);
          setNoDataModal(true);
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
        console.log('End Function Called');
        setActiveLoader({secondLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setPageVisible(true);
  };

  let dates = [];
  let status = [];
  if (specificDetails && specificDetails.length) {
    specificDetails.map((item, key) => {
      const text = () => {
        if (item.description === 'WO') {
          return 'Week off';
        } else if (item.holidayDate) {
          return 'Holiday';
        } else if (item.attendanceType) {
          return `Present, Working hours-${item.workingHour}`;
        } else if (item.leaveType) {
          return `Leave, ${item.leaveType}`;
        }
      };
      dates.push(item.date);
      status.push(text());
    });
  }

  const htmlContent = `
   <h1>Monthly Report</h1>
   <p>${dates}</p>
   <p>${status}</p>
`;

  const isPrmitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'File Access',
            message: 'We Need Your File Access to Upload documents',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        alert('Write permission err', error);
      }
    } else {
      return true;
    }
  };
  const createPdf = async () => {
    if (await isPrmitted()) {
      let options = {
        html: htmlContent,
        fileName: 'test',
        directory: 'Download',
        base64: true,
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file);
      alert(file.filePath);
      console.log('-=-=-', file);
    }
  };

  console.log('dhjdsjlkasd==-', dates, status);

  return (
    <>
      <Modal
        animationType="fade"
        visible={totalReport}
        onRequestClose={backFunction}>
        <View style={{flex: 1}}>
          <View style={styles.create_empl_con}>
            <Text style={styles.upper_text}>Attendance Report</Text>
            <Image
              source={FilePaths.viewemployees}
              style={styles.create_empl_img}
            />
          </View>
          <View style={styles.input_con}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={CssVariables.gray}
              onChangeText={value => fillterData(value)}
              style={styles.input}
              // onEndEditing={fillterData}
              // returnKeyType={'search'}
            />
            <Image source={FilePaths.search} style={styles.search_icon} />
            {activeLoader.fifthLoader && (
              <ActivityIndicator
                color={CssVariables.darkgreen}
                size={'small'}
                collapsable={true}
                style={styles.filter_icon}
              />
            )}
          </View>
          <View style={styles.page_filter_con}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.page_filter_text}>Row per page : </Text>
              <TouchableOpacity
                ref={DropdownButton}
                onPress={openDropdown}
                style={styles.page_filter_drop_down}>
                <Text style={styles.page_filter_text}>{recordsPerPage}</Text>
                <Image
                  source={FilePaths.dropdownicon}
                  style={[
                    styles.page_filter_drop_down_icon,
                    {
                      transform: [{rotate: pageVisible ? '180deg' : '0deg'}],
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.page_filter_text}>
                {recordsPerPage} of {totalEmployee}
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
            <Pressable style={{flex: 1}} onPress={() => setPageVisible(false)}>
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
          <View style={styles.details_header_text}>
            <View style={{width: '25%', alignItems: 'center'}}>
              <Text style={styles.details_header_texts}>Name</Text>
            </View>
            <View style={{width: '25%', alignItems: 'center'}}>
              <Text style={styles.details_header_texts}>Emp Id</Text>
            </View>
            <View style={{width: '25%', alignItems: 'center'}}>
              <Text style={styles.details_header_texts}>Depart</Text>
            </View>
            <View style={{width: '25%', alignItems: 'center'}}>
              <Text style={styles.details_header_texts}>View Report</Text>
            </View>
          </View>
          {activeLoader.firstLoader ? (
            <ActivityIndicator
              size={'large'}
              color={CssVariables.darkgreen}
              style={styles.loader_style}
            />
          ) : (
            <FlatList
              data={employeeDetails}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={activeLoader.firstLoader}
                  onRefresh={getAllEmplooyee}
                />
              }
            />
          )}
          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={closeModal}>
            <View style={styles.modal_body}>
              {activeLoader.secondLoader ? (
                <ActivityIndicator
                  size={'large'}
                  color={CssVariables.darkgreen}
                  style={styles.loader_style}
                />
              ) : (
                <View style={styles.modal_cont}>
                  <View style={styles.drop_down_layer}>
                    <CustomDropDown
                      label="Select report type"
                      data={reportTypes}
                      onSelect={setReportType}
                    />
                  </View>
                  {reportType.reportType === 'Monthly Report' && (
                    <>
                      <View style={styles.drop_down_layer}>
                        <CustomDropDown
                          label="Select Month"
                          data={months}
                          onSelect={setMonth}
                        />
                      </View>
                      <View style={styles.drop_down_layer}>
                        <CustomDropDown
                          label="Select Year"
                          data={years}
                          onSelect={setYear}
                        />
                      </View>
                    </>
                  )}
                  {reportType.reportType === 'Yearly Report' && (
                    <View style={styles.drop_down_layer}>
                      <CustomDropDown
                        label="Select Year"
                        data={years}
                        onSelect={setYear}
                      />
                    </View>
                  )}
                  <View style={styles.mont_att_report}>
                    <Text style={styles.mont_att_rep_text}>
                      Monthly Attendance Report
                    </Text>
                    <Text style={styles.cu_mo_text}>
                      Attendance report for the month of{' '}
                      {moment(date).format('MMM')}
                    </Text>
                    <View>
                      <Text style={styles.num_of_wo_day}>
                        Number of working days: {workingDay ? workingDay : 0}
                      </Text>
                      <Text style={styles.unpaid_text}>
                        Unpaid leaves : {unPaidLeave ? unPaidLeave : 0}
                      </Text>
                      <Text style={styles.paid_text}>
                        Paid leave: {paidLeave ? paidLeave : 0}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.details_header_text}>
                    <View style={{width: '50%', alignItems: 'center'}}>
                      <Text style={styles.details_header_texts}>Date</Text>
                    </View>
                    <View style={{width: '50%', alignItems: 'center'}}>
                      <Text style={styles.details_header_texts}>Status</Text>
                    </View>
                  </View>
                  <ScrollView>
                    {specificDetails.map((item, key) => {
                      // setSecModalVisible(item);
                      const text = () => {
                        if (item.description === 'WO') {
                          return 'Week off';
                        } else if (item.holidayDate) {
                          return 'Holiday';
                        } else if (item.attendanceType) {
                          return `Present, Working hours-${item.workingHour}`;
                        } else if (item.leaveType) {
                          return `Leave, ${item.leaveType}`;
                        }
                      };
                      return (
                        <View style={styles.details_cont_text} key={key}>
                          <View
                            style={{
                              width: '50%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={styles.details_name_texts}>
                              {item.date}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: '50%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={styles.details_depart_texts}>
                              {text()}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </ScrollView>
                  <Pressable
                    // desable={year ? false : true}
                    onPress={() => createPdf()}>
                    <Text
                      style={{
                        color: year ? CssVariables.blue : CssVariables.gray,
                        fontFamily: CssVariables.mulishmedium,
                        fontSize: 18,
                      }}>
                      Download Report
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
            <FailedModal
              visible={failedModal}
              onRequestClose={() => setFailedModal(false)}
              properties={{
                failed: 'reject',
                modalFalse: setFailedModal,
              }}
            />
            <SuccessModal
              visible={successModal}
              onRequestClose={() => setSuccessModal(false)}
              properties={{
                success: 'vrifysuccess',
                modalFalse: setSuccessModal,
                message: verifyMsg,
              }}
            />
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
      </Modal>
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
  create_empl_img: {
    width: 63,
    height: 60,
    marginRight: 10,
  },
  input_con: {
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    height: 45,
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: CssVariables.light_white,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    paddingLeft: 40,
    borderRadius: 4,
    flexShrink: 1,
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
  },
  search_icon: {
    position: 'absolute',
    width: 25,
    height: 25,
    alignSelf: 'center',
    left: 5,
  },
  filter_icon: {
    position: 'absolute',
    alignSelf: 'center',
    right: 10,
  },
  page_filter_con: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    alignItems: 'center',
  },
  page_filter_text: {
    fontFamily: CssVariables.mulishregular,
    fontSize: 16,
    color: CssVariables.black,
  },
  page_filter_drop_down: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page_filter_drop_down_icon: {
    width: 15,
    height: 8,
    marginLeft: 5,
  },
  page_filter_arrow_icon: {
    width: 24,
    height: 24,
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
  details_header_text: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: CssVariables.pencile,
    paddingHorizontal: 5,
    width: '100%',
  },
  details_header_texts: {
    color: CssVariables.gray,
  },
  loader_style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details_cont_text: {
    flexDirection: 'row',
    backgroundColor: CssVariables.white,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  details_name_texts: {
    color: CssVariables.darkgray,
    fontSize: 16,
    fontFamily: CssVariables.mulishmedium,
    // marginVertical: '10%',
  },
  details_depart_texts: {
    fontSize: 13,
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.gray,
    // marginVertical: '17%',
  },
  details_view_texts: {
    fontSize: 13,
    fontFamily: CssVariables.mulishmedium,
    marginVertical: '17%',
  },
  modal_body: {
    height: '100%',
  },
  modal_cont: {
    height: '100%',
    backgroundColor: CssVariables.white,
    // paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'relative',
    alignItems: 'center',
  },
  status_image_con: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  status_image: {
    width: 35,
    height: 35,
  },
  status_text: {
    fontWeight: 'bold',
  },
  employee_status_text: {
    color: CssVariables.black,
    fontFamily: CssVariables.mulishregular,
  },
  deactive_button: {
    borderWidth: 1,
    borderColor: CssVariables.light_gray,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  deactive_text: {
    color: CssVariables.white,
    fontSize: 20,
    fontFamily: CssVariables.mulishmedium,
    padding: 5,
  },
  active_button: {
    backgroundColor: CssVariables.green,
    borderWidth: 1,
    borderColor: CssVariables.blue,
    borderRadius: 4,
    marginHorizontal: '8%',
  },
  active_text: {
    fontSize: 20,
    color: CssVariables.white,
    fontFamily: CssVariables.mulishmedium,
    padding: 5,
  },
  detail_box: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  drop_down_layer: {
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: CssVariables.light_gray,
    marginVertical: 10,
    width: '80%',
  },
  mont_att_report: {
    width: '98%',
    backgroundColor: CssVariables.light_thin_pink,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 8,
    borderRadius: 5,
  },
  mont_att_rep_text: {
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.black,
    fontSize: 18,
    marginVertical: 5,
  },
  cu_mo_text: {
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.gray,
    fontSize: 16,
    marginVertical: 5,
  },
  num_of_wo_day: {
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.green,
    fontSize: 18,
    marginVertical: 5,
  },
  unpaid_text: {
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.red,
    fontSize: 18,
    marginVertical: 5,
  },
  paid_text: {
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.yellow,
    fontSize: 18,
    marginVertical: 5,
  },
  company_logo: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderRadius: 4,
  },
  active_status_text: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 20,
  },
  employee_id_text_sec: {
    color: CssVariables.black,
    fontSize: 15,
    fontFamily: CssVariables.mulishregular,
    marginTop: 5,
  },
  employee_name: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 20,
    color: CssVariables.black,
    marginTop: 5,
  },
  mobile_email_text: {
    fontSize: 16,
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.skyblack,
    marginTop: 5,
  },
  view_doc_text: {
    color: CssVariables.blue,
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: CssVariables.blue,
    marginTop: 5,
    marginBottom: 10,
  },
  details_input_con: {
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    borderRadius: 4,
    marginBottom: 10,
    borderColor: CssVariables.light_gray,
    backgroundColor: CssVariables.light_white,
  },
  detail_text: {
    color: CssVariables.gray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 16,
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
    width: '90%',
    height: 370,
    backgroundColor: CssVariables.white,
    borderRadius: 15,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
  },
  po_create_depa_input: {
    width: '50%',
    height: '95%',
    backgroundColor: CssVariables.white,
    borderRadius: 15,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
  },
  select_depart_text: {
    fontFamily: CssVariables.mulishregular,
    fontSize: 18,
    color: CssVariables.black,
    marginVertical: 10,
  },
  create_depa_input_con: {
    width: '95%',
    paddingBottom: '10%',
  },
  po_create_depa_input_con: {
    width: '95%',
    paddingBottom: '10%',
    height: '30%',
  },
  button_con: {
    width: '80%',
    alignItems: 'center',
  },
});

const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}
h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }
/* table */
table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }
/* page */
html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }
body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }
/* header */
header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }
header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }
/* article */
article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }
article address { float: left; font-size: 125%; font-weight: bold; }
/* table meta & balance */
table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }
/* table meta */
table.meta th { width: 40%; }
table.meta td { width: 60%; }
/* table items */
table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }
table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }
/* table balance */
table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }
/* aside */
aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;
