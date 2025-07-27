import { View, Text, FlatList, Image } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComponent';
import { circleYellow, threeDotsIcon, veg_soup } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import { Touchable } from '../../Components/Touchable';
import { Colors } from '../../Theme/Variables';
import { styles } from './styles';
import MyMenuComp from '../../Components/MyMenuComp';

const MyMenuScreen = () => {
  const foodList = [
    {
      title: 'Vegetable soup',
      price: 12.6,
      image: veg_soup, // Replace with real images
      dietary: ['Vegan', 'Gluten-Free'],
    },
    {
      title: 'Korean BBQ',
      price: 12.6,
      image: veg_soup,
      dietary: ['Vegan', 'Gluten-Free', 'Halal', 'Low Fat'],
    },
    {
      title: 'Loaded Fries',
      price: 12.6,
      image: veg_soup,
      dietary: ['Vegan', 'Gluten-Free'],
    },
  ];

  const renderItem = ({ item }) => {
    return <MyMenuComp item={item} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Menu'} rightIconImg={circleYellow} />
      <FlatList
        data={foodList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: wp(4) }}
      />
    </View>
  );
};

export default memo(MyMenuScreen);
