import { View, Text, Image, Switch, StyleSheet } from 'react-native';
import React from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { TextComponent } from './TextComponent';
import { arrRight, locationYellow } from '../Assets';
import ThemeButton from './ThemeButton';

const HomeLocationCardComp = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <View style={styles.iconTextRow}>
          <Image
            source={locationYellow}
            resizeMode="contain"
            style={styles.locationIcon}
          />
          <TextComponent text={'Active location'} size={'1.5'} />
        </View>
        <Switch
          trackColor={{
            false: Colors.grayFaded,
            true: 'transparent',
          }}
          ios_backgroundColor="#EAF6ED"
          style={styles.switchStyle}
        />
      </View>

      <TextComponent
        text={'20 Cooper Square,\nNew York, NY 10003, USA'}
        size={'1.6'}
        styles={styles.locationText}
      />

      <ThemeButton
        title={'Change location'}
        image={arrRight}
        btnStyle={styles.changeLocationBtn}
        textStyle={styles.changeLocationText}
      />
    </View>
  );
};

export default HomeLocationCardComp;

const styles = StyleSheet.create({
  cardContainer: {
    width: wp('90'),
    backgroundColor: Colors.yellowBgColor,
    paddingVertical: hp('2'),
    paddingHorizontal: wp('3'),
    borderRadius: 10,
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: wp('5'),
    height: hp('3'),
    marginRight: wp('2'),
  },
  switchStyle: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    left: wp('2'),
  },
  locationText: {
    marginVertical: hp('1'),
  },
  changeLocationBtn: {
    width: wp('40'),
    height: hp('4'),
    alignSelf: 'flex-end',
    marginVertical: hp('1'),
  },
  changeLocationText: {
    fontSize: hp('1.5'),
  },
});
