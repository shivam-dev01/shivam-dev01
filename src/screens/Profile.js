import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import CustomMenu from '../components/CustomMenu';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import InputField from '../components/CoustomTextInput';
import CustomButton from '../components/CustomButton';
import {Api} from '../classes/Api';
import {apiEndPoints} from '../constants/apiEndPoints';
import {Helper} from '../classes/Helper';
import SuccessModal from '../components/SuccessModal';
import {useOrientation} from '../components/useOrientation';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Profile({navigation}) {
  const oriantaion = useOrientation();
  const [showMenu, setShowMenu] = useState(false);
  const [showOrganizationDetails, setShowOrganizationDetails] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(true);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [transgender, setTransGender] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [message, setMessage] = useState('');
  const [gender, setGender] = useState('');
  // console.log('---gender--', gender);
  const [activeLoader, setActiveLoader] = useState({
    firstLoader: false,
    secondLoader: false,
  });
  const [editable, setEditable] = useState(false);
  const [orgEditable, setOrgEditable] = useState(false);
  // console.log('--adminId--------------', adminId);
  const degi = useRef('');
  const orgtype = useRef('');
  const dob = useRef('');
  const email = useRef('');
  const adhnum = useRef('');
  const busweb = useRef('');
  const offnum = useRef('');
  const pnnum = useRef('');
  const busemail = useRef('');
  const buspan = useRef('');
  const gstinnum = useRef('');
  const padd = useRef('');
  const oadd = useRef('');

  console.log('--image-uri--', imageUri);

  useEffect(() => {
    Helper.getLoginData(data => {
      // console.log('--data--', data);
      setAdminId(data.result);
    });
    if (showPersonalDetails) {
      getPresonalDetails();
    } else if (showOrganizationDetails) {
      getOrgDetails();
    }
  }, [showOrganizationDetails, showPersonalDetails]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setShowMenu(!showMenu);
          }}>
          <Image
            source={showMenu ? FilePaths.menucrossbutton : FilePaths.menubutton}
            style={styles.menu_cross_icon}
          />
        </TouchableOpacity>
      ),
    });
  }, [showMenu]);

  const selectImage = () => {
    Alert.alert('Profile Picture', 'Chose an Option', [
      {text: 'Cancle', onPress: () => {}},
      {text: 'Gallery', onPress: chooseFile},
      {text: 'Camera', onPress: captureImage},
    ]);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 100,
      maxHeight: 120,
      quality: 1,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      const result = await launchCamera(options);
      if (result !== null) {
        const uri = result.assets[0].uri;
        const response = await fetch(uri);
        const blob = await response.blob();
        getImage(result.assets[0].fileName, blob);
        console.log('--blob--', blob);
      }
      if (result.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (result.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
        return;
      } else if (result.errorCode == 'permission') {
        console.log('Permission not satisfied');
        return;
      } else if (result.errorCode == 'others') {
        console.log(result.errorMessage);
        return;
      }
    }
  };

  const chooseFile = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 750,
      quality: 1,
    };
    const result = await launchImageLibrary(options);
    if (result !== null) {
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();
      getImage(result.assets[0].fileName, blob);
      console.log('--blob--', blob);
    } else if (result.didCancel) {
      console.log('User cancelled camera picker');
      return;
    } else if (result.errorCode == 'camera_unavailable') {
      console.log('Camera not available on device');
      return;
    } else if (result.errorCode == 'permission') {
      console.log('Permission not satisfied');
      return;
    } else if (result.errorCode == 'others') {
      console.log(result.errorMessage);
      return;
    }
  };

  const getImage = async (fileName, data) => {
    const apiParams = {
      url: `${apiEndPoints.upload_dp}=write&fileName=${fileName}`,
      requestMethod: 'get',
      response: res => {
        console.log('--resfilename--', res);
        fetch(res.result.url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          body: data,
        })
          .then(result => {
            // console.log('---uploaded--', result);
            getProfileImage(res.result.fileName, '');
          })
          .catch(error => {
            console.log('---error---', error);
          });
      },
      errorFunction: error => {
        console.log('--error--', error);
      },
      endFunction: () => {
        console.log('End Function Called');
      },
    };
    Api.callApi(apiParams);
  };
  const getProfileImage = (fileName, profileImage) => {
    console.log('--fileName--', fileName);
    const apiParams = {
      url:
        fileName === ''
          ? `${apiEndPoints.upload_dp}=read&fileName=${profileImage}`
          : `${apiEndPoints.upload_dp}=read&fileName=${fileName}`,
      requestMethod: 'get',
      response: res => {
        console.log('--res--', res);
        setImageUri(res.result.url);
        if (fileName !== '') {
          const insertFileName = {
            url: `${apiEndPoints.insert_filename}/${adminId.id}`,
            requestMethod: 'put',
            response: res => {
              console.log('--res--', res);
            },
            errorFunction: error => {
              console.log('--error--', error);
            },
            endFunction: () => {
              console.log('End Function Called');
            },
            input: {
              profileImage: fileName,
            },
          };
          Api.callApi(insertFileName);
        }
      },
      errorFunction: error => {
        console.log('--error--', error);
      },
      endFunction: () => {
        console.log('End Function Called');
      },
    };
    Api.callApi(apiParams);
  };

  const getPresonalDetails = () => {
    setActiveLoader({secondLoader: true});
    const apiParams = {
      url: apiEndPoints.get_admin_details,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setActiveLoader({secondLoader: false});
        getProfileImage('', res.result[0].profileImage);
        console.log(
          '---dsfdsfdsfdsf==================================================dfdsfdsfsf======================================================-',
          res,
        );
        if (res && res.result[0].DOB) {
          setEditable(true);
          setGender(res.result[0]);
          const addData = res.result[0].personalAddress;
          for (let i = 0; i < addData.length; i++) {
            padd.current.setTextInput(addData[i]);
          }
          dob.current.setTextInput(res.result[0].DOB);
          email.current.setTextInput(res.result[0].emailId);
          adhnum.current.setTextInput(res.result[0].aadhaarNumber);
          pnnum.current.setTextInput(res.result[0].panCardNumber);
        } else {
          setEditable(false);
        }
      },
      errorFunction: error => {
        // console.log('--error--', error);
        if (error === undefined) {
          setActiveLoader({secondLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({secondLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End Function called');
        setActiveLoader({secondLoader: false});
      },
    };
    Api.callApi(apiParams);
  };

  const getOrgDetails = () => {
    setActiveLoader({secondLoader: true});
    const apiParams = {
      url: apiEndPoints.get_org_details,
      requestMethod: 'get',
      hideResponseMsg: true,
      response: res => {
        setActiveLoader({secondLoader: false});
        const data = res.result[0];
        console.log('--res--', data);
        if (data && data !== undefined) {
          setOrgEditable(true);
          const stingMob = res.result[0].officialMobileNumber;
          degi.current.setTextInput(res.result[0].designation);
          orgtype.current.setTextInput(res.result[0].organizationType);
          offnum.current.setTextInput(stingMob.toString());
          busweb.current.setTextInput(res.result[0].businessWebsite);
          busemail.current.setTextInput(res.result[0].businessEmail);
          buspan.current.setTextInput(res.result[0].businessPanCardNumber);
          gstinnum.current.setTextInput(res.result[0].gstNumber);
          oadd.current.setTextInput(res.result[0].organizationAddress);
        } else {
          setOrgEditable(false);
        }
      },
      errorFunction: error => {
        // console.log('--error--', error);
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
    };
    Api.callApi(apiParams);
  };

  const updateAdminDetails = () => {
    setActiveLoader({firstLoader: true});
    const apiParams = {
      url: `${apiEndPoints.update_admin_details}/${adminId.id}`,
      requestMethod: 'put',
      hideResponseMsg: true,
      response: res => {
        // console.log('--res--', res);
        if (res.status === 200) {
          setMessage(res.message);
          getPresonalDetails();
          setModalVisible(true);
          setActiveLoader({firstLoader: false});
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
        } else {
          setActiveLoader({firstLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End Function Called');
        setActiveLoader({firstLoader: false});
      },
      input: {
        gender: male
          ? 'MALE'
          : null || female
          ? 'FEMAILE'
          : null || transgender
          ? 'TRANSGENDER'
          : null,
        aadhaarNumber: adhnum.current.textInput,
        emailId: email.current.textInput,
        DOB: dob.current.textInput,
        panCardNumber: pnnum.current.textInput,
        personalAddress: [padd.current.textInput],
      },
    };
    Api.callApi(apiParams);
  };

  const fillOrgDetails = () => {
    setActiveLoader({firstLoader: true});
    const apiParams = {
      url: apiEndPoints.fill_org_details,
      requestMethod: 'post',
      hideResponseMsg: true,
      response: res => {
        console.log('--res--', res);
        if (res.status === 200) {
          setModalVisible(true);
          setMessage(res.message);
          getOrgDetails();
        }
        setActiveLoader({firstLoader: false});
      },
      errorFunction: error => {
        console.log('--error--', error);
        if (error === undefined) {
          setActiveLoader({firstLoader: false});
          Helper.showToastMessage('Something went wrong.');
        } else {
          setActiveLoader({firstLoader: false});
        }
      },
      endFunction: () => {
        // console.log('End function Called');
        setActiveLoader({firstLoader: false});
      },
      input: {
        adminName: adminId.fullName,
        mobileNumber: adminId.mobileNumber,
        organizationName: adminId.organizationName,
        designation: degi.current.textInput,
        organizationType: orgtype.current.textInput,
        officialMobileNumber: offnum.current.textInput,
        businessWebsite: busweb.current.textInput,
        businessPanCardNumber: buspan.current.textInput,
        gstNumber: gstinnum.current.textInput,
        organizationAddress: oadd.current.textInput,
        businessEmail: busemail.current.textInput,
      },
    };
    Api.callApi(apiParams);
  };

  const savePersonalDetails = () => {
    if (
      email.current.textInput.length < 6 ||
      adhnum.current.textInput.length < 12 ||
      padd.current.textInput.length < 5 ||
      dob.current.textInput.length < 4
    ) {
      email.current.inputError();
      adhnum.current.inputError();
      padd.current.inputError();
      dob.current.inputError();
    } else if (male === true || female === true || transgender === true) {
      updateAdminDetails();
    } else {
      Helper.showToastMessage('Please select gender.');
    }
  };

  const saveOrgDetails = () => {
    if (
      degi.current.textInput.length < 2 ||
      orgtype.current.textInput.length < 2 ||
      offnum.current.textInput < 10 ||
      busemail.current.textInput < 6 ||
      gstinnum.current.textInput.length < 10 ||
      oadd.current.textInput.length < 5
    ) {
      degi.current.inputError();
      orgtype.current.inputError();
      offnum.current.inputError();
      busemail.current.inputError();
      gstinnum.current.inputError();
      oadd.current.inputError();
    } else {
      fillOrgDetails();
    }
  };

  return (
    <>
      <View style={oriantaion === 'PORTRAIT' ? styles.body : styles.po_body}>
        <CustomMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          navigation={navigation}
        />
        <View
          style={
            oriantaion === 'PORTRAIT'
              ? styles.content_container
              : styles.po_content_container
          }>
          <ScrollView disableScrollViewPanResponder={true}>
            <View style={styles.upper_container}>
              {oriantaion === 'PORTRAIT' ? (
                <View style={styles.detail_box}>
                  <View style={styles.profile_photo}>
                    <Pressable style={styles.img_con} onPress={selectImage}>
                      <Image
                        source={FilePaths.edit}
                        style={{width: 20, height: 20}}
                      />
                    </Pressable>
                    <Image
                      source={
                        imageUri ? {uri: imageUri} : FilePaths.profilephto
                      }
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                  <Text style={styles.admin_and_organization_text}>
                    {adminId.fullName}
                  </Text>
                  <Text style={styles.admin_and_organization_text}>
                    {adminId.organizationName}
                  </Text>
                  <Text style={styles.designation_and_bussinesstype_text}>
                    {adminId.mobileNumber}
                  </Text>
                </View>
              ) : null}
              <View style={styles.personal_org_con}>
                <TouchableOpacity
                  style={[
                    styles.personal_details_con,
                    {
                      borderBottomColor: showOrganizationDetails
                        ? CssVariables.lightee_gray
                        : CssVariables.darkgreen,
                    },
                  ]}
                  onPress={() =>
                    setShowOrganizationDetails(false) ||
                    setShowPersonalDetails(true)
                  }>
                  <Text style={styles.personal_details_text}>
                    Personal Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.org_details_con,
                    {
                      borderBottomColor: showOrganizationDetails
                        ? CssVariables.darkgreen
                        : CssVariables.lightee_gray,
                    },
                  ]}
                  onPress={() => {
                    setShowOrganizationDetails(true) ||
                      setShowPersonalDetails(false);
                  }}>
                  <Text style={styles.org_details_text}>
                    Organization Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lower_container}>
              <Text style={styles.personal_and_org_details_text}>
                {showOrganizationDetails
                  ? 'Organization Details'
                  : 'Personal Details'}
              </Text>
              {showOrganizationDetails === false && (
                <>
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={styles.personal_details_organization_details_text}>
                      Gender
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 5}}>
                    <View style={{flexDirection: 'row', marginHorizontal: 4}}>
                      <TouchableOpacity
                        style={[
                          styles.radio_button,
                          {
                            backgroundColor:
                              male || gender.gender === 'MALE'
                                ? CssVariables.green
                                : CssVariables.white,
                          },
                        ]}
                        onPress={() =>
                          setFemale(false) ||
                          setTransGender(false) ||
                          setMale(true)
                        }
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setFemale(false) ||
                          setTransGender(false) ||
                          setMale(true)
                        }>
                        <Text
                          style={
                            styles.personal_details_organization_details_text
                          }>
                          Male
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', marginHorizontal: 4}}>
                      <TouchableOpacity
                        style={[
                          styles.radio_button,
                          {
                            backgroundColor:
                              female || gender.gender === 'FEMALE'
                                ? CssVariables.green
                                : CssVariables.white,
                          },
                        ]}
                        onPress={() =>
                          setMale(false) ||
                          setTransGender(false) ||
                          setFemale(true)
                        }
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setMale(false) ||
                          setTransGender(false) ||
                          setFemale(true)
                        }>
                        <Text
                          style={
                            styles.personal_details_organization_details_text
                          }>
                          Female
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', marginHorizontal: 4}}>
                      <TouchableOpacity
                        style={[
                          styles.radio_button,
                          {
                            backgroundColor:
                              transgender || gender.gender === 'TRANSGENDER'
                                ? CssVariables.green
                                : CssVariables.white,
                          },
                        ]}
                        onPress={() =>
                          setMale(false) ||
                          setFemale(false) ||
                          setTransGender(true)
                        }
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setMale(false) ||
                          setFemale(false) ||
                          setTransGender(true)
                        }>
                        <Text
                          style={
                            styles.personal_details_organization_details_text
                          }>
                          Other
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
              {showOrganizationDetails ? (
                <View style={styles.password_container}>
                  <Text style={styles.details_texts}>Designation</Text>
                  <InputField
                    ref={degi}
                    properties={{
                      fieldType: 'designation',
                      editable: orgEditable,
                    }}
                  />
                </View>
              ) : null}
              <View style={styles.number_container}>
                <Text style={styles.details_texts}>
                  {showOrganizationDetails
                    ? 'Organization Type'
                    : 'Date of Birth'}
                </Text>
                {showPersonalDetails ? (
                  <InputField
                    ref={dob}
                    properties={{
                      fieldType: 'dob',
                      editable: editable,
                    }}
                  />
                ) : null}
                {showOrganizationDetails ? (
                  <InputField
                    ref={orgtype}
                    properties={{
                      fieldType: 'orgtype',
                      editable: orgEditable,
                    }}
                  />
                ) : null}
              </View>
              <View style={styles.password_container}>
                <Text style={styles.details_texts}>
                  {showOrganizationDetails
                    ? 'Official Phone Number'
                    : 'Email Id'}
                </Text>
                {showPersonalDetails ? (
                  <InputField
                    ref={email}
                    properties={{
                      fieldType: 'emailid',
                      editable: editable,
                    }}
                  />
                ) : null}
                {showOrganizationDetails ? (
                  <InputField
                    ref={offnum}
                    properties={{
                      fieldType: 'officialnum',
                      editable: orgEditable,
                    }}
                  />
                ) : null}
              </View>
              <View style={styles.number_container}>
                <Text style={styles.details_texts}>
                  {showOrganizationDetails
                    ? 'Business Website'
                    : 'Aadhaar Number'}
                </Text>
                {showPersonalDetails ? (
                  <InputField
                    ref={adhnum}
                    properties={{
                      fieldType: 'adhnumber',
                      editable: editable,
                    }}
                  />
                ) : null}
                {showOrganizationDetails ? (
                  <InputField
                    ref={busweb}
                    properties={{
                      fieldType: 'busswbsite',
                      editable: orgEditable,
                    }}
                  />
                ) : null}
              </View>
              <View style={styles.password_container}>
                <Text style={styles.details_texts}>
                  {showOrganizationDetails ? 'Business Email' : 'Pan Number'}
                </Text>
                {showPersonalDetails ? (
                  <InputField
                    ref={pnnum}
                    properties={{
                      fieldType: 'pnnumber',
                      editable: editable,
                    }}
                  />
                ) : null}
                {showOrganizationDetails ? (
                  <InputField
                    ref={busemail}
                    properties={{
                      fieldType: 'bussemail',
                      editable: orgEditable,
                    }}
                  />
                ) : null}
              </View>
              {showOrganizationDetails ? (
                <>
                  <View style={styles.number_container}>
                    <Text style={styles.details_texts}>
                      Business PAN Number
                    </Text>
                    <InputField
                      ref={buspan}
                      properties={{
                        fieldType: 'busspan',
                        editable: orgEditable,
                      }}
                    />
                  </View>
                  <View style={styles.password_container}>
                    <Text style={styles.details_texts}>GST IN Number</Text>
                    <InputField
                      ref={gstinnum}
                      properties={{
                        fieldType: 'gstinnum',
                        editable: orgEditable,
                      }}
                    />
                  </View>
                </>
              ) : null}
              <View style={styles.number_container}>
                <Text style={styles.details_texts}>
                  {showOrganizationDetails
                    ? 'Organization address'
                    : 'Personal Address'}
                </Text>
                {showPersonalDetails ? (
                  <InputField
                    ref={padd}
                    properties={{
                      fieldType: 'paddress',
                      editable: editable,
                    }}
                  />
                ) : null}
                {showOrganizationDetails ? (
                  <InputField
                    ref={oadd}
                    properties={{
                      fieldType: 'orgadd',
                      editable: orgEditable,
                    }}
                  />
                ) : null}
              </View>
              {showOrganizationDetails ? (
                <View style={{alignItems: 'center', marginBottom: 5}}>
                  {orgEditable ? (
                    <CustomButton
                      onPress={() => setOrgEditable(false)}
                      text="Edit"
                      properties={{
                        fieldType: 'widthlongdarkgreen',
                      }}
                    />
                  ) : (
                    <CustomButton
                      onPress={saveOrgDetails}
                      text={
                        activeLoader.firstLoader ? (
                          <ActivityIndicator
                            size={'small'}
                            color={CssVariables.white}
                          />
                        ) : (
                          'Save'
                        )
                      }
                      properties={{
                        fieldType: 'widthlongdarkgreen',
                      }}
                    />
                  )}
                </View>
              ) : (
                <View style={{alignItems: 'center', marginBottom: 5}}>
                  {editable ? (
                    <CustomButton
                      onPress={() => setEditable(false)}
                      text="Edit"
                      properties={{
                        fieldType: 'widthlongdarkgreen',
                      }}
                    />
                  ) : (
                    <CustomButton
                      onPress={savePersonalDetails}
                      text={
                        activeLoader.firstLoader ? (
                          <ActivityIndicator
                            size={'small'}
                            color={CssVariables.white}
                          />
                        ) : (
                          'Save'
                        )
                      }
                      properties={{
                        fieldType: 'widthlongdarkgreen',
                      }}
                    />
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <SuccessModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          properties={{
            success: 'adminProfileUpdate',
            modalFalse: setModalVisible,
            message: message,
          }}
        />
        {oriantaion === 'LANDSCAPE' ? (
          <View style={styles.po_detail_box_con}>
            <View style={styles.po_detail_box}>
              <View style={styles.profile_photo}>
                <Pressable style={styles.img_con} onPress={selectImage}>
                  <Image
                    source={FilePaths.edit}
                    style={{width: 20, height: 20}}
                  />
                </Pressable>
                <Image
                  source={imageUri ? {uri: imageUri} : FilePaths.profilephto}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <Text style={styles.admin_and_organization_text}>
                {adminId.fullName}
              </Text>
              <Text style={styles.admin_and_organization_text}>
                {adminId.organizationName}
              </Text>
              <Text style={styles.designation_and_bussinesstype_text}>
                {adminId.mobileNumber}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
      {activeLoader.secondLoader && <View style={styles.loader_body}></View>}
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.white,
  },
  po_body: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: CssVariables.white,
  },
  content_container: {
    width: '100%',
    height: '100%',
    backgroundColor: CssVariables.white,
  },
  po_content_container: {
    width: '60%',
    height: '100%',
    backgroundColor: CssVariables.white,
  },
  menu_cross_icon: {
    width: 48,
    height: 48,
    right: 15,
  },
  upper_container: {
    height: 250,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  detail_box: {
    width: '55%',
    height: '75%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    backgroundColor: CssVariables.pink,
  },
  profile_photo: {
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  img_con: {
    position: 'absolute',
    top: -4,
    right: -3,
    padding: 5,
    zIndex: 1,
  },
  po_detail_box_con: {
    width: '40%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  po_detail_box: {
    width: '80%',
    height: '65%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    backgroundColor: CssVariables.pink,
  },
  company_logo: {
    width: 90,
    height: 75,
    borderWidth: 1,
    borderRadius: 10,
  },
  admin_and_organization_text: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 14,
    color: CssVariables.black,
  },
  designation_and_bussinesstype_text: {
    fontSize: 12,
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.skyblack,
  },
  personal_org_con: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  personal_details_con: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 0,
    borderRightWidth: 25,
    borderBottomWidth: 43,
    borderStyle: 'solid',
    borderRightColor: 'transparent',
    position: 'relative',
    right: -7,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  personal_details_text: {
    color: CssVariables.white,
    fontSize: 15,
    position: 'absolute',
    right: 5,
    fontFamily: CssVariables.mulishmedium,
  },
  org_details_con: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 0,
    borderRightWidth: 25,
    borderBottomWidth: 43,
    borderStyle: 'solid',
    borderRightColor: 'transparent',
    position: 'relative',
    transform: [{rotate: '180deg'}],
    left: -7,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  org_details_text: {
    color: CssVariables.white,
    fontSize: 15,
    position: 'absolute',
    right: -2,
    fontFamily: CssVariables.mulishmedium,
    transform: [{rotate: '180deg'}],
  },
  circle_button: {},
  personal_details_organization_details_text: {
    fontSize: 16,
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.black,
  },
  radio_button: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 3,
    marginRight: 5,
  },
  lower_container: {
    paddingHorizontal: '5%',
  },
  personal_and_org_details_text: {
    fontFamily: CssVariables.mulishmedium,
    fontSize: 20,
    color: CssVariables.black,
  },
  number_container: {
    paddingBottom: 28,
  },
  password_container: {
    paddingBottom: 28,
  },
  details_texts: {
    color: CssVariables.darkgray,
    fontFamily: CssVariables.mulishregular,
    fontSize: 14,
    marginVertical: '1%',
  },
  loader_body: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: CssVariables.lightblack,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
});
