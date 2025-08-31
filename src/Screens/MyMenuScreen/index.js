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
import useMyMenuScreen from './useMyMenuScreen';

const MyMenuScreen = ({ navigation }) => {
  const { menuList } = useMyMenuScreen(navigation);

  const renderItem = ({ item }) => {
    return <MyMenuComp item={item} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        headerTitle={'Menu'}
        rightIconImg={circleYellow}
        onRightPress={() => navigation.navigate('AddMenuScreen')}
      />
      <FlatList
        data={menuList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: wp(4) }}
      />
    </View>
  );
};

export default memo(MyMenuScreen);
