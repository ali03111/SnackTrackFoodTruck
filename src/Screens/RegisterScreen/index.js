import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  ImageBackground,
  Platform,
} from 'react-native';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import ThemeButton from '../../Components/ThemeButton';
import {
  email,
  lock,
  userIcon,
  phone,
  logo,
  rememberImg,
  rememberEmpty,
  username,
  emailIcon,
  passwordIcon,
  company,
  google,
  facebook,
  apple,
  locksetting,
  sms,
  user,
  signupBg,
  logoImg,
  tickSquare,
} from '../../Assets';
import { InputComponent } from '../../Components/InputComponent';
import { Controller } from 'react-hook-form';
import { Touchable } from '../../Components/Touchable';
import useRegister from './useRegisterScreen';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import { LoginBg } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import SocialBottomComp from '../../Components/SocialBottomComp';

const RegisterScreen = ({ navigation }) => {
  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    goBack,
    loginNav,
    signUpButton,
    PolicyValue,
    policy,
    socialLoginFun,
    onPress,
  } = useRegister(navigation);
  return (
    <ImageBackground source={LoginBg} style={styles.ImgBg}>
      <TextComponent
        text={'SIGN IN'}
        styles={{
          fontSize: hp('3'),
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: Platform.OS == 'ios' ? hp('8') : hp('2'),
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
              heading: 'NAME',
              name: 'name',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              placeholder: 'Name',
              defaultValue: __DEV__ ? 'last' : '',
              viewStyle: { height: hp('5') },
              inputIconStyle: { flex: 0.5 },
            }}
          />

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
            }}
          />
          <InputComponent
            {...{
              name: 'confirm_password',
              heading: 'CONFIRM PASSWORD',
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
            }}
          />
          <View style={{ paddingVertical: hp('5') }}>
            <ThemeButton
              title={'Register'}
              // onPress={() => navigation.navigate('HomeScreen')}
              onPress={handleSubmit(signUpButton)}
              style={styles.buttonStyle}
              isTheme
              textStyle={{ fontSize: hp('1.5') }}
            />
          </View>
          <View style={styles.barMain}>
            <View style={styles.barLine}></View>
            <TextComponent
              text={'or Sign up With'}
              styles={styles.barText}
              fade
            />
            <View style={styles.barLine}></View>
          </View>
          <SocialBottomComp onSocialPress={socialLoginFun} />
        </View>
        <View style={styles.dontHave}>
          <TextComponent
            text={'Already have an account?'}
            styles={styles.dontHaveText}
          />
          <Touchable onPress={onPress}>
            <Text style={styles.signUpText}>Log in</Text>
          </Touchable>
        </View>
      </KeyBoardWrapper>
    </ImageBackground>
  );
};
export default memo(RegisterScreen);
