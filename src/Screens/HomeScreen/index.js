import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import {
  activeOrders,
  addCircleWhite,
  arrowRight,
  arrRight,
  basket,
  building,
  cardReceive,
  cardSend,
  commentIcon,
  dollarRed,
  heartYellow,
  HomeBg,
  plusWhite,
  ratingStarRed,
  station,
  todayOrders,
  wallet,
} from '../../Assets';
import { styles } from './styles';
import HomeHeaderComp from '../../Components/HomeHeaderComp';
import { TextComponent } from '../../Components/TextComponent';
import AddLocationComp from '../../Components/AddLocationComp';
import AddMenuBtn from '../../Components/AddMenuBtn';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import HomeLocationCardComp from '../../Components/HomeLocationCardComp';
import { MultiView } from '../../Components/MultiView';
import { MultiSelectBtn } from '../../Components/MultiSelectBtn';
import RecentOrderComp from '../../Components/RecentOrderComp';

const categoryItem = [
  {
    title: `Fuel`,
    leftIcon: station,
    rightText: '$358.30',
  },
  {
    title: 'House holds',
    leftIcon: building,
    rightText: '$358.30',
  },
  {
    title: 'Food and grocery',
    leftIcon: basket,
    rightText: '$358.30',
  },
];

const centerView = [
  {
    title: 'Recent orders',
    onPress: () => {},
    id: 'recentOrder',
  },
  {
    title: `Running orders`,
    onPress: () => {},
    id: 'runnningOrder',
  },
];

const HomeScreen = () => {
  const renderItem = useCallback(({ item, index }) => {
    return <RecentOrderComp />;
  }, []);
  return (
    <ImageBackground source={HomeBg} style={styles.ImgBg} resizeMode="contain">
      <HomeHeaderComp />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: hp('10') }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ratingEarningsContainer}>
          <View style={styles.card}>
            <Image
              source={ratingStarRed}
              resizeMode="contain"
              style={styles.cardIcon}
            />
            <TextComponent text={'0'} styles={styles.cardTextSpacing} />
            <TextComponent text={'No ratings'} fade size={'1.5'} />
          </View>
          <View style={styles.card}>
            <Image
              source={dollarRed}
              resizeMode="contain"
              style={styles.cardIcon}
            />
            <TextComponent text={'$ 0.00'} styles={styles.cardTextSpacing} />
            <TextComponent text={'No earnings'} fade size={'1.5'} />
          </View>
        </View>
        <AddLocationComp />
        <AddMenuBtn />
        <View style={styles.myOrderHeadingView}>
          <TextComponent
            text={'My orders'}
            size={'1.7'}
            styles={{ fontWeight: '400' }}
          />
          <TextComponent text={'View all'} size={'1.7'} />
        </View>
        <View style={styles.multiViewStyle}>
          <MultiSelectBtn items={centerView} />
        </View>
        <View>
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={renderItem}
            horizontal // Enable horizontal scrolling
            keyExtractor={item => item.toString()}
            showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
            contentContainerStyle={styles.flatListView} // Padding around the list
          />
        </View>

        {/* <HomeLocationCardComp /> */}
        <View style={styles.cardContainer}>
          <View style={styles.cardBox}>
            <Image
              source={activeOrders}
              resizeMode="contain"
              style={styles.cardIcon}
            />
            <TextComponent text={'0'} styles={styles.cardTextSpacing} />
            <TextComponent
              text={'Active \norders'}
              fade
              size={'1.5'}
              styles={{ textAlign: 'center' }}
            />
          </View>
          <View style={styles.cardBox}>
            <Image
              source={todayOrders}
              resizeMode="contain"
              style={styles.cardIcon}
            />
            <TextComponent text={'0'} styles={styles.cardTextSpacing} />
            <TextComponent
              text={'Today’s \norders'}
              fade
              size={'1.5'}
              styles={{ textAlign: 'center' }}
            />
          </View>
          <View style={styles.cardBox}>
            <Image
              source={heartYellow}
              resizeMode="contain"
              style={styles.cardIcon}
            />
            <TextComponent text={'0'} styles={styles.cardTextSpacing} />
            <TextComponent
              text={'Completed \norders'}
              fade
              size={'1.5'}
              styles={{ textAlign: 'center' }}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default memo(HomeScreen);
