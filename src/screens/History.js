import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CssVariables} from '../constants/CssVariables';
import Moment from 'moment';
import {apiEndpoints} from '../constants/apiEndPoints';
import {Api} from '../classes/Api';
import {FilePaths} from '../constants/filePath';

export default function History() {
  useEffect(() => {
    getWalletReports();
  }, []);

  const [walletReports, setWalletReports] = useState('');

  const getWalletReports = () => {
    const apiParams = {
      url: apiEndpoints.WALLET_REPORTS,
      requestMethod: 'get',
      response: res => {
        console.log('------WALLET RESPONSE-------', res);
        setWalletReports(res);
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

  return (
    <FlatList
      data={walletReports}
      renderItem={({item}) => {
        return (
          <View style={styles.body}>
            <View style={styles.card_con}>
              <View style={styles.cards}>
                <View>
                  <Image
                    source={FilePaths.reminder}
                    style={{width: 41, height: 41}}
                  />
                  <Text style={{color: CssVariables.border_color}}>
                    {Moment(item.createdAt).format(' DD-MM-Y')}
                  </Text>
                  <Text style={{color: CssVariables.border_color}}>
                    {Moment(item.createdAt).format('  hh:mm:ss')}
                  </Text>
                </View>
                <View>
                  <Text style={styles.service_type_text}>Service Type</Text>
                  <Text style={styles.recharge_text}>{item.serviceType}</Text>
                </View>
                {/* <Text style={{color: CssVariables.border_color, margin: 3}}>
                  Transaction No-{item.transactionNumber}
                </Text> */}
                <View>
                  <Text style={{color: CssVariables.border_color, margin: 3}}>
                    {item.paymentType}
                  </Text>
                  {item.paymentType === 'CREDIT' ? (
                    <Text style={{color: CssVariables.border_color, margin: 3}}>
                      Amount-
                      <Text style={{color: 'green'}}>{` +${item.amount}`}</Text>
                    </Text>
                  ) : (
                    <Text style={{color: CssVariables.border_color, margin: 3}}>
                      Amount-
                      <Text style={{color: 'red'}}>{` -${item.amount}`}</Text>
                    </Text>
                  )}
                </View>
                {/* <Text style={{color: CssVariables.border_color, margin: 3}}>
                  Payment State-{item.paymentState}
                </Text> */}
              </View>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.border_color,
    paddingLeft: 6,
    paddingRight: 6,
  },
  card_con: {
    paddingTop: 0.5,
    paddingBottom: 0.5,
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: CssVariables.white_color,
  },
  cards: {
    backgroundColor: CssVariables.white_color,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: CssVariables.border_color,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  select_operator_con: {
    borderBottomWidth: 1,
    marginTop: 20,
    width: 130,
    marginRight: 10,
    borderColor: CssVariables.border_color,
  },
  service_type_text: {
    fontFamily: CssVariables.readex_font,
    color: '#696363',
    fontSize: 16,
  },
  recharge_text: {
    color: CssVariables.black_color,
    fontSize: 18,
    fontFamily: CssVariables.readex_font,
  },
});
