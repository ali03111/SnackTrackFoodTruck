import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
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
  logInMain: {
    // paddingHorizontal: wp('3.5'),
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: wp('5'),
    marginTop: hp('8'),
  },
  buttonStyle: {
    borderRadius: 10,
    height: hp('5'),
    width: wp('42'),
    // marginVertical:hp('5')
    // alignSelf: 'flex-end',
    // marginTop: hp('3'),
  },
  logoImage: {
    width: wp('40'),
    marginTop: hp('15'),
    height: hp('8'),
    alignSelf: 'center',
  },
});
