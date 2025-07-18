import { Dimensions, StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors, FontSize } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  dotList: {
    flexDirection: 'row',
    width: wp('25'),
    // height: hp('15'),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // flexWrap: 'wrap',
    paddingHorizontal: wp('4'),
    position: 'absolute',
    bottom: hp('5'),
    // backgroundColor: 'red',
    // zIndex: 2,
    // // backgroundColor: Colors.backgroundTheme,
    // padding: 10,
  },
  centerMainView: {
    width: wp('100'),
    alignItems: 'left',
    paddingHorizontal: wp('4'),
  },
  centerHeading: {
    fontSize: hp('4.4'),
    paddingHorizontal: wp('4'),
    width: wp('100'),
    textAlign: 'center',
    color: Colors.white,
    fontWeight: '700',
  },
  centerText: {
    fontSize: hp('2.2'),
    // fontFamily: fontFamily.regular,
    paddingHorizontal: wp('5'),
    width: wp('100'),
    textAlign: 'center',
    color: Colors.white,
    lineHeight: hp('4'),
  },
  dot: (currentIndex, index) => ({
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    height: Dimensions.get('window').width * 0.016,
    width:
      currentIndex == index
        ? Dimensions.get('window').width * 0.09
        : Dimensions.get('window').width * 0.04,
    backgroundColor:
      currentIndex == index ? Colors.primaryColor : 'transparent',
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  }),
  bannerImg: {
    alignItems: 'center',
    // justifyContent: 'flex-end',
    // height: hp('100'),
    width: wp('100'),
    marginTop: hp('10'),
    // aspectRatio: 1,
    // paddingBottom: hp('15'),
    // aspectRatio: 1,
  },
  btnArrow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryColor,
    borderRadius: 25,
    paddingHorizontal: wp('4'),
    marginBottom: hp('5'),
  },
  arrowText: {
    // fontFamily: fontFamily.medium,
    fontSize: hp('1.8'),
    paddingRight: wp('1'),
    color: Colors.white,
    lineHeight: 16,
  },
  hdStyle: {
    fontSize: hp('3'),
    marginVertical: hp('2'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primaryColor,
  },
  descStyle: {
    fontSize: FontSize.scale16,
    lineHeight: 20,
    color: Colors.textGray,
    textAlign: 'center',
  },
  splashImg: {
    width: wp('60'),
    height: hp('30'),
    marginBottom: hp('1'),
  },
  thmBtn: {
    // position: 'absolute',
    // bottom: hp('10'),
    width: wp('30'),
    alignSelf: 'center',
    height: hp('5'),
  },
});
