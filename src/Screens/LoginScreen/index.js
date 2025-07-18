import React, { memo, useState } from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import ThemeButton from '../../Components/ThemeButton';
import {
  apple,
  facebook,
  google,
  lock,
  locksetting,
  logoImg,
  sms,
  tickemp,
  tickfill,
} from '../../Assets';
import { InputComponent } from '../../Components/InputComponent';
import { Controller } from 'react-hook-form';
import useLogin from './useLoginScreen';
import { Touchable } from '../../Components/Touchable';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import { LoginBg } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import SocialBottomComp from '../../Components/SocialBottomComp';

const LoginScreen = ({ navigation }) => {
  const [check, setCheck] = useState();

  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    onPress,
    loginUser,
    appleIdlogin,
    googleLoginFunc,
    facebookLoginFunc,
    rememberValue,
    remember,
    socialLoginFun,
  } = useLogin(navigation);

  return (
    <ImageBackground source={LoginBg} style={styles.ImgBg}>
      <TextComponent
        text={'SIGN IN'}
        styles={{
          fontSize: hp('3'),
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: hp('8'),
        }}
        isWhite
      />
      <KeyBoardWrapper
        styles={styles.logInMain}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loginBottom}>
          <InputComponent
            {...{
              heading: 'E-MAIL',
              name: 'email',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              placeholder: 'Email*',
              // isImage: emailIcon,
              defaultValue: __DEV__ ? 'iphone15@gmail.com' : '',
              maxLength: 50,
            }}
          />
          <InputComponent
            {...{
              name: 'password',
              heading: 'PASSWORD',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              placeholder: 'Password*',
              // isImage: lock,
              defaultValue: __DEV__ ? 'Test@123' : '',
              isSecure: true,
              // isImage: passwordIcon,
              inputIconStyle: styles.lockstyle,
              maxLength: 30,
              mainViewStyle: { marginTop: hp('5') },
            }}
          />

          <View style={styles.forgotContainer}>
            <TextComponent
              text={'Forgot Password?'}
              styles={styles.forgetText}
              fade
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
            />
          </View>

          <ThemeButton
            onPress={handleSubmit(loginUser)}
            title={'Log In'}
            isTheme
            style={styles.buttonStyle}
            textStyle={styles.buttonText}
            btnStyle={{ marginVertical: hp('1') }}
          />

          <View style={styles.barMain}>
            <View style={styles.barLine}></View>
            <TextComponent
              text={'or Log In With'}
              styles={styles.barText}
              fade
            />
            <View style={styles.barLine}></View>
          </View>

          <SocialBottomComp onSocialPress={socialLoginFun} />
        </View>
        <View style={styles.dontHave}>
          <TextComponent
            text={'Don’t have an account?'}
            styles={styles.dontHaveText}
          />
          <Touchable onPress={onPress}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </Touchable>
        </View>
      </KeyBoardWrapper>
    </ImageBackground>
  );
};

export default memo(LoginScreen);
