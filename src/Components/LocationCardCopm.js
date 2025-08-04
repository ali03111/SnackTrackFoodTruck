import {
  View,
  Text,
  Image,
  Switch,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { carPark, description, locationRed, seatAvilabe } from '../Assets';
import { TextComponent } from './TextComponent';
import DividerLine from './DividerLine';
import { Colors } from '../Theme/Variables';
import { MultiSelectBtn } from './MultiSelectBtn';
import { MultiView } from './MultiView';

const LocationCardComp = () => {
  const bottomArry = [
    {
      title: `Operating Hours:`,
      leftIcon: locationRed,
      rightChilderView: (
        <TextComponent text={'9:00 AM - 2:00 PM'} fade size={'1.5'} />
      ),
    },
    {
      title: `Parking availability:`,
      leftIcon: carPark,
      rightChilderView: <TextComponent text={'Yes'} fade size={'1.5'} />,
    },
    {
      title: `Seating options:`,
      leftIcon: seatAvilabe,
      rightChilderView: <TextComponent text={'Yes'} fade size={'1.5'} />,
    },
    {
      title: `Special notes:`,
      leftIcon: description,
    },
  ];

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Image
          source={locationRed}
          resizeMode="contain"
          style={styles.locationIcon}
        />
        <TextComponent
          text={'20 Cooper Square, New York, NY 10003, USA'}
          numberOfLines={2}
          size={'1.8'}
          styles={styles.addressText}
        />
      </View>

      <DividerLine DividerLineStyle={styles.divider} />

      <View style={styles.switchRow}>
        <TextComponent text={'Enable location'} fade size={'1.5'} />
        <Switch
          trackColor={{
            false: Colors.grayFaded,
            true: 'transparent',
          }}
          ios_backgroundColor="#EAF6ED"
          style={styles.switchStyle}
        />
      </View>

      <DividerLine DividerLineStyle={styles.divider} />

      <TextComponent text={'Operating Days'} fade size={'1.5'} />
      <View style={styles.daysRow}>
        <MultiSelectBtn
          items={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
          btnStyle={styles.dayButton}
        />
      </View>

      <View style={styles.infoContainer}>
        <MultiView
          data={bottomArry}
          leftStyles={styles.multiViewIcon}
          dividerStyles={{ borderBottomColor: Colors.primaryColor }}
          viewStyle={styles.multiViewContainer}
          titleStyles={styles.multiViewTitle}
        />
        <TextComponent
          text={
            'The application will allow food trucks to  profiles, locations, menus, and payments, while customers can search for nearby trucks, place orders, rate food trucks.'
          }
          size={'1.5'}
          fade
          styles={styles.descriptionText}
        />
      </View>
    </View>
  );
};

export default LocationCardComp;

const styles = StyleSheet.create({
  cardContainer: {
    width: wp('95'),
    backgroundColor: 'white',
    paddingVertical: hp('2'),
    alignSelf: 'center',
    marginVertical: hp('1'),
    borderRadius: 10,
    paddingHorizontal: wp('2'),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: wp('7'),
    height: hp('3'),
  },
  addressText: {
    width: wp('80'),
    marginLeft: wp('2'),
  },
  divider: {
    marginVertical: hp('1'),
  },
  switchRow: {
    width: wp('90'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchStyle: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    left: wp('2'),
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1'),
  },
  dayButton: {
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.primaryColor,
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.11,
    height: Dimensions.get('window').width * 0.11,
    paddingHorizontal: 0,
  },
  infoContainer: {
    width: wp('92'),
    alignSelf: 'center',
    marginTop: hp('1'),
    backgroundColor: Colors.lightYellowBgColor,
    paddingVertical: hp('2'),
    borderRadius: 10,
  },
  multiViewIcon: {
    width: wp('4'),
    height: hp('3'),
    marginLeft: wp('5'),
  },
  multiViewContainer: {
    width: wp('88'),
    // backgroundColor: 'red',
  },
  multiViewTitle: {
    fontSize: hp('1.5'),
  },
  descriptionText: {
    width: wp('80'),
    marginLeft: wp('10'),
  },
});
