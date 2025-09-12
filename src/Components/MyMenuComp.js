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
import { deleteMenuUrl, imageUrl } from '../Utils/Urls';
import BlurImage from './BlurImage';
import API from '../Utils/helperFunc';
import { useMutation } from '@tanstack/react-query';
import { errorMessage, successMessage } from '../Config/NotificationMessage';
import useReduxStore from '../Hooks/UseReduxStore';
import NavigationService from '../Services/NavigationService';

const MyMenuComp = ({ item }) => {
  const { queryClient } = useReduxStore();

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      return API.delete(deleteMenuUrl, {
        id: item?.id,
      });
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        successMessage(data?.message);
      } else {
        console.log('jkdsbkljsdbvklsdbvklsbklvsvd', data);
        errorMessage(data?.message);
      }
    },
    onError: () => {
      errorMessage('Network request failed.');
    },
  });

  // Extract names from dietary_information array and slice the first 2
  const dietaryNames = item.dietary_information.map(d => d.name);
  const dietary = dietaryNames.slice(0, 2).join(', ');
  const extraCount =
    item.dietary_information.length > 2
      ? ` +${item.dietary_information.length - 2}`
      : '';

  return (
    <View style={styles.card}>
      <BlurImage source={imageUrl(item.image)} styles={styles.foodImage} />

      <View style={styles.content}>
        <TextComponent text={item.name} family="bold" />

        <View style={styles.priceBadge}>
          <TextComponent
            text={`$ ${item.price}`}
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
          <MenuOption
            text="Edit"
            onSelect={() => {
              NavigationService.navigate('AddMenuScreen', { id: item?.id });
            }}
          />
          <MenuOption
            text="Delete"
            onSelect={async () => {
              await mutateAsync();
              queryClient.invalidateQueries(['myMenuList']);
            }}
          />
        </MenuOptions>
      </Menu>
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
  menuIcon: {
    width: wp(4),
    height: wp(4),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
});
