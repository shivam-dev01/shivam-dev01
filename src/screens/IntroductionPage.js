import React, {useCallback, memo, useRef, useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import {CssVariables} from '../constants/CssVariables';
import {FilePaths} from '../constants/filepath';
import CustomButton from '../components/CustomButton';
import {Helper} from '../classes/Helper';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  body: {
    height: windowHeight * 1,
    backgroundColor: CssVariables.white,
  },
  slide: {
    height: windowHeight * 0.5,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  slideImage: {width: windowWidth * 0.9, position: 'absolute'},
  title_box: {
    height: windowHeight * 0.5,
    width: windowWidth * 1,
    position: 'relative',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 25,
  },
  slideTitle: {
    fontSize: 24,
    fontFamily: CssVariables.mulishmedium,
    color: CssVariables.white,
    marginVertical: 10,
  },
  slideSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: CssVariables.mulishregular,
    color: CssVariables.white,
    marginVertical: 12,
    width: '85%',
  },
  skip_text: {
    color: CssVariables.white,
    fontSize: 16,
    fontFamily: CssVariables.mulishmedium,
    marginVertical: 12,
  },
  pagination: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: {backgroundColor: CssVariables.pale_orange},
  paginationDotInactive: {backgroundColor: CssVariables.white},

  carousel: {flex: 1},
});

export default function IntroductionPage({navigation}) {
  const [i, setI] = useState(0);
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(FlatList);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
      setI(roundIndex);
    }
  }, []);

  useEffect(() => {
    flatListRef?.current?.scrollToIndex({
      animated: true,
      index: i,
    });
  }, [i]);

  console.log('---index---', index);
  const nextPress = () => {
    if (i < 5) {
      setI(preValue => preValue + 1);
    }
  };

  useEffect(() => {
    Helper.storeIntroValue('intro', () => {
      console.log('intro save.');
    });
  }, []);

  const imageArray = [
    FilePaths.intro_1,
    FilePaths.intro_2,
    FilePaths.intro_3,
    FilePaths.intro_4,
    FilePaths.intro_5,
    FilePaths.intro_6,
  ];
  const headerTitle = [
    'Welcome to EMS',
    'Payroll Management',
    'Task Management',
    'Project Management',
    'Attendance Management',
    `Leaves and Holidays
       Management`,
  ];

  const subtitle = [
    `Welcome to Netclack,Bringing togather employees and employers.`,
    'Manage payroll of your employees hustle free.',
    'Assign task and keep track of it on realtime of your employees.',
    'Create projects and track them on realtime for your employees.',
    'Create projects and track them on realtime for your employees.',
    'Keep track of all leave applications  and create custom holiday list.',
  ];

  const button = [
    <CustomButton
      onPress={() => nextPress(index)}
      text="Next"
      properties={{
        feildType: 'whitei',
      }}
    />,
    <CustomButton
      onPress={() => nextPress(index)}
      text="Next"
      properties={{
        feildType: 'whitei',
      }}
    />,
    <CustomButton
      onPress={() => nextPress(index)}
      text="Next"
      properties={{
        feildType: 'whitei',
      }}
    />,
    <CustomButton
      onPress={() => nextPress(index)}
      text="Next"
      properties={{
        feildType: 'whitei',
      }}
    />,
    <CustomButton
      onPress={() => nextPress(index)}
      text="Next"
      properties={{
        feildType: 'whitei',
      }}
    />,
    <CustomButton
      onPress={() => navigation.navigate('CreateAccount')}
      text="Get Started"
      properties={{
        feildType: 'whitei',
      }}
    />,
  ];

  const skip = ['Skip...', 'Skip...', 'Skip...', 'Skip...', 'Skip...'];

  const slideList = Array.from({length: 6}).map((_, i) => {
    return {
      id: i,
      image: imageArray[i],
      title: headerTitle[i],
      subtitle: subtitle[i],
      button: button[i],
      skip: skip[i],
    };
  });

  const Slide = memo(function Slide({data}) {
    return (
      <View style={styles.body}>
        <View style={styles.slide}>
          <Image
            source={data.image}
            style={styles.slideImage}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.title_box}>
          <Image
            source={FilePaths.intro_text_box}
            style={{position: 'absolute', width: '100%', height: '100%'}}
            resizeMode={'stretch'}
          />
          <Text style={styles.slideTitle}>{data.title}</Text>
          <Text style={styles.slideSubtitle}>{data.subtitle}</Text>
          <View style={{width: '80%', marginVertical: 12}}>{data.button}</View>
          <Text
            style={styles.skip_text}
            onPress={() => navigation.navigate('CreateAccount')}>
            {data.skip}
          </Text>
        </View>
      </View>
    );
  });

  function Pagination({index}) {
    return (
      <View style={styles.pagination} pointerEvents="none">
        {slideList.map((_, i) => {
          return (
            <View
              key={i}
              style={[
                styles.paginationDot,
                index === i
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          );
        })}
      </View>
    );
  }

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      [],
    ),
  };

  const renderItem = useCallback(function renderItem({item}) {
    return <Slide data={item} />;
  }, []);

  return (
    <>
      <StatusBar backgroundColor={CssVariables.white} barStyle="dark-content" />
      <FlatList
        data={slideList}
        ref={flatListRef}
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={index}></Pagination>
    </>
  );
}
