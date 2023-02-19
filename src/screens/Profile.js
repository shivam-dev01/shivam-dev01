import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filePath';
import {LoginButton} from '../components/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Profile() {
  const [caretRight, setCaretRight] = useState(false);
  return (
    <View style={styles.body}>
      <ScrollView disableScrollViewPanResponder={true}>
        <View style={styles.first_con}>
          <Image
            source={FilePaths.profileimage}
            style={{width: 68, height: 68, alignSelf: 'center'}}
          />
          <View>
            <Text style={styles.business_text}>Business Name</Text>
            <Text style={styles.name_text}>Christinan Perri</Text>
            <Text style={styles.number_text}>+91 9122053667</Text>
            <Text style={styles.category}>Category</Text>
            <Text style={styles.food_cnateen}>Food Canteen</Text>
            <Text style={styles.category}>* * * * * * * *</Text>
          </View>
          <TouchableOpacity style={{alignSelf: 'center'}}>
            <Image
              source={FilePaths.arrowImage}
              style={{width: 31, height: 31}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.middle_con}>
          <View style={{paddingTop: 25, paddingLeft: 25, paddingRight: 25}}>
            <Text style={styles.payment_method_text}>Payment Methods</Text>
            <Text style={styles.account_text}>Account</Text>
            <View style={styles.middle_second_con}>
              <Image
                source={FilePaths.bhimupi}
                style={{width: 40, height: 24}}
              />
              <View>
                <Text style={styles.upi_id_text}>9122053667@ibl</Text>
                <TouchableOpacity>
                  <Text style={styles.check_balance_text}>Check Balance</Text>
                </TouchableOpacity>
              </View>
              <Image source={FilePaths.upi} style={{width: 45, height: 19}} />
            </View>
          </View>
          <View style={{alignSelf: 'center', marginTop: 10}}>
            <LoginButton text="New Account" />
          </View>
          <TouchableOpacity
            style={styles.payment_method_con}
            onPress={() => {
              setCaretRight(true);
            }}>
            <Text style={styles.payment_method_text}>
              View All Payment Method
            </Text>
            <AntDesign
              name="caretright"
              style={{
                transform: [{rotate: caretRight ? '-271deg' : '0deg'}],
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.third_con}>
          <Text style={styles.setting_text}>Setting & Preferences</Text>
          <TouchableOpacity style={styles.first_con_third_con}>
            <Image
              source={FilePaths.businessdetails}
              style={{width: 41, height: 41}}
            />
            <View>
              <Text style={styles.business_details_text}>Business Details</Text>
              <Text style={styles.custmize_text}>
                Customize your business Details
              </Text>
            </View>
            <Image source={FilePaths.arrow} style={{width: 22, height: 38}} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.first_con_third_con}>
            <Image
              source={FilePaths.sattelment}
              style={{width: 41, height: 41}}
            />
            <View>
              <Text style={styles.business_details_text}>
                Settelment Report
              </Text>
              <Text style={styles.custmize_text}>
                Find all your settelment report
              </Text>
            </View>
            <Image source={FilePaths.arrow} style={{width: 22, height: 38}} />
          </TouchableOpacity>
        </View>
        <View style={styles.third_con}>
          <Text style={styles.setting_text}>Payment Setting</Text>
          <TouchableOpacity style={styles.first_con_third_con}>
            <Image source={FilePaths.autopay} style={{width: 41, height: 41}} />
            <View>
              <Text style={styles.business_details_text}>Autopay Settings</Text>
              <Text style={styles.custmize_text}>
                Manage your Autopay setting
              </Text>
            </View>
            <Image source={FilePaths.arrow} style={{width: 22, height: 38}} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.first_con_third_con}>
            <Image
              source={FilePaths.reminder}
              style={{width: 41, height: 41}}
            />
            <View>
              <Text style={styles.business_details_text}>Reminders</Text>
              <Text style={styles.custmize_text}>
                Never miss another bill payment
              </Text>
            </View>
            <Image source={FilePaths.arrow} style={{width: 22, height: 38}} />
          </TouchableOpacity>
        </View>
        <View style={styles.third_con}>
          <Text style={styles.setting_text}>Security</Text>
          <TouchableOpacity style={styles.first_con_third_con}>
            <Image
              source={FilePaths.screenlocks}
              style={{width: 41, height: 41}}
            />
            <View>
              <Text style={styles.business_details_text}>Screen Lock</Text>
              <Text style={styles.custmize_text}>Biometric & Screen locks</Text>
            </View>
            <Image source={FilePaths.arrow} style={{width: 22, height: 38}} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.first_con_third_con}>
            <Image
              source={FilePaths.changepassword}
              style={{width: 41, height: 41}}
            />
            <View>
              <Text style={styles.business_details_text}>Change Password</Text>
              <Text style={styles.custmize_text}>Reset your app password</Text>
            </View>
            <Image source={FilePaths.arrow} style={{width: 22, height: 38}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.first_con_third_con}>
            <Image
              source={FilePaths.blockedcontact}
              style={{width: 41, height: 41}}
            />
            <View>
              <Text style={styles.business_details_text}>Blocked Contacts</Text>
              <Text style={styles.custmize_text}>Manage your Contacts</Text>
            </View>
            <Image source={FilePaths.arrow} style={{width: 22, height: 38}} />
          </TouchableOpacity>
        </View>

        <View style={styles.third_con}>
          <Text style={styles.setting_text}>Setting & Preferences</Text>
          <TouchableOpacity style={styles.first_con_third_con}>
            <Image
              source={FilePaths.languages}
              style={{width: 41, height: 41}}
            />
            <View>
              <Text style={styles.business_details_text}>Laguages</Text>
              <Text style={styles.custmize_text}>Choose Laguage: English</Text>
            </View>
            <Image source={FilePaths.arrow} style={{width: 22, height: 38}} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.first_con_third_con}>
            <Image
              source={FilePaths.reminder}
              style={{width: 41, height: 41}}
            />
            <View>
              <Text style={styles.business_details_text}>
                Bill Notifications
              </Text>
              <Text style={styles.custmize_text}>
                Receive alert when bill is generated
              </Text>
            </View>
            <Image source={FilePaths.arrow} style={{width: 22, height: 38}} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logout_con}>
          <View style={styles.logout_con_items}>
            <Image
              source={FilePaths.logouticon}
              style={{width: 24, height: 24}}
            />
            <Text style={styles.logout_text}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.border_color,
    padding: 5,
  },
  first_con: {
    backgroundColor: CssVariables.white_color,
    borderRadius: 15,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  business_text: {
    fontFamily: CssVariables.readex_font,
    color: CssVariables.black_color,
    fontSize: 15,
  },
  name_text: {
    fontSize: 20,
    fontFamily: CssVariables.readex_font,
    color: CssVariables.black_color,
  },
  number_text: {
    fontSize: 15,
    color: '#A99E9E',
    fontFamily: CssVariables.readex_font,
  },
  category: {
    fontFamily: CssVariables.readex_font,
    color: CssVariables.black_color,
    fontSize: 15,
  },
  food_cnateen: {
    fontSize: 20,
    fontFamily: CssVariables.readex_font,
    color: CssVariables.black_color,
  },
  middle_con: {
    backgroundColor: CssVariables.white_color,
    borderRadius: 15,
    marginTop: 15,
  },
  payment_method_text: {
    fontSize: 15,
    color: CssVariables.black_color,
    fontFamily: CssVariables.readex_font,
  },
  account_text: {
    color: '#978484',
    fontFamily: CssVariables.readex_font,
  },
  upi_id_text: {
    fontSize: 16,
    fontFamily: CssVariables.readex_light_font,
    color: CssVariables.black_color,
  },
  check_balance_text: {
    color: CssVariables.border_color,
    fontFamily: CssVariables.readex_light_font,
    margin: 5,
  },
  middle_second_con: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderBottomWidth: 2,
    borderColor: 'rgba(3, 107, 185, 0.3)',
  },
  payment_method_con: {
    padding: 10,
    backgroundColor: 'rgba(3, 107, 185, 0.3)',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  payment_method_text: {
    color: CssVariables.black_color,
    fontFamily: CssVariables.readex_font,
  },
  third_con: {
    backgroundColor: CssVariables.white_color,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 7,
    paddingRight: 7,
    justifyContent: 'space-around',
    marginTop: 10,
  },
  setting_text: {
    fontSize: 15,
    color: CssVariables.black_color,
    fontFamily: CssVariables.readex_font,
    marginLeft: 15,
  },
  first_con_third_con: {
    backgroundColor: CssVariables.border_color,
    padding: 10,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  business_details_text: {
    fontSize: 18,
    color: CssVariables.white_color,
    fontFamily: CssVariables.readex_font,
  },
  custmize_text: {
    fontSize: 12,
    color: CssVariables.white_color,
    fontFamily: CssVariables.readex_font,
  },
  logout_con: {
    backgroundColor: CssVariables.white_color,
    padding: 10,
    width: '90%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  logout_con_items: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-around',
  },
  logout_text: {
    fontSize: 16,
    fontFamily: CssVariables.readex_font,
    color: CssVariables.border_color,
  },
});
