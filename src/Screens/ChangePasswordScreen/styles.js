import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  heading: {
    fontSize: hp('2.5'),
    marginTop: hp('2'),
    fontWeight: 'bold',
    marginLeft: wp('5'),
  },
  des: {
    width: wp('90'),
    marginTop: hp('1'),
    marginLeft: wp('5'),
  },
  centerView: {
    // width: wp('93'),
    borderRadius: 10,
    paddingVertical: hp('3'),
    alignItems: 'center',
    marginTop: hp('2'),
    marginBottom: hp('10'),
  },
  btn: { width: wp('90'), marginTop: hp('5') },
  lockstyle: {
    flex: 0.25,
  },
  inputView: {
    flexDirection: 'row',
    width: wp('90'),
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    height: hp('7'),
    marginTop: hp('1'),
    alignItems: 'center',
    borderColor: Colors.grayBorder,
    paddingLeft: wp('2'),
    backgroundColor: 'transparent',
    color: 'black',
  },
});
