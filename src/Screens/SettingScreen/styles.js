import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  upperWhiteView: {
    width: wp('100'),
    // marginVertical: hp('0.5'),
    // paddingVertical: hp('1'),
  },
  headingText: {
    fontWeight: 'bold',
    paddingLeft: wp('2'),
    marginTop: hp('2'),
    // marginBottom: hp('1'),
  },
  leftIconStyle: {
    width: wp('10'),
    height: hp('5'),
  },
  viewStyle: {
    alignSelf: 'center',
    width: wp('95'),
    marginTop: hp('1'),
  },
  touchBtnViewStyles: {
    marginBottom: hp('2'),
  },
  dividerStyles: {
    width: wp('93'),
  },
  itemViewStyle: {
    marginBottom: hp('2'),
  },
});
