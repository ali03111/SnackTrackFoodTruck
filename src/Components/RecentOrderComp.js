import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { TextComponent } from './TextComponent';
import { arrowrightblack } from '../Assets';

const RecentOrderComp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextComponent text={'Vegetable soup'} fade size={'1.7'} />
        <TextComponent
          text={'12.60 $'}
          size={'1.5'}
          styles={styles.priceText}
        />
      </View>
      <Image
        source={arrowrightblack}
        resizeMode="contain"
        style={styles.arrowIcon}
        tintColor={'black'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('60'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('2'),
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: wp('2'),
  },
  textContainer: {
    justifyContent: 'space-between',
    height: hp('4.5'),
  },
  priceText: {
    fontWeight: 'bold',
  },
  arrowIcon: {
    width: wp('5'),
    height: hp('3'),
    tintColor: 'black',
  },
});

export default RecentOrderComp;
