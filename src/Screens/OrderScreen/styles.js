import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  dietaryBtn: {
    // paddingHorizontal: wp('2'),
    height: hp('4'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: wp('1'),
    marginVertical: hp('0.5'),
  },
  flatListView: {
    alignSelf: 'center',
  },
});
