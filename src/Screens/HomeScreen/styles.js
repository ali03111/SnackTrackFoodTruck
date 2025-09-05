import { Platform, StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  ImgBg: {
    width: wp('100'),
    height: hp('30'),
    marginTop: Platform.OS == 'ios' ? hp('-4') : hp('-3'),
    flexGrow: 1,
  },
  ratingEarningsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5'),
    marginTop: hp('2'),
  },
  card: {
    paddingVertical: hp('2'),
    borderRadius: 10,
    paddingHorizontal: wp('13'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cardIcon: {
    width: wp('15'),
    height: hp('8'),
  },
  cardTextSpacing: {
    marginVertical: hp('1'),
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('90'),
    alignSelf: 'center',
  },
  cardBox: {
    paddingHorizontal: wp('7'),
    backgroundColor: Colors.yellowBgColor,
    borderRadius: 10, // optional: if you're using a card-like look
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('2'),
  },
  cardIcon: {
    width: wp('10'),
    height: wp('10'),
  },
  cardTextSpacing: {
    marginVertical: hp('1'), // or whatever spacing you want between texts
  },
  myOrderHeadingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('90'),
    alignSelf: 'center',
    marginVertical: hp('2'),
  },
  multiViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('60'),
    justifyContent: 'space-between',
    marginLeft: wp('4'),
  },
  flatListView: {
    paddingHorizontal: hp('2'),
    marginVertical: hp('1'),
  },
});
