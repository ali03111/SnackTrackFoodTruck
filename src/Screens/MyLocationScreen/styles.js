import { Platform, StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  upComingFlatlistView: {
    paddingBottom: hp('15'),
    flexGrow: 1,
    // paddingTop: hp('2'),
    // paddingTop: hp('1'),
    // backgroundColor: '#fff',

    // alignSelf: 'center',
  },
  rowBack: {
    // width: wp('100'),
    // marginBottom: 10,
    // flex: 1,
    borderRadius: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: wp('3.5'),
    marginTop: hp('1'),
  },
  backRightBtn: {
    height: Platform.OS == 'ios' ? hp('54') : hp('53'),
    // height: hp('54.6'),
    borderRadius: 10,
    // textAlign: 'left',
    // alignItems: 'center',
  },
  backRightBtnLeft: {
    backgroundColor: '#1877F2',
    flex: 1,
    // height: Platform.OS == 'ios' ? hp('10') : hp('10'),
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingTop: hp('22'),
    paddingLeft: wp('35'),
  },
  backRightBtnRight: {
    backgroundColor: '#EA4335',
    flex: 1,
    // height: Platform.OS == 'ios' ? hp('10') : hp('10'),
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'flex-end',
    paddingTop: hp('22'),
    paddingRight: wp('35'),
  },
  trashIcon: {
    width: wp('6'),
    resizeMode: 'contain',
  },
});
