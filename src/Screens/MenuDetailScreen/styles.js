import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: hp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingTop: hp(3),
    paddingBottom: hp(2),
  },
  backIcon: {
    width: wp(5),
    height: wp(5),
    resizeMode: 'contain',
    marginRight: wp(3),
  },
  foodImage: {
    width: '100%',
    height: hp(25),
    resizeMode: 'cover',
  },
  titleRow: {
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
  },
  priceBadge: {
    backgroundColor: '#F3B800',
    borderRadius: 6,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
  },
  section: {
    paddingHorizontal: wp(4),
    marginTop: hp(1),
    backgroundColor: Colors.white,
    paddingVertical: hp('2'),
  },
  dietaryWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(2),
  },
  dietaryBtn: {
    // paddingHorizontal: wp('2'),
    height: hp('4'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: wp('1'),
    marginVertical: hp('0.5'),
  },
  dietaryTag: {
    backgroundColor: '#F3B800',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 20,
    marginRight: wp(2),
    marginBottom: hp(1),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    marginTop: hp(1.5),
    backgroundColor: 'white',
    // paddingVertical: hp('10'),
    paddingTop: hp('15'),
    paddingBottom: hp('5'),
  },
  deleteBtn: {
    backgroundColor: '#FFE5E5',
    flex: 1,
    marginRight: wp(2),
    paddingVertical: hp(1.5),
    borderRadius: 10,
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: '#E5F0FF',
    flex: 1,
    paddingVertical: hp(1.5),
    borderRadius: 10,
    alignItems: 'center',
  },
});
