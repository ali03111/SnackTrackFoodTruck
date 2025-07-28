import { View, Text, FlatList } from 'react-native';
import React, { memo, useCallback } from 'react';
import { HeaderComponent } from '../../Components/HeaderComponent';
import ThemeButton from '../../Components/ThemeButton';
import { hp, wp } from '../../Hooks/useResponsive';
import { styles } from './styles';
import useOrderScreen from './useOrderScreen';
import RecentOrderComp from '../../Components/RecentOrderComp';

const OrderScreen = ({ navigation }) => {
  const { selectedTab, setSelectedTab } = useOrderScreen(navigation);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <RecentOrderComp
          orderId="#12345-6789-0"
          time="03:15 pm"
          items={[
            { quantity: 3, name: 'Grilled Cheese Sandwiches' },
            { quantity: 2, name: 'Bubble Tea' },
            { quantity: 1, name: 'Sushi Burritos' },
            { quantity: 4, name: 'Extra Nachos' },
          ]}
          onCancel={() => console.log('Cancel clicked')}
          onCook={() => console.log('Cook clicked')}
          mainViewStyles={{ width: wp('95') }}
          orderStatus={selectedTab}
        />
      );
    },
    [selectedTab],
  );

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Orders'} />
      <View
        style={{
          width: wp('70'),
          flexDirection: 'row',
          marginHorizontal: wp('2'),
          marginVertical: hp('1'),
        }}
      >
        {['New', 'In process', 'Cancelled'].map(res => {
          return (
            <ThemeButton
              title={res}
              btnStyle={styles.dietaryBtn}
              isLinear={Boolean(res == selectedTab)}
              textStyle={{
                fontSize: hp('1.5'),
                marginHorizontal: wp('2'),
              }}
              onPress={() => setSelectedTab(res)}
            />
          );
        })}
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
        contentContainerStyle={styles.flatListView} // Padding around the list
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(OrderScreen);
