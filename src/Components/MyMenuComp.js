import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { TextComponent } from './TextComponent';
import { Touchable } from './Touchable';
import { threeDotsIcon } from '../Assets';
import { Colors } from '../Theme/Variables';
import { hp, wp } from '../Hooks/useResponsive';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const MyMenuComp = ({ item }) => {
  const dietary = item.dietary.slice(0, 2).join(', ');
  const extraCount =
    item.dietary.length > 2 ? ` +${item.dietary.length - 2}` : '';

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.foodImage} />

      <View style={styles.content}>
        <TextComponent text={item.title} family="bold" />

        <View style={styles.priceBadge}>
          <TextComponent
            text={`$ ${item.price.toFixed(2)}`}
            family="bold"
            color={Colors.white}
            size={'1.5'}
          />
        </View>

        <TextComponent
          text={`Dietary: ${dietary}${extraCount}`}
          size={'1.5'}
          fade
          style={{ marginTop: hp(0.5) }}
        />
      </View>
      <Menu>
        <MenuTrigger>
          <Image source={threeDotsIcon} style={styles.menuIcon} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption text="Edit" />
          <MenuOption text="Delete" />
        </MenuOptions>
      </Menu>
      {/* <Touchable onPress={() => {}} style={styles.menuBtn}>
        <Image source={threeDotsIcon} style={styles.menuIcon} />
      </Touchable> */}
    </View>
  );
};

export default MyMenuComp;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: wp(3),
    marginBottom: hp(2),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  foodImage: {
    width: wp(20),
    height: hp(10),
    borderRadius: 8,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    marginLeft: wp(3),
  },
  priceBadge: {
    marginTop: hp(0.5),
    backgroundColor: '#F3B800',
    alignSelf: 'flex-start',
    borderRadius: 5,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
  },
  menuBtn: {
    paddingHorizontal: wp(2),
  },
  menuIcon: {
    width: wp(4),
    height: wp(4),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
});
