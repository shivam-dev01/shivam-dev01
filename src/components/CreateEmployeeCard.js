import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import CustomButton from '../components/CustomButton';
import CoustomTextInput from '../components/CoustomTextInput';
import {CssVariables} from '../constants/CssVariables';
import CustomDropDown from './CustomDropDown';
import {Api} from '../classes/Api';
import {apiEndPoints} from '../constants/apiEndPoints';
import {FilePaths} from '../constants/filepath';
import SuccessModal from './SuccessModal';
import FailedModal from './FailedModal';
import DocumentPicker from 'react-native-document-picker';
import {Helper} from '../classes/Helper';

export default function CreateEmployeeCard({navigation}) {
  const backFunction = () => {
    fullName.current.setTextInput('');
    mobileNumber.current.setTextInput('');
    emailId.current.setTextInput('');
    aadhaarNumber.current.setTextInput('');
    setDepartment('');
    setJobRole('');
    setDocumentType('');
    setGenerateId('');
    setDocumentType('');
    setPdf('');
    setFileName('');
  };
  const fullName = useRef('');
  const mobileNumber = useRef('');
  const emailId = useRef('');
  const aadhaarNumber = useRef('');
  const otherDoc = useRef('');

  const [department, setDepartment] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [fileName, setFileName] = useState('');
  const [pdf, setPdf] = useState('');
  const [generateId, setGenerateId] = useState('');
  const [allDepartment, setAllDepartment] = useState('');
  const [fetchJobRole, setFetchJobeRole] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [depaError, setDepaError] = useState('');
  const [jobErro, setJobError] = useState('');
  const [message, setMessage] = useState('');
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
    thirdLoader: false,
    fourthLoader: false,
  });
  useEffect(() => {
    getAllDepartment();
  }, []);

  const noDepa = [
    {
      error: activeLoader.thirdLoader
        ? 'Loading...'
        : 'You have not created department.Please Create first.',
    },
  ];

  const noJobRole = [
    {
      error: activeLoader.fourthLoader
        ? 'Loading...'
        : 'You have not created a job role for this department. Please Create first.',
    },
  ];

  const getAllDepartment = () => {
    setActiveLoader({thirdLoader: true});
    const apiParams = {
      url: apiEndPoints.get_all_department,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setAllDepartment(res.result);
        setActiveLoader({thirdLoader: false});
      },
      errorFunction: error => {
        // console.log('--error Depa--', error);
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

  const getAllJobeRole = _id => {
    setActiveLoader({fourthLoader: true});
    const apiParams = {
      url: `${apiEndPoints.get_all_job_role}/${_id}`,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        // console.log('--res--', res);
        setFetchJobeRole(res.result);
        setActiveLoader({fourthLoader: false});
      },
      errorFunction: error => {
        // console.log('--error Job--', error);
        if (error === undefined) {
          setActiveLoader({fourthLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({fourthLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({fourthLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const getEmplooyeId = () => {
    setActiveLoader({firstLoader: true});
    const apiParams = {
      url: apiEndPoints.generate_employee_id,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        // console.log('--res--', res);
        setActiveLoader(false);
        setGenerateId(res.result);
      },
      errorFunction: error => {
        // console.log('--error EmpId--', error);
        if (error.result === 'config') {
          setFailedModal(true);
        }
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
    };
    Api.callApi(apiParams);
  };

  const browseImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'File Access',
          message: 'We Need Your File Access to Upload documents',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });
        if (res !== null) {
          const data = new FormData();
          data.append('myFile', {
            uri: res[0].uri,
            type: res[0].type,
            name: res[0].name,
          });
          // console.log('FORMDATA', {
          //   uri: res[0].uri,
          //   type: res[0].type,
          //   name: res[0].name,
          // });
          setPdf(data);
          setFileName(res[0]);
        } else {
          alert('Please Select File first');
        }
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        alert('Canceld');
      } else {
        alert('Unknown error: ' + JSON.stringify(error));
        throw error;
      }
    }
  };

  const documentTypes = [
    {doc: 'Aadhaar card'},
    {doc: 'Pan card'},
    {doc: 'Voter Id'},
    {doc: 'Passport'},
    {doc: 'Other'},
  ];

  const createEmployee = () => {
    if (
      !department ||
      !jobRole ||
      fullName.current.textInput.length < 2 ||
      mobileNumber.current.textInput.length < 10
      // aadhaarNumber.current.textInput.length < 12
    ) {
      fullName.current.inputError();
      mobileNumber.current.inputError();
      emailId.current.inputError();
      // aadhaarNumber.current.inputError();
      setDepaError('This Field is required.');
      setJobError('This Field is required.');
    } else if (
      department ||
      jobRole ||
      fullName.current.textInput.length > 2 ||
      mobileNumber.current.textInput.length === 10 ||
      aadhaarNumber.current.textInput.length === 12
    ) {
      setDepaError('');
      setJobError('');
      setActiveLoader({secondLoader: true});
      const apiParams = {
        url: apiEndPoints.create_employee,
        requestMethod: 'post',
        hideResponseMsg: true,
        response: res => {
          setActiveLoader({secondLoader: false});
          console.log('--create Employee res--', res);
          if (res.status === 200) {
            setModalVisible(true);
            setMessage(res.message);
            fullName.current.setTextInput('');
            mobileNumber.current.setTextInput('');
            emailId.current.setTextInput('');
            aadhaarNumber.current.setTextInput('');
            setDepartment('');
            setJobRole('');
            setDocumentType('');
            setGenerateId('');
            setDocumentType('');
            setPdf('');
            setFileName('');
          }
        },
        errorFunction: error => {
          console.log('--carete Employee error---', error);
          error &&
            error.result.map(data => {
              if (data.param === 'emailId') {
                emailId.current.inputError(data.msg);
              }
              if (data.param === 'mobileNumber') {
                mobileNumber.current.inputError(data.msg);
              }
              if (data.param === 'aadhaarNumber') {
                aadhaarNumber.current.inputError(data.msg);
              }
            });
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
          fullName: fullName.current.textInput,
          emailId: emailId.current.textInput,
          department: department.department,
          selectDocumentType:
            documentType && documentType.doc === 'Other'
              ? otherDoc.current.textInput
              : documentType.doc,
          mobileNumber: mobileNumber.current.textInput,
          aadhaarNumber: aadhaarNumber.current.textInput,
          jobRole: jobRole.jobRole,
          image: pdf,
          employeeId: generateId,
        },
      };
      Api.callApi(apiParams);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.last_container}
        disableScrollViewPanResponder={true}>
        <View style={styles.password_container}>
          <View
            style={[
              styles.drop_down_con,
              {
                borderColor:
                  depaError === '' || department.department
                    ? CssVariables.light_gray
                    : CssVariables.red,
              },
            ]}>
            <CustomDropDown
              label="Department"
              data={allDepartment}
              onSelect={setDepartment}
              noData={noDepa}
              getJobRole={getAllJobeRole}
            />
          </View>
          <Text style={styles.error_text}>
            {!department ? depaError : null}
          </Text>
        </View>
        <View style={styles.password_container}>
          <View
            style={[
              styles.drop_down_con,
              {
                borderColor:
                  jobErro === '' || jobRole.jobRole
                    ? CssVariables.light_gray
                    : CssVariables.red,
              },
            ]}>
            {department && department.department ? (
              <CustomDropDown
                label="Job role"
                data={fetchJobRole}
                onSelect={setJobRole}
                noData={noJobRole}
              />
            ) : (
              <View style={styles.button}>
                <Text style={styles.buttonText}>Job role</Text>
              </View>
            )}
          </View>
          <Text style={styles.error_text}>{!jobRole ? jobErro : null}</Text>
        </View>
        <View style={styles.employee_id_cont}>
          <View style={styles.id_con}>
            <Text
              style={[
                styles.employee_id_text,
                {
                  color: generateId
                    ? CssVariables.dark_blue
                    : CssVariables.gray,
                },
              ]}>
              {generateId ? generateId : 'Employee Id'}
            </Text>
          </View>
          <Pressable
            disabled={jobRole ? false : true}
            style={[
              styles.generate_button,
              {
                backgroundColor: jobRole
                  ? CssVariables.sky_blue
                  : CssVariables.light_gray,
              },
            ]}
            onPress={getEmplooyeId}>
            {activeLoader.firstLoader ? (
              <ActivityIndicator size={'small'} color={CssVariables.white} />
            ) : (
              <Text
                style={{
                  color: CssVariables.white,
                  fontSize: 16,
                  fontFamily: CssVariables.mulishregular,
                }}>
                Generate
              </Text>
            )}
          </Pressable>
        </View>
        <View style={styles.password_container}>
          <CoustomTextInput
            ref={fullName}
            properties={{
              fieldType: 'employee_name',
            }}
          />
        </View>
        <View style={styles.password_container}>
          <CoustomTextInput
            ref={mobileNumber}
            properties={{
              fieldType: 'employee_number',
            }}
          />
        </View>
        <View style={styles.password_container}>
          <CoustomTextInput
            ref={emailId}
            properties={{
              fieldType: 'employee_emailid',
            }}
          />
        </View>
        <View style={styles.password_container}>
          {documentType.doc === 'Other' ? (
            <CoustomTextInput
              ref={otherDoc}
              properties={{
                fieldType: 'otherdoc',
              }}
            />
          ) : (
            <>
              <View
                style={[
                  styles.drop_down_con,
                  {borderColor: CssVariables.light_gray},
                ]}>
                <CustomDropDown
                  label="Document type"
                  data={documentTypes}
                  onSelect={setDocumentType}
                />
              </View>
              <Text style={styles.error_text}>{''}</Text>
            </>
          )}
        </View>
        <View style={styles.password_container}>
          <CoustomTextInput
            ref={aadhaarNumber}
            properties={{
              fieldType: 'employee_adhnumber',
            }}
          />
        </View>
        <View style={styles.password_container}>
          <Pressable
            style={[
              styles.image_selctor_con,
              {
                borderColor: CssVariables.light_gray,
              },
            ]}
            onPress={browseImage}>
            <Text
              style={{
                width: '55%',
                color: fileName ? CssVariables.dark_blue : CssVariables.gray,
                fontFamily: CssVariables.mulishregular,
                fontSize: 14,
              }}>
              {fileName && fileName.name
                ? fileName.name.split(' / ')[0]
                : 'Upload document'}
            </Text>
            <Image
              source={FilePaths.attached}
              style={{width: 20, height: 27, marginRight: 15}}
            />
          </Pressable>
        </View>
        <View style={styles.save_cancle_button_con}>
          <CustomButton
            onPress={createEmployee}
            text={
              activeLoader.secondLoader ? (
                <ActivityIndicator size={'small'} color={CssVariables.white} />
              ) : (
                'Create Employee'
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
        </View>
      </ScrollView>
      <SuccessModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        properties={{
          success: 'createemployee',
          modalFalse: setModalVisible,
          message: message,
        }}
      />
      <FailedModal
        visible={failedModal}
        onRequestClose={() => setFailedModal(false)}
        properties={{
          failed: 'noconfigId',
          modalFalse: setFailedModal,
          navigation: navigation,
          backFunction: backFunction,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
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
  upper_text_cont: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CssVariables.darkgreen,
    height: 60,
  },
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
  details_header_text: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: CssVariables.pencile,
  },
  button_con: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 30,
  },
  last_container: {
    width: '100%',
    paddingHorizontal: '7%',
    marginTop: '2%',
    paddingBottom: 90,
  },
  employee_id_cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  id_con: {
    flexDirection: 'row',
    borderRadius: 25,
    borderColor: CssVariables.light_gray,
    backgroundColor: CssVariables.drop_down_bg,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  employee_id_text: {
    fontSize: 14,
    fontFamily: CssVariables.mulishregular,
  },
  generate_button: {
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 4,
    width: 100,
    alignItems: 'center',
    height: 40,
    borderColor: CssVariables.light_gray,
    alignSelf: 'flex-end',
  },
  password_container: {
    paddingBottom: 5,
    position: 'relative',
    // borderWidth: 1,
    // height: 60,
  },
  details_texts: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
  },
  one_text: {
    fontSize: 20,
    fontFamily: CssVariables.mulishmedium,
  },
  save_cancle_button_con: {
    marginTop: 20,
    alignItems: 'center',
  },
  image_selctor_con: {
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    alignItems: 'center',
    paddingLeft: 42,
    backgroundColor: CssVariables.drop_down_bg,
  },
  browse_button: {
    width: 100,
    borderRadius: 4,
    right: -1,
    backgroundColor: CssVariables.darkgreen,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 2,
    height: '100%',
  },
  browse_text: {
    color: CssVariables.white,
    fontSize: 18,
    fontFamily: CssVariables.mulishmedium,
  },
  drop_down_con: {
    width: '100%',
    borderRadius: 50,
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingLeft: 32,
    backgroundColor: CssVariables.drop_down_bg,
  },
  error_con: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  error_text: {
    // position: 'absolute',
    marginLeft: 25,
    marginTop: 3,
    color: CssVariables.red,
    fontFamily: CssVariables.mulishregular,
  },
  button: {
    backgroundColor: CssVariables.drop_down_bg,
    height: 50,
    zIndex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
  },
  buttonText: {
    color: CssVariables.gray,
    fontFamily: CssVariables.mulishregular,
  },
  button_con: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
});
