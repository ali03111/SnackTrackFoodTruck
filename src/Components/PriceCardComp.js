import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { cardReceive } from '../Assets';
import { TextComponent } from './TextComponent';
import { Colors } from '../Theme/Variables';

const PriceCardComp = ({ title, img, price, priceBgColor }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.rowContainer}>
        <Image source={img} resizeMode="contain" style={styles.icon} />
        <TextComponent text={title} size="1.5" styles={styles.labelText} />
      </View>
      <TextComponent
        text={price}
        size="1.5"
        styles={{
          ...styles.amountText,
          backgroundColor: priceBgColor ?? Colors.lightGreen,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: hp('2'),
    width: wp('45'),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    width: wp('5'),
    height: hp('2'),
  },
  labelText: {
    color: Colors.textGray,
  },
  amountText: {
    paddingVertical: hp('0.7'),
    paddingHorizontal: wp('2'),
    alignSelf: 'center',
    backgroundColor: Colors.lightGreen,
    borderRadius: 5,
    marginTop: hp('1'),
  },
});

export default PriceCardComp;
