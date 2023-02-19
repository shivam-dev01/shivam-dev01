import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CssVariables} from '../constants/CssVariables';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {apiEndpoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import InputField from '../components/Inputfield';
import {LoginButton} from '../components/CustomButton';
import {ThirdLoader, AppLoader} from '../components/Loader';

export default function BookCylinder() {
  const [mobileNumber, setMobileNumber] = useState();
  const [circleValue, setCircleValue] = useState(null);
  const [circleIsFocus, setCircleIsFocus] = useState(false);
  const [circleList, setCircleList] = useState([]);
  const [operatoreList, setOperatoreList] = useState([]);
  const [operatoreIsFous, setOperatoreIsFocus] = useState(false);
  const [operatoreValue, setOperatoreValue] = useState(null);
  const [fetchPlans, setFetchPlans] = useState('');
  const [key, setKey] = useState('');
  const [billFetch, setBillFetch] = useState('');
  const [keyLoaderOn, setKeyLoaderOn] = useState(false);
  const [billLoaderOn, setBillLoaderOn] = useState(false);
  const [comments, setComments] = useState('');

  const circleRenderLabel = () => {
    if (circleValue || circleIsFocus) {
      return (
        <Text style={[Styles.label, circleIsFocus && {color: 'blue'}]}>
          Circle
        </Text>
      );
    }
    return null;
  };

  const operatoreRenderLabel = () => {
    if (operatoreValue || operatoreIsFous) {
      return (
        <Text style={[Styles.label, operatoreIsFous && {color: 'blue'}]}>
          Operatore
        </Text>
      );
    }
    return null;
  };
  const billFetchLoan = () => {
    setBillLoaderOn(true);
    const apiParams = {
      url: apiEndpoints.FETCH_BILL,
      requestMethod: 'post',
      response: res => {
        console.log('-----Response----', res);
        setBillFetch(res.data);
      },
      errorFunction: error => {
        console.log('-----ERROR-----', error);
        setBillLoaderOn(false);
      },
      endFunction: () => {
        console.log('End Function Called.');
        setBillLoaderOn(false);
      },
      input: {
        operator: operatoreValue,
        requestData: {Request: [{Key: key, Value: mobileNumber}]},
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

  const fetchOperatord = () => {
    const apiParams = {
      url: apiEndpoints.FETCH_LOAN_OPERATORE,
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

  const payBill = () => {
    const apiParams = {
      url: apiEndpoints.BILL_PAYMENT,
      requestMethod: 'post',
      response: res => {
        console.log(res);
      },
      errorFunction: error => {
        console.log(error);
      },
      endFunction: () => {
        console.log('End Function Called');
      },
      input: {
        amount: billFetch.DueAmount,
        circleCode: circleValue,
        landlineCaNumber: mobileNumber,
        otherValue: 'ssss',
      },
    };
    Api.callApi(apiParams);
  };

  return (
    <>
      <View style={Styles.body}>
        <Text style={Styles.book_cylinder_text}>Loan Emi</Text>
        <View style={Styles.first_drop_down}>
          {circleRenderLabel()}
          <Dropdown
            style={[
              Styles.dropdown,
              circleIsFocus && {borderColor: CssVariables.border_color},
            ]}
            placeholderStyle={Styles.placeholderStyle}
            selectedTextStyle={Styles.selectedTextStyle}
            inputSearchStyle={Styles.inputSearchStyle}
            iconStyle={Styles.iconStyle}
            data={circleList}
            search
            maxHeight={300}
            labelField="displayValue"
            valueField="value"
            placeholder={!circleIsFocus ? 'Select circle' : '...'}
            searchPlaceholder="Search..."
            value={circleValue}
            onFocus={() => setCircleIsFocus(true)}
            onBlur={() => setCircleIsFocus(false)}
            onChange={item => {
              setCircleValue(item.value);
              setCircleIsFocus(false);
            }}
          />
        </View>
        <View style={Styles.first_drop_down}>
          {operatoreRenderLabel()}
          <Dropdown
            style={[
              Styles.dropdown,
              operatoreIsFous && {borderColor: CssVariables.border_color},
            ]}
            placeholderStyle={Styles.placeholderStyle}
            selectedTextStyle={Styles.selectedTextStyle}
            inputSearchStyle={Styles.inputSearchStyle}
            iconStyle={Styles.iconStyle}
            data={operatoreList}
            search
            maxHeight={300}
            labelField="displayValue"
            valueField="value"
            placeholder={!operatoreIsFous ? 'Select Operatore' : '...'}
            searchPlaceholder="Search..."
            value={operatoreValue}
            onFocus={() => setOperatoreIsFocus(true)}
            onBlur={() => setOperatoreIsFocus(false)}
            onChange={item => {
              setOperatoreValue(item.value);
              setOperatoreIsFocus(false);
              setKeyLoaderOn(true);
              const apiParams = {
                url: apiEndpoints.FETCH_FIELD,
                requestMethod: 'post',
                response: res => {
                  console.log('-----RESPONSE------', res);
                  setFetchPlans(res);
                  if (res) {
                    res.map(data => {
                      setKey(data.Key);
                    });
                  }
                },
                errorFunction: error => {
                  console.log(error);
                  setKeyLoaderOn(false);
                },
                endFunction: () => {
                  console.log('End Function Called');
                  setKeyLoaderOn(false);
                },
                input: {
                  circleCode: circleValue,
                  operator: item.value,
                },
              };
              Api.callApi(apiParams);
            }}
          />
        </View>

        {fetchPlans ? (
          <>
            <Text style={{marginLeft: 25}}>{key}</Text>
            <InputField
              placeholder={key}
              onChangeText={value => setMobileNumber(value)}
              value={mobileNumber}
              properties={{
                fieldType: 'NN',
              }}
            />
          </>
        ) : null}
        <View style={Styles.button}>
          {billLoaderOn ? (
            <AppLoader />
          ) : (
            <LoginButton text="Bill Fetch" onPress={billFetchLoan} />
          )}
        </View>
        <View style={{alignSelf: 'center', marginTop: 20}}>
          <Text style={Styles.bill_details}>
            Bill Date - {billFetch.BillDate}
          </Text>
          <Text style={Styles.bill_details}>
            Bill Number - {billFetch.BillNumber}
          </Text>
          <Text style={Styles.bill_details}>
            Bill Period - {billFetch.BillPeriod}
          </Text>
          <Text style={Styles.bill_details}>
            Customer Name - {billFetch.CustomerName}
          </Text>
          <Text style={Styles.bill_details}>
            Due Amount - {billFetch.DueAmount}
          </Text>
          <Text style={Styles.bill_details}>
            Due Date - {billFetch.DueDate}
          </Text>
        </View>
        <View style={{marginLeft: 30}}>
          <LoginButton text="Pay" onPress={payBill} />
        </View>
      </View>
      {keyLoaderOn ? <ThirdLoader /> : null}
    </>
  );
}
const Styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.white_color,
    padding: 20,
  },
  book_cylinder_text: {
    fontSize: 20,
    color: CssVariables.border_color,
    alignSelf: 'center',
  },

  first_drop_down: {
    backgroundColor: CssVariables.white_color,
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: CssVariables.black_color,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: CssVariables.white_color,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  browse_plan_text: {
    fontSize: 15,
    color: CssVariables.border_color,
    alignSelf: 'center',
  },
  bill_details: {
    color: CssVariables.border_color,
    fontSize: 18,
    fontFamily: CssVariables.readex_font,
  },
  button: {
    width: 145,
    height: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
});
