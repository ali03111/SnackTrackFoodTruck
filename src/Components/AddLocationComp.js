import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { arrowRight, locationWithMobile } from '../Assets';
import { TextComponent } from './TextComponent';
import ThemeButton from './ThemeButton';

const AddLocationComp = () => {
  return (
    <View style={styles.container}>
      <Image
        source={locationWithMobile}
        resizeMode="contain"
        style={styles.image}
      />
      <TextComponent text={'ADD LOCATIONS'} />
      <TextComponent
        text={'Set your locations so people \ncan find your truck easily.'}
        fade
        size={'1.2'}
        styles={styles.descriptionText}
      />
      <ThemeButton
        title={'Add location'}
        btnStyle={styles.button}
        textStyle={styles.buttonText}
        image={arrowRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Colors.lightYellowBgColor,
    paddingVertical: hp('5'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2'),
  },
  image: {
    width: wp('60'),
    height: hp('15'),
    alignSelf: 'center',
  },
  descriptionText: {
    textAlign: 'center',
    marginTop: hp('1'),
  },
  button: {
    width: wp('50'),
    height: hp('5'),
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  buttonText: {
    fontSize: hp('1.5'),
  },
});

export default AddLocationComp;
