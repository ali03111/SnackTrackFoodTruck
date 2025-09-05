import React, { memo, useCallback } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
  Text,
} from 'react-native';
import useOnboardScreen from './useOnboardScreen';
import { keyExtractor } from '../../Utils';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import { Touchable } from '../../Components/Touchable';
import { arrow, onboardBgImg, onboardOne } from '../../Assets';
import { styles } from './styles';
import ThemeButton from '../../Components/ThemeButton';

const OnboardScreen = ({ navigation }) => {
  const {
    onBoardingData,
    currentIndex,
    onSnapToItem,
    goNext,
    flatListRef,
    getStart,
  } = useOnboardScreen(navigation);
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <View style={styles.bannerImg} source={item?.image}>
          <Image
            source={item?.image}
            resizeMode="contain"
            style={{
              width: wp('50'),
              height: hp('20'),
            }}
          />
          <View style={styles.centerMainView}>
            <TextComponent
              // numberOfLines={2}
              text={item?.heading}
              styles={styles.hdStyle}
            />
            <TextComponent text={item?.description} styles={styles.descStyle} />
          </View>
        </View>
      );
      // );
    },
    [currentIndex],
  );
  const renderItemDots = useCallback(
    ({ item, index }) => {
      return <View style={styles.dot(currentIndex, index)} />;
    },
    [currentIndex],
  );
  return (
    <ImageBackground
      showsVerticalScrollIndicator={false}
      source={onboardBgImg}
      style={{
        // flex: 1,
        height: hp('100'),
        width: Dimensions.get('window').width,
      }}
      resizeMode="cover"
    >
      <TextComponent
        text={'Skip'}
        fade
        styles={{ top: hp('5'), textAlign: 'right', marginRight: wp('5') }}
        onPress={getStart}
      />
      <FlatList
        refreshing={false}
        ref={flatListRef}
        data={onBoardingData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEnabled={true}
        onMomentumScrollEnd={onSnapToItem}
        keyExtractor={keyExtractor}
        pagingEnabled={true}
        contentContainerStyle={{
          flexDirection: 'row',
          paddingBottom: 0,
          height: hp('50'),
          // backgroundColor: 'red',
          marginTop: hp('15'),
        }}
        style={{ paddingBottom: 0 }}
      />
      <View style={styles.bottomContainer}>
        <FlatList
          data={onBoardingData} // Use the same data for the dots
          renderItem={renderItemDots}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dotList}
        />
        <ThemeButton
          title={'Next'}
          btnStyle={styles.thmBtn}
          isTheme
          onPress={goNext}
          textStyle={{ marginTop: hp('-1.5') }}
        />
      </View>
    </ImageBackground>
  );
};

export default memo(OnboardScreen);
