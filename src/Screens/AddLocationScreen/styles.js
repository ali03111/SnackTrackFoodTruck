import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  scrollView: { flexGrow: 1, paddingBottom: hp('20'), marginTop: hp('1') },
  inputStyle: {
    // backgroundColor: 'red',
    height: hp('5'),
    fontSize: hp('1.5'),
    // paddingTop: hp('1.5'),
  },
  textTouchBtn: {
    height: hp('3'),
    // marginTop: hp('1.5'),
    width: wp('70'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: { fontSize: hp('1.2') },

  rightViewImg: { width: wp('5'), height: hp('3') },
  leftViewImg: { width: wp('3'), height: hp('3') },
  inputView: {
    width: wp('90'),
    alignSelf: 'center',
    height: hp('10'),
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: Platform.OS == 'ios' ? hp('0.8') : 0,
    paddingHorizontal: wp('2'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: Colors.dkBorderColor,
    backgroundColor: Colors.lightInnerColor,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  saveBtn: {
    width: wp('90'),
    alignSelf: 'center',
    height: hp('5'),
    marginTop: hp('2'),
  },
  // Component View

  mainView: {
    backgroundColor: 'white',
    paddingHorizontal: hp('2.3'),
    marginBottom: hp('1'),
  },
  compTitle: {
    fontSize: hp('1.2'),
    marginVertical: hp('1'),
  },
  innerView: {
    width: wp('90'),
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    backgroundColor: Colors.lightInnerColor,
    height: hp('4'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2'),
    marginBottom: hp('1'),
  },
  errorText: {
    fontSize: hp('1.2'),
    color: 'red',
    marginLeft: wp('1'),
    marginBottom: hp('1'),
  },
});
