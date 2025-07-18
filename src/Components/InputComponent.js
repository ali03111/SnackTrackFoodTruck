import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Controller } from 'react-hook-form';
import { Colors, Sizes } from '../Theme/Variables';
import { Touchable } from './Touchable';
import { eye, eyeOff } from '../Assets';
import { TextComponent } from './TextComponent';
import { hp, wp } from '../Hooks/useResponsive';

export const InputComponent = ({
  minLength,
  placeholder,
  isRequired,
  isSecure,
  control,
  name,
  errors,
  type,
  autoCapitalize = 'none',
  defaultValue = '',
  isDisabled,
  maxLength,
  editable,
  viewStyle,
  isImage,
  forPasswordStyle,
  textStyle,
  inputIconStyle,
  inputLines,
  multiline,
  tintColor,
  errorTextStyle,
  heading,
  isRightIcon,
  mainViewStyle,
}) => {
  const [show, setShow] = useState(!isSecure);
  const handleClick = () => setShow(!show);
  const keyboardType = ['number', 'reset_code', 'phone'].includes(name)
    ? 'phone-pad'
    : 'default';
  return (
    <View style={{ ...styles.mainView, ...mainViewStyle }}>
      <TextComponent
        text={heading}
        styles={{
          color: 'rgba(0, 0, 0, 0.6)',
          marginBottom: hp('-1'),
          fontSize: hp('1.8'),
          marginTop: hp('2'),
        }}
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <View style={{ ...styles.textfield, ...viewStyle }}>
            {isImage && (
              <Image
                source={isImage}
                style={{
                  resizeMode: 'contain',
                  tintColor,
                  ...styles.inputIcon,
                  ...inputIconStyle,
                }}
              />
            )}
            <TextInput
              type={type}
              maxLength={maxLength}
              // style={{...forPasswordStyle}}
              numberOfLines={inputLines}
              multiline={multiline}
              {...{
                value,
                isDisabled,
                selectionColor: Colors.gray,
                placeholder,
                keyboardType,
                style: { ...styles.input(isSecure), ...textStyle },
                secureTextEntry: !show,
                onChangeText: onChange,
                placeholderTextColor: 'rgba(203, 203, 203, 1)',
                autoCapitalize,
                autoCorrect: false,
                spellCheck: false,
                editable,
              }}
            />
            {isSecure && (
              <Touchable style={styles.eyeContainer} onPress={handleClick}>
                <Image
                  source={show ? eye : eyeOff}
                  style={{
                    resizeMode: 'contain',
                    tintColor: Colors.gray,
                    marginRight: wp('3'),
                  }}
                />
              </Touchable>
            )}
            {isRightIcon && (
              <Image
                source={isRightIcon}
                style={{
                  resizeMode: 'contain',
                  width: wp('5'),
                  right: wp('-4'),
                }}
              />
            )}
          </View>
        )}
        {...{
          name,
          control,
          defaultValue,
          rules: { required: Boolean(isRequired), minLength },
        }}
      />
      {errors[name]?.message && (
        <View style={errorTextStyle}>
          <Text style={[styles.error]}>{errors[name]?.message}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textfield: {
    width: '100%',
    height: hp('6'),
    // borderRadius: 15,
    // marginVertical: hp('1'),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'rgba(203, 203, 203, 1)',
    // marginTop: hp('2.5'),
    backgroundColor: 'transparent',
    // borderRadius: 225,
    // paddingHorizontal: wp('2'),
    overflow: 'hidden',
    borderBottomWidth: 1,
  },
  input: isSecure => ({
    height: '100%',
    width: isSecure ? '75%' : '86%',
    color: Colors.black,
    // paddingHorizontal: wp('2'),
    // paddingLeft: wp('3'),
    // fontWeight: '500',
    fontSize: hp('1.5'),
  }),
  eyeContainer: {
    width: wp('5'),
    height: hp('2'),
    // top: '30%',
    right: wp('1'),
    // marginRight: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: Colors.themeRed,
  },
  inputIcon: {
    // marginLeft: hp('2'),
    flex: 0.5,
  },
});
