import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { Colors, FontFamily } from '../Theme/Variables';
import { Touchable } from './Touchable';
import { hp, wp } from '../Hooks/useResponsive';
import { documentDownload } from '../Assets';

const ThemeButtonWithIcon = ({
  title,
  onPress,
  image,
  style,
  textStyle,
  imageStyle,
  isDisable,
  isYellowTheme,
}) => {
  return (
    <Touchable
      Opacity={0.7}
      onPress={onPress}
      disabled={isDisable}
      style={[
        styles.button,
        {
          justifyContent: 'center',
          backgroundColor: isYellowTheme
            ? Colors.primaryColor
            : Colors.backgroundTheme,
          ...style,
        },
      ]}
    >
      <Text
        style={[styles.text, { marginLeft: image ? wp('1') : 0, ...textStyle }]}
      >
        {title}
      </Text>
      {image && (
        <Image
          source={image}
          style={{
            ...styles.image,
            marginRight: image ? wp('1') : 0,
            ...imageStyle,
          }}
          resizeMode="contain"
        />
      )}
    </Touchable>
  );
};

export default ThemeButtonWithIcon;

const styles = StyleSheet.create({
  button: {
    height: hp('5'),
    // width: wp('40'),
    width: '100%',
    borderRadius: 10,
    // marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingHorizontal: '22.5%',
    justifyContent: 'center',
  },
  image: {
    width: wp('5'),
    height: hp('5'),
    // marginBottom: 5,
    resizeMode: 'contain',
    marginLeft: wp('2'),
  },
  text: {
    // fontSize: heightPercentageToDP('2'),
    color: Colors.white,
    textAlign: 'center',
    fontSize: hp('1.8'),
    // marginRight: wp('3'),
    // fontFamily: FontFamily.regular,
  },
});
