import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { TextComponent } from './TextComponent';
import { arrRight } from '../Assets';
import { Colors } from '../Theme/Variables';
import NavigationService from '../Services/NavigationService';

const AddMenuBtn = () => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => NavigationService.navigate('AddMenuScreen')}
    >
      <TextComponent text="ADD MENU" styles={styles.titleText} />
      <View style={styles.descriptionContainer}>
        <TextComponent
          text={
            'Add your menu so people can find \nthe food you are offering .'
          }
          size="1.5"
          fade
        />
        <Image
          source={arrRight}
          tintColor={Colors.primaryColor}
          resizeMode="contain"
          style={styles.arrowIcon}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: hp('2'),
    paddingHorizontal: wp('3'),
    alignSelf: 'center',
    marginVertical: hp('2'),
  },
  titleText: {
    fontWeight: '400',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1'),
  },
  arrowIcon: {
    width: wp('6'),
    height: hp('3'),
  },
});

export default AddMenuBtn;
