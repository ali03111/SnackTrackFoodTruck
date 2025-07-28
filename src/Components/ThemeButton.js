import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { Colors, FontFamily } from '../Theme/Variables';
import { Touchable } from './Touchable';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../Hooks/useResponsive';

const ThemeButton = ({
  title,
  onPress,
  image,
  style,
  textStyle,
  btnStyle,
  disabled,
  isLinear = true,
}) => {
  return (
    <LinearGradient
      colors={
        isLinear
          ? ['rgba(255, 212, 74, 1)', 'rgba(231, 182, 0, 1)']
          : ['transparent', 'transparent']
      }
      style={{ ...styles.linearGradient, ...btnStyle }}
    >
      <Touchable
        Opacity={0.7}
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, { ...style }]}
      >
        <Text style={[styles.text, { ...textStyle }]}>{title}</Text>
        {image && (
          <Image
            source={image}
            resizeMode="contain"
            style={{ width: wp('5'), height: hp('2') }}
            tintColor={Colors.black}
          />
        )}
      </Touchable>
    </LinearGradient>
  );
};

export default ThemeButton;

const styles = StyleSheet.create({
  button: {
    height: hp('6.5'),
    // width: wp('100'),
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 99,
    position: 'relative',
  },
  text: {
    fontSize: hp('2'),
    color: Colors.black,
    // textAlign: 'center',
    // textAlignVertical: 'center',
    // marginLeft: wp('3'),
  },
  linearGradient: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
