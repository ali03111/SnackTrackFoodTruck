import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
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
  menuBtn: {
    paddingHorizontal: wp(2),
  },
  menuIcon: {
    width: wp(4),
    height: wp(4),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
});
