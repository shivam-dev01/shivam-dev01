import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CssVariables} from '../constants/CssVariables';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {apiEndpoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import {LoginButton, RegisterButton} from '../components/CustomButton';
import {SecondLoader, AppLoader} from '../components/Loader';
import {FilePaths} from '../constants/filePath';
import Caretdown from 'react-native-vector-icons/AntDesign';

export default function MobileRecharge({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [circleValue, setCircleValue] = useState(null);
  const [circleList, setCircleList] = useState([]);
  const [operatoreList, setOperatoreList] = useState([]);
  const [planDescription, setPlanDescription] = useState('');
  const [operatoreValue, setOperatoreValue] = useState(null);
  const [fetchPlans, setFetchPlans] = useState('');
  const [amount, setAmount] = useState('');
  const [loaderOn, setLoaderOn] = useState(false);
  const [rechargeLoaderOn, setRechargeLoaderOn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [operator, setOperator] = useState('');
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [circles, setCircles] = useState('');
  const [masterData, setMasterData] = useState('');
  const [search, setSearch] = useState('');
  const [thirdModalVisible, setThirdModalVisible] = useState(false);
  const [circleRotate, setCircleRotate] = useState(false);
  const [operatorRotate, setOperatorRotate] = useState(false);
  const [fourthModalVisible, setFourthModalVisible] = useState(false);
  const [fifthModalVisible, setFifthModalVisible] = useState(false);
  console.log('dklkdlsdklskdslkdlskd', circleValue);
  const mobileRecharge = () => {
    setRechargeLoaderOn(true);
    const apiParams = {
      url: apiEndpoints.DO_RECHAREGE,
      requestMethod: 'post',
      response: res => {
        console.log('-----Response----', res);
        setThirdModalVisible(!thirdModalVisible);
        if (res.message === 'Insufficient balance in the wallet.') {
          setFourthModalVisible(true);
        }
        // if (res.message === 'Insufficient balance in the wallet.') {
        //   setFifthModalVisible(true);
        // }
      },
      errorFunction: error => {
        console.log('-----ERROR-----', error);
        setRechargeLoaderOn(false);
      },
      endFunction: () => {
        console.log('End Function Called.');
        setRechargeLoaderOn(false);
        setThirdModalVisible(!thirdModalVisible);
      },
      input: {
        circleCode: circleValue,
        operatorCode: operatoreValue,
        rechargeAmount: amount,
        rechargeNumber: mobileNumber,
      },
    };
    Api.callApi(apiParams);
  };
  useEffect(() => {
    fetchCircle();
    fetchOperatord();
  }, []);
  const fetchCircle = () => {
    const apiParams = {
      url: apiEndpoints.FETCH_CIRCLE,
      requestMethod: 'get',
      response: res => {
        console.log(res);
        setCircleList(res);
      },
      errorFunction: error => {
        console.log('-----ERROR-----', error);
      },
      endFunction: () => {
        console.log('End Function Called.');
      },
      input: {},
    };
    Api.callApi(apiParams);
  };

  let circle = [];
  if (circleList) {
    circle = circleList.map((data, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={async () => {
            setSecondModalVisible(!secondModalVisible) &
              setCircleValue(data.value) &
              setCircleRotate(false) &
              setCircles(data.displayValue);
            const apiParams = {
              url: apiEndpoints.RECHARGE_PLAN_FETCH,
              requestMethod: 'post',
              response: res => {
                console.log(res);
                setFetchPlans(res);
                setMasterData(res);
                setPlanDescription(res.PlanDescription);
              },
              errorFunction: error => {
                console.log(error);
                setLoaderOn(false);
              },
              endFunction: () => {
                console.log('End Function Called');
                setLoaderOn(false);
              },
              input: {
                planFetchNumber: mobileNumber,
                circleCode: data.value,
                operatorCode: operatoreValue,
              },
            };
            Api.callApi(apiParams);
          }}>
          <View>
            <Text style={styles.modalText}>{data.displayValue}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  const fetchOperatord = () => {
    const apiParams = {
      url: apiEndpoints.FETCH_OPERATORE,
      requestMethod: 'get',
      response: res => {
        console.log(res);
        setOperatoreList(res);
      },
      errorFunction: error => {
        console.log(error);
      },
      endFunction: () => {
        console.log('End Function Called');
      },
      input: {},
    };
    Api.callApi(apiParams);
  };

  let operators = [];
  if (operatoreList) {
    operators = operatoreList.map((data, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setOperator(data.displayValue) &
              setModalVisible(!modalVisible) &
              setOperatoreValue(data.value) &
              setOperatorRotate(false);
          }}>
          <View>
            <Text style={styles.modalText}>{data.displayValue}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  let plansDetails = [];
  if (fetchPlans.PlanDescription) {
    plansDetails = fetchPlans.PlanDescription.map((plans, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            setAmount(plans.recharge_amount) & setThirdModalVisible(true)
          }>
          <View style={styles.palns_card_con}>
            <View style={styles.plans_header_con}>
              <View style={styles.plans_header}>
                <Text style={styles.rs_text}>Rs. </Text>
                <Text style={styles.recharge_amount_text}>
                  {plans.recharge_amount}
                </Text>
              </View>
              <View style={styles.second_header}>
                <Text style={styles.validity_text}>Validity. </Text>
                <Text style={styles.recharge_validity_text}>
                  {plans.recharge_validity}
                </Text>
              </View>
            </View>
            <Text style={styles.recharge_talktime}>
              {plans.recharge_talktime}
            </Text>
            <Text style={styles.recharge_type}>
              Recharge Type - {plans.recharge_short_desc}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  const searchFilterAmount = number => {
    if (number) {
      const rechargeAmount = masterData.PlanDescription.filter(function (item) {
        const itemData = item.recharge_amount;
        const textData = number;
        return itemData.indexOf(textData) > -1;
      }).map(function (recharge_amount) {
        return recharge_amount;
      });
      if (rechargeAmount) {
        rechargeAmount.map(item => {
          setFetchPlans(item);
        });
      }
      setSearch(number);
      console.log(
        'xxcxcxcxcxc----------------------------------',
        rechargeAmount,
      );
    } else {
      setFetchPlans(masterData);
      setSearch(number);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.mobile_recharge_text}>Mobile Recharge</Text>
        <View style={styles.input_body}>
          <View style={styles.first_input_body}>
            <TextInput
              placeholder="Enter Mobile Number"
              onChangeText={value => setMobileNumber(value)}
              maxLength={10}
              autoFocus={true}
              selectionColor={CssVariables.border_color}
              keyboardType="numeric"
              value={mobileNumber}
              style={styles.mobile_input}
              placeholderTextColor="#535763"
            />
            <Image
              source={FilePaths.mobilerecharge}
              style={styles.mobile_recharge_image}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true) & setOperatorRotate(true);
              }}
              style={styles.select_operator_con}>
              <Caretdown
                name="caretdown"
                style={{
                  position: 'absolute',
                  right: 5,
                  alignSelf: 'center',
                  transform: [{rotate: operatorRotate ? '180deg' : '0deg'}],
                }}
              />
              {operator ? (
                <Text style={styles.operator_text}>{operator}</Text>
              ) : (
                <>
                  <Text style={{marginLeft: 10}}>Select Operator</Text>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSecondModalVisible(true) & setCircleRotate(true);
              }}
              style={styles.select_circle_con}>
              <Caretdown
                name="caretdown"
                style={{
                  position: 'absolute',
                  right: 5,
                  alignSelf: 'center',
                  transform: [{rotate: circleRotate ? '180deg' : '0deg'}],
                }}
              />
              {circles ? (
                <Text style={styles.circle_text}>{circles}</Text>
              ) : (
                <>
                  <Text style={{marginLeft: 10}}>Select Circle</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.browse_plan_main_con}>
            <View style={styles.browse_paln_con}></View>
          </View>
          {planDescription ? (
            <View style={styles.search_container}>
              <AntDesign name="search1" style={styles.search_icon} />
              <TextInput
                placeholder="Search for plans (enter the amount)"
                placeholderTextColor="#535763"
                keyboardType="numeric"
                value={search}
                onChangeText={number => searchFilterAmount(number)}
                style={{marginLeft: 35}}
              />
            </View>
          ) : null}
        </View>
        <View style={styles.packs_container}>
          <Text style={styles.packs_text}>Popular</Text>
          <Text style={styles.packs_text}>Data Packs</Text>
          <Text style={styles.packs_text}>ISD</Text>
          <Text style={styles.packs_text}>NO DALIY LIMIT</Text>
        </View>
        <ScrollView disableScrollViewPanResponder={true}>
          {fetchPlans.recharge_amount ? (
            <TouchableOpacity
              onPress={() =>
                setAmount(fetchPlans.recharge_amount) &
                setThirdModalVisible(true)
              }>
              <View style={styles.palns_card_con}>
                <View style={styles.plans_header_con}>
                  <View style={styles.plans_header}>
                    <Text style={styles.rs_text}>Rs. </Text>
                    <Text style={styles.recharge_amount_text}>
                      {fetchPlans.recharge_amount}
                    </Text>
                  </View>
                  <View style={styles.second_header}>
                    <Text style={styles.validity_text}>Validity. </Text>
                    <Text style={styles.recharge_validity_text}>
                      {fetchPlans.recharge_validity}
                    </Text>
                  </View>
                </View>
                <Text style={styles.recharge_talktime}>
                  {fetchPlans.recharge_talktime}
                </Text>
                <Text style={styles.recharge_type}>
                  Recharge Type - {fetchPlans.recharge_short_desc}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
          {plansDetails}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible) & setOperatorRotate(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modal_body}>
                <Text style={styles.select_operator}>Select Operator</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible) & setOperatorRotate(false);
                  }}>
                  <AntDesign name="close" style={styles.close_icon} />
                </TouchableOpacity>
              </View>
              <ScrollView>{operators}</ScrollView>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={secondModalVisible}
          onRequestClose={() => {
            setSecondModalVisible(!secondModalVisible) & setCircleRotate(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modal_body}>
                <Text style={styles.select_operator}>Select Circle</Text>
                <TouchableOpacity
                  onPress={() =>
                    setSecondModalVisible(!secondModalVisible) &
                    setCircleRotate(false)
                  }>
                  <AntDesign name="close" style={styles.close_icon} />
                </TouchableOpacity>
              </View>
              <ScrollView>{circle}</ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={thirdModalVisible}
          onRequestClose={() => {
            setThirdModalVisible(!thirdModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modal_body}>
                <Text style={styles.select_operator}>Pay</Text>
                <TouchableOpacity
                  onPress={() => setThirdModalVisible(!thirdModalVisible)}>
                  <AntDesign name="close" style={styles.close_icon} />
                </TouchableOpacity>
              </View>

              <View style={styles.mobile_text}>
                <Text style={styles.mobile_no_text}>
                  Mobile No -{' '}
                  <Text style={styles.light_grey_text}>{mobileNumber} </Text>{' '}
                </Text>
                <Text style={styles.light_grey_text}>
                  <Text style={styles.mobile_no_text}>Recharge amount - </Text>
                  {amount}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                  <Text style={{color: CssVariables.black_color}}>
                    <Text>Operator -</Text> {operator}
                  </Text>
                  <Text
                    style={{color: CssVariables.black_color, marginLeft: 10}}>
                    <Text>Circle -</Text> {circles}
                  </Text>
                </View>
                <View style={styles.button}>
                  {rechargeLoaderOn ? (
                    <AppLoader />
                  ) : (
                    <LoginButton text="Pay" onPress={mobileRecharge} />
                  )}
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={fourthModalVisible}
          onRequestClose={() => {
            setFourthModalVisible(!fourthModalVisible);
          }}>
          <View style={styles.fourth_centeredView}>
            <View style={styles.fourth_modalView}>
              <Text style={styles.modalText}>Insufficient balance.</Text>
              <RegisterButton
                text="Add Money"
                onPress={() => navigation.navigate('Wallet')}
              />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={fifthModalVisible}
          onRequestClose={() => {
            setFifthModalVisible(!fifthModalVisible);
          }}>
          <View style={styles.fourth_centeredView}>
            <View style={styles.fourth_modalView}>
              <Text style={styles.modalText}>Recharge Successfully.</Text>
              <RegisterButton text="Done" />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CssVariables.border_color,
    flex: 1,
    padding: 10,
  },
  body: {
    backgroundColor: CssVariables.white_color,
    padding: 10,
    borderRadius: 9,
    height: '100%',
  },
  mobile_recharge_text: {
    fontSize: 16,
    fontFamily: CssVariables.readex_font,
    color: CssVariables.black_color,
  },
  input_body: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  first_input_body: {
    flexDirection: 'row',
  },
  mobile_input: {
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 15,
    borderColor: CssVariables.border_color,
  },
  mobile_recharge_image: {
    width: 21,
    height: 28,
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
  },
  select_operator_con: {
    borderBottomWidth: 1,
    marginTop: 20,
    width: 130,
    marginRight: 10,
    borderColor: CssVariables.border_color,
    paddingTop: 15,
    justifyContent: 'center',
  },
  operator_text: {
    color: CssVariables.black_color,
    marginLeft: 10,
  },
  circle_text: {
    color: CssVariables.black_color,
    marginLeft: 10,
  },
  select_circle_con: {
    borderBottomWidth: 1,
    zIndex: 1,
    marginTop: 20,
    width: 130,
    marginLeft: 10,
    borderColor: CssVariables.border_color,
    paddingTop: 15,
    justifyContent: 'center',
  },
  search_icon: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 28,
    color: CssVariables.border_color,
  },
  search_container: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderColor: CssVariables.border_color,
  },
  browse_plan_main_con: {
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
  },
  browse_paln_con: {
    width: 90,
    alignSelf: 'center',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
  },
  packs_container: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 35,
    marginBottom: 10,
    marginTop: 10,
    borderColor: CssVariables.border_color,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  packs_text: {
    fontFamily: CssVariables.readex_font,
    fontSize: 15,
    color: CssVariables.border_color,
    alignSelf: 'center',
  },
  palns_card_con: {
    padding: 10,
    backgroundColor: CssVariables.border_color,
    margin: 10,
    borderRadius: 10,
  },
  plans_header_con: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  plans_header: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  rs_text: {
    color: CssVariables.white_color,
    fontSize: 24,
    fontFamily: CssVariables.readex_font,
  },
  recharge_amount_text: {
    color: CssVariables.white_color,
    fontSize: 24,
    fontFamily: CssVariables.readex_font,
  },
  recharge_validity_text: {
    color: CssVariables.white_color,
    fontFamily: CssVariables.readex_font,
  },
  second_header: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  validity_text: {
    color: '#C5C5C5',
    fontSize: 15,
  },
  recharge_type: {
    color: CssVariables.white_color,
    fontFamily: CssVariables.readex_font,
    fontSize: 15,
  },
  recharge_talktime: {
    color: CssVariables.white_color,
    fontFamily: CssVariables.readex_font,
  },
  modal_body: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 8,
    paddingTop: 8,
    borderBottomColor: CssVariables.border_color,
  },
  select_operator: {
    fontSize: 16,
    fontFamily: CssVariables.readex_font,
    color: CssVariables.black_color,
  },
  close_icon: {
    fontSize: 28,
    color: CssVariables.black_color,
  },
  mobile_text: {
    alignSelf: 'center',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobile_no_text: {
    color: CssVariables.black_color,
    fontSize: 20,
    marginTop: 10,
  },
  light_grey_text: {
    color: CssVariables.light_grey_color,
    fontFamily: CssVariables.readex_font,
    fontSize: 15,
  },

  browse_plan_text: {
    fontSize: 15,
    color: CssVariables.border_color,
  },

  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '60%',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    marginTop: 8,
    fontSize: 16,
    fontFamily: CssVariables.readex_font,
    color: CssVariables.black_color,
    marginLeft: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'rgba(3, 107, 185, 0.3)',
  },
  button: {
    width: 145,
    height: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  fourth_centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fourth_modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
