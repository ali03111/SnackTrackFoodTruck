import { View, Text, ImageBackground, Image } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComponent';
import {
  dollarRed,
  HomeBg,
  logoImg,
  ratingStarRed,
  yellowCamera,
} from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { CircleImage } from '../../Components/CircleImage';
import useEditProfileScreen from './useEditProfileScreen';
import { imageUrl } from '../../Utils/Urls';
import { styles } from './styles';
import { TextComponent } from '../../Components/TextComponent';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import { InputComponent } from '../../Components/InputComponent';
import ThemeButton from '../../Components/ThemeButton';
import { Touchable } from '../../Components/Touchable';
import { uploadFromGalary } from '../../Services/GlobalFunctions';

const EditProfileScreen = () => {
  const {
    userData,
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    updateUser,
    profileImg,
    setProfileImg,
  } = useEditProfileScreen();
  return (
    <View>
      <HeaderComponent headerTitle={'PROFILE'} isBack />
      <ImageBackground
        source={HomeBg}
        resizeMode="contain"
        style={{
          width: wp('100'),
          height: hp('30'),
          //   backgroundColor: 'red',
          top: hp('-2'),
        }}
      >
        <View style={{ alignSelf: 'center', marginTop: hp('5') }}>
          <CircleImage
            image={
              profileImg?.type ? profileImg?.uri : imageUrl(userData?.image)
            }
            uri={true}
            size={0.25}
          />
          <Touchable
            onPress={async () => {
              const img = await uploadFromGalary();
              setProfileImg(img);
            }}
          >
            <Image
              source={yellowCamera}
              resizeMode="contain"
              style={{
                width: wp('8'),
                height: hp('4'),
                position: 'absolute',
                right: wp('-2'),
                bottom: hp('2'),
              }}
            />
          </Touchable>
        </View>
        <View style={styles.ratingEarningsContainer}>
          <View style={styles.card}>
            <Image
              source={ratingStarRed}
              resizeMode="contain"
              style={styles.cardIcon}
            />
            <TextComponent
              text={userData?.avg_rating}
              styles={styles.cardTextSpacing}
            />
            <TextComponent text={'Ratings'} fade size={'1.5'} />
          </View>
          <View style={styles.card}>
            <Image
              source={dollarRed}
              resizeMode="contain"
              style={styles.cardIcon}
            />
            <TextComponent text={'$ 0.00'} styles={styles.cardTextSpacing} />
            <TextComponent text={'No earnings'} fade size={'1.5'} />
          </View>
        </View>
      </ImageBackground>
      <KeyBoardWrapper
        styles={styles.logInMain}
        showsVerticalScrollIndicator={false}
      >
        <InputComponent
          {...{
            heading: 'Full name',
            name: 'name',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Full name*',
            // isImage: emailIcon,
            defaultValue: userData?.name,
            maxLength: 50,
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
            defaultValue: userData?.email,
            maxLength: 50,
            isDisabled: true,
          }}
        />
        <ThemeButton
          onPress={handleSubmit(updateUser)}
          title={'Update Profile'}
          isTheme
          style={styles.buttonStyle}
          textStyle={styles.buttonText}
          btnStyle={{ marginTop: hp('20') }}
        />
      </KeyBoardWrapper>
    </View>
  );
};

export default memo(EditProfileScreen);
