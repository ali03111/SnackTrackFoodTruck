import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextComponent } from './TextComponent';
import ThemeButton from './ThemeButton';
import { Colors } from '../Theme/Variables';
import { noData, noDataImg } from '../Assets';
import { hp, wp } from '../Hooks/useResponsive';

export const DataNotFound = ({
  title,
  subTitle,
  onpress,
  btnTitle,
  btnStyles,
  mainViewStyles,
  noImg,
  imgStyles,
  centerImg,
}) => {
  return (
    <View style={{ ...styles.mealInner, ...mainViewStyles }}>
      {!noImg && (
        <Image
          source={noData ?? noDataImg}
          style={{ ...styles.noDataImage, ...imgStyles }}
        />
      )}
      <TextComponent
        // text={'Data not found'}
        text={title ?? 'Data not found'}
        styles={styles.noDataTitle}
      />
      <TextComponent
        // text={'No data, please try again later'}
        text={subTitle ?? 'No data, please try again later'}
        styles={styles.noDataSubTitle}
      />
      {onpress && (
        <ThemeButton
          title={btnTitle ?? 'Refresh'}
          onPress={onpress}
          textStyle={{ textAlign: 'center', fontSize: hp('1.5') }}
          style={{ ...styles.btnStyles, ...btnStyles }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mealInner: {
    // marginTop: hp('-10'),
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp('4'),
    alignItems: 'center',
  },
  noDataImage: {
    width: wp('35'),
    height: hp('17.5'),
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginBottom: hp('2'),
  },
  noDataTitle: {
    fontSize: hp('2'),
    textAlign: 'center',
    fontWeight: 600,
    color: Colors.primaryColor,
  },
  noDataSubTitle: {
    fontSize: hp('1.5'),
    textAlign: 'center',
    color: Colors.textGray,
    marginBottom: hp('6'),
    marginTop: hp('1'),
  },
  btnStyles: {
    width: wp('10'),
    height: hp('5'),
  },
});
