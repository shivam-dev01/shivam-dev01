import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filePath';
import {apiEndpoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import {Helper} from '../classes/Helper';
import InputField from '../components/Inputfield';
import {LoginButton, RegisterButton} from '../components/CustomButton';
import RazorpayCheckout from 'react-native-razorpay';
import {environment} from '../constants/envorment';
import Moment from 'moment';

export default function Wallet() {
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState('');
  const [balanceResponse, setBalanceResponse] = useState('');
  const [amount, setAmount] = useState('');
  const [moneyResponse, setMoneyResponse] = useState('');

  console.log(',..,.,.,.,mmm', moneyResponse);
  useEffect(() => {
    Helper.getLoginData(data => {
      setUserId(data._id);
    });
  }, []);

  const checkBalance = () => {
    const apiParams = {
      url: apiEndpoints.WALLET_BALANCE,
      requestMethod: 'post',
      response: res => {
        console.log(res);
        setBalance(res.availableBalance);
        setBalanceResponse(res);
      },
      errorFunction: error => {
        console.log(error);
      },
      endFunction: () => {
        console.log('End Function Called');
      },
      input: {
        userId: userId,
      },
    };
    Api.callApi(apiParams);
  };

  const addMoney = () => {
    const apiParams = {
      url: apiEndpoints.ADD_MONEY,
      requestMethod: 'post',
      response: res => {
        console.log(res);
        if (res) {
          var options = {
            description: 'Wallet topup',
            image: 'https://9pay.co.in/assets/images/logo.png',
            currency: 'INR',
            key: environment.key,
            amount: res.amount,
            name: '9Pay',
            order_id: res.id,
            theme: {color: '#036BB9'},
          };
          RazorpayCheckout.open(options)
            .then(response => {
              if (response && response.razorpay_payment_id) {
                verifyPayment(response.razorpay_payment_id);
              }
              // alert(`Success: ${data.razorpay_payment_id}`);
              // console.log('SsSssSsSsS', data);
            })
            .catch(error => {
              // handle failure
              alert(`Error:  ${'Payment processing cancelled by user.'}`);
            });
        }
      },
      errorFunction: error => {
        console.log(error);
      },
      endFunction: () => {
        console.log('End Function Called');
      },
      input: {
        amount: amount,
      },
    };
    Api.callApi(apiParams);
  };

  const verifyPayment = paymentId => {
    const apiParams = {
      url: `${apiEndpoints.VERIFY_PAYMENT}`,
      requestMethod: 'post',
      input: {
        paymentId,
      },
      response: res => {
        console.log(res);
        if (res) {
          alert('Wallet Top-up successfully');
          checkBalance();
        }
      },
    };
    Api.callApi(apiParams);
  };

  return (
    <View style={Styles.body}>
      <ScrollView disableScrollViewPanResponder={true}>
        <View style={Styles.first_con}>
          <View style={Styles.header_body}>
            <Text style={Styles.wallet_text}>
              Wallet <Text style={Styles.balance_text}>Balance</Text>
            </Text>
            <Image source={FilePaths.wallet} style={{width: 58, height: 49}} />
          </View>
          {balanceResponse ? (
            <View style={Styles.wallet_balance}>
              <Text style={Styles.rupee_text}>
                <Image source={FilePaths.rupee} style={Styles.rupee_image} />
                {` ${balance}`}
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={checkBalance}>
              <Text style={Styles.check_balance_text}>Check Balance</Text>
            </TouchableOpacity>
          )}
          <View style={Styles.icon_con}>
            <TouchableOpacity>
              <Image source={FilePaths.pay} style={{width: 50, height: 65}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={FilePaths.bank} style={{width: 50, height: 80}} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={FilePaths.giftcard}
                style={{width: 50, height: 80}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={FilePaths.automatic}
                style={{width: 66, height: 81}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.second_con}>
          <Text style={Styles.add_money_text}>Add Money to Wallet</Text>
          <InputField
            onChangeText={value => setAmount(value)}
            value={amount}
            properties={{
              fieldType: 'amount',
            }}
          />
          <View style={Styles.amount_con}>
            <TouchableOpacity onPress={() => setAmount('100')}>
              <Image
                source={FilePaths.hundredrupee}
                style={{width: 45, height: 17}}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAmount('200')}>
              <Image
                source={FilePaths.twohundredrupee}
                style={{width: 45, height: 17}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAmount('500')}>
              <Image
                source={FilePaths.fivehundredrupee}
                style={{width: 45, height: 17}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAmount('1000')}>
              <Image
                source={FilePaths.thousandrupee}
                style={{width: 49.89, height: 17}}
              />
            </TouchableOpacity>
          </View>
          <View style={{alignSelf: 'center'}}>
            <LoginButton text="Add" onPress={addMoney} />
          </View>
        </View>
        <View style={Styles.adsimage_con}>
          <Image
            source={FilePaths.adsimage}
            style={{width: 340, height: 112.2}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.border_color,
  },
  first_con: {
    marginTop: 20,
    backgroundColor: CssVariables.white_color,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 15,
    elevation: 20,
  },
  header_body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wallet_text: {
    fontSize: 20,
    fontFamily: CssVariables.readex_font,
    color: CssVariables.border_color,
  },
  balance_text: {
    fontSize: 20,
    fontFamily: CssVariables.readex_font,
    color: CssVariables.black_color,
  },
  wallet_balance: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  rupee_image: {
    width: 17,
    height: 19,
    alignSelf: 'center',
    marginRight: 10,
  },
  check_balance_text: {
    fontFamily: CssVariables.readex_font,
    color: CssVariables.border_color,
  },
  rupee_text: {
    color: CssVariables.black_color,
    fontSize: 24,
    alignSelf: 'center',
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: CssVariables.border_color,
    borderRadius: 10,
  },
  icon_con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  second_con: {
    marginTop: 20,
    backgroundColor: CssVariables.white_color,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 15,
    elevation: 20,
  },
  add_money_text: {
    color: CssVariables.black_color,
    fontSize: 18,
    fontFamily: CssVariables.readex_font,
  },
  amount_con: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    margin: 15,
    alignSelf: 'center',
  },
  adsimage_con: {
    padding: 15,
    alignSelf: 'center',
  },
});
