import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {ScanPay, Notification, Help, ViewOffer} from '../constants/Svg';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filePath';
import {CableTv, FastTag, DthRecarge, MobileRecharge} from '../constants/Svg';
import Icon from 'react-native-vector-icons/AntDesign';
import {Helper} from '../classes/Helper';
import {Api} from '../classes/Api';
export default function LandingPage({navigation, route}) {
  const [currentTab, setCurrentTab] = useState('Profile');
  const [showMenu, setShowMenu] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const TabButton = (currentTab, setCurrentTab, title, image) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (title == 'Log Out') {
            Api.logOut();
            navigation.navigate('Login');
            Helper.showToastMessage('you are logged out successfully.');
          } else {
            setCurrentTab(title);
          }
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            backgroundColor:
              currentTab == title ? CssVariables.border_color : 'transparent',
            borderRadius: 8,
            paddingLeft: 20,
            paddingRight: 40,
            marginTop: 5,
            marginBottom: 10,
          }}>
          <Image
            source={image}
            style={{
              width: 25,
              height: 25,
              tintColor:
                currentTab == title ? CssVariables.white_color : '#535763',
            }}
          />
          <Text
            style={{
              color: currentTab == title ? CssVariables.white_color : '#535763',
              fontSize: 18,
              marginLeft: 10,
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={Styles.body}>
      <View style={Styles.main_icon_con}>
        <TouchableOpacity
          onPress={() => {
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true,
            }).start();
            Animated.timing(offsetValue, {
              toValue: showMenu ? -100 : 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
            Animated.timing(closeButtonOffset, {
              toValue: !showMenu ? 10 : 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
            setShowMenu(!showMenu);
          }}>
          <Image
            source={showMenu ? FilePaths.closebutton : FilePaths.menubutton}
            style={Styles.close_menu_btn}
          />
        </TouchableOpacity>
        <View style={Styles.three_icon_con}>
          <TouchableOpacity>
            <ScanPay />
          </TouchableOpacity>
          <TouchableOpacity>
            <Notification />
          </TouchableOpacity>
          <TouchableOpacity>
            <Help />
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.second_view_con}>
        <Animated.View
          style={[
            Styles.first_animated_view_con,
            {
              transform: [
                // {scale: scaleValue},
                {translateX: showMenu ? offsetValue : -700},
              ],
            },
          ]}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: closeButtonOffset,
                },
              ],
            }}>
            <ScrollView>
              <Text style={Styles.name_text}>Shivam kumar</Text>
              <Text style={Styles.number_text}>+919122053667</Text>
              <View style={{}}>
                {TabButton(
                  currentTab,
                  setCurrentTab,
                  'Profile',
                  FilePaths.profile,
                )}
                {TabButton(
                  currentTab,
                  setCurrentTab,
                  'Reward',
                  FilePaths.union,
                )}
                {TabButton(
                  currentTab,
                  setCurrentTab,
                  'Offers',
                  FilePaths.offers,
                )}
                {TabButton(
                  currentTab,
                  setCurrentTab,
                  'Refer to a friend',
                  FilePaths.refer,
                )}
                {TabButton(
                  currentTab,
                  setCurrentTab,
                  'Support',
                  FilePaths.support,
                )}
                {TabButton(
                  currentTab,
                  setCurrentTab,
                  'Settings',
                  FilePaths.setting,
                )}
                {TabButton(
                  currentTab,
                  setCurrentTab,
                  'About Us',
                  FilePaths.about,
                )}
                {TabButton(
                  currentTab,
                  setCurrentTab,
                  'Language',
                  FilePaths.language,
                )}
              </View>
              <View>
                {TabButton(
                  currentTab,
                  setCurrentTab,
                  'Log Out',
                  FilePaths.logout,
                )}
              </View>
            </ScrollView>
          </Animated.View>
        </Animated.View>
        {/* <Inputfield
          placeholder="Search"
          properties={{
            fieldType: 'search',
          }}
        /> */}
        <ScrollView disableScrollViewPanResponder={true}>
          {/* <View style={Styles.first_card}></View> */}
          <View style={Styles.recharge_card}>
            <Text style={Styles.recharge_text}>Recharge</Text>
            <View style={Styles.recharge_icon_con}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MobileRecharge')}>
                <MobileRecharge />
              </TouchableOpacity>
              <TouchableOpacity>
                <DthRecarge />
              </TouchableOpacity>
              <TouchableOpacity>
                <FastTag />
              </TouchableOpacity>
              <TouchableOpacity>
                <CableTv />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={Styles.view_offers}>
              <Text style={Styles.view_offers_text}>
                {' '}
                View Offers
                <Icon name="right" style={Styles.view_offers_right} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.second_card_con}>
            <TouchableOpacity style={Styles.second_card}>
              <Image
                source={FilePaths.ninepaywallet}
                style={{width: 69, height: 53}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.second_card}>
              <Image
                source={FilePaths.ninepayreward}
                style={{width: 77, height: 53}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.second_card}>
              <Image
                source={FilePaths.referearn}
                style={{width: 77, height: 53}}
              />
            </TouchableOpacity>
          </View>
          <View style={Styles.third_card_con}>
            <Text style={Styles.bills_text}>Bills & Utility</Text>
            <View style={Styles.third_card}>
              <TouchableOpacity
                onPress={() => navigation.navigate('BookCylinder')}>
                <Image
                  source={FilePaths.cylinder}
                  style={{width: 52, height: 82}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={FilePaths.pipedgas}
                  style={{width: 39, height: 80}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={FilePaths.waterbill}
                  style={{width: 47, height: 80}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ElectricityBill')}>
                <Image
                  source={FilePaths.electricitybill}
                  style={{width: 58, height: 82}}
                />
              </TouchableOpacity>
            </View>
            <View style={Styles.third_card}>
              <TouchableOpacity>
                <Image
                  source={FilePaths.postpaid}
                  style={{width: 51, height: 65}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('BroadbandScreen')}>
                <Image
                  source={FilePaths.broadband}
                  style={{width: 70, height: 79}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={FilePaths.educationfees}
                  style={{width: 58, height: 75}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={FilePaths.homerent}
                  style={{width: 65, height: 64}}
                />
              </TouchableOpacity>
            </View>
            <View style={Styles.third_card}>
              <TouchableOpacity>
                <Image
                  source={FilePaths.metro}
                  style={{width: 34, height: 60}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={FilePaths.challan}
                  style={{width: 53, height: 60}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={FilePaths.tax} style={{width: 39, height: 60}} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoanEmiScreen')}>
                <Image
                  source={FilePaths.loan}
                  style={{width: 62, height: 70}}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={{width: 100, height: 400}}></View> */}
        </ScrollView>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: CssVariables.white_color,
  },
  main_icon_con: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    paddingLeft: 8,
    // elevation:50
  },
  three_icon_con: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    right: 8,
    width: 135,
  },
  name_text: {
    color: CssVariables.active_color,
    fontSize: 18,
    marginTop: 8,
    paddingLeft: 20,
  },
  number_text: {
    color: CssVariables.inactive_color,
    fontSize: 15,
    paddingLeft: 20,
  },

  first_animated_view_con: {
    position: 'absolute',
    backgroundColor: CssVariables.white_color,
    top: 0,
    bottom: 6,
    right: 0,
    left: 0,
    width: '80%',
    height: '100%',
    paddingHorizontal: 20,
    borderTopEndRadius: 15,
    zIndex: 1,
    marginBottom: 61,
    borderTopWidth: 0.3,
  },
  second_view_con: {
    backgroundColor: CssVariables.border_color,
    width: '100%',
    height: '100%',
  },
  close_menu_btn: {
    width: 50,
    height: 50,
  },
  first_card: {
    width: '95%',
    height: 120,
    backgroundColor: CssVariables.white_color,
    alignSelf: 'center',
    borderRadius: 15,
  },
  recharge_card: {
    width: '95%',
    // height: 160,
    backgroundColor: CssVariables.white_color,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'flex-end',
    elevation: 20,
  },
  recharge_text: {
    fontSize: 16,
    color: CssVariables.black_color,
    fontFamily: CssVariables.readex_font,
    position: 'absolute',
    top: 8,
    left: 16,
  },
  recharge_icon_con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 45,
    paddingBottom: 2,
  },
  recharge_card_images: {
    width: 55,
    height: 74,
  },
  view_offers: {
    backgroundColor: CssVariables.border_color,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_offers_text: {
    color: CssVariables.black_color,
    fontSize: 16,
    padding: 5,
  },
  view_offers_right: {
    color: CssVariables.black_color,
    fontSize: 18,
  },
  second_card_con: {
    marginTop: 20,
    backgroundColor: CssVariables.white_color,
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    justifyContent: 'space-around',
    paddingTop: 25,
    paddingBottom: 25,
    elevation: 20,
  },
  second_card: {
    width: 88,
    height: 70,
    backgroundColor: CssVariables.white_color,
    borderRadius: 15,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  third_card_con: {
    marginTop: 20,
    backgroundColor: CssVariables.white_color,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 61,
    elevation: 20,
  },
  bills_text: {
    fontSize: 16,
    color: CssVariables.black_color,
    fontFamily: CssVariables.readex_font,
    marginLeft: 15,
  },
  third_card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 8,
  },
});
