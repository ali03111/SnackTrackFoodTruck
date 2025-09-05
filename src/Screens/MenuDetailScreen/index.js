import { View, Text, ScrollView, Image } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComponent';
import { TextComponent } from '../../Components/TextComponent';
import { Touchable } from '../../Components/Touchable';
import { styles } from './styles';
import { veg_soupBig } from '../../Assets';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';
import ThemeButton from '../../Components/ThemeButton';

const MenuDetailScreen = () => {
  const menu = {
    title: 'Vegetable soup',
    price: 12.6,
    description:
      'The Application Will Allow Food Trucks To Manage Profiles, Locations, Menus, And Payments, While Customers Can Search For Nearby Trucks, Place Orders, Rate Food Trucks.',
    dietary: ['Vegan', 'Gluten-free', 'Vegetarian'],
    image: veg_soupBig, // Replace with your image
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'MENU DETAILS'} isBack />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: 'white', paddingBottom: hp('2') }}>
          {/* Image */}
          <Image source={menu.image} style={styles.foodImage} />

          {/* Title & Price */}
          <View style={styles.titleRow}>
            <TextComponent text={menu.title} family="bold" />
            <View style={styles.priceBadge}>
              <TextComponent
                text={`$ ${menu.price.toFixed(2)}`}
                family="bold"
                size={'1.5'}
                isWhite
              />
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <TextComponent
            text="Description:"
            color={Colors.grey}
            family="400"
            style={{ marginBottom: hp(0.5) }}
          />
          <TextComponent
            text={menu.description}
            color={Colors.grey}
            size={'1.5'}
          />
        </View>

        {/* Dietary Info */}
        <View style={styles.section}>
          <TextComponent
            text="Dietary Information:"
            color={Colors.grey}
            family="semiBold"
            styles={{ marginBottom: hp(2) }}
          />
          <View style={styles.dietaryWrapper}>
            {menu.dietary.map((item, index) => (
              <ThemeButton
                title={'Vegan'}
                btnStyle={styles.dietaryBtn}
                textStyle={{
                  fontSize: hp('1.5'),
                  marginHorizontal: wp('3'),
                }}
              />
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <Touchable style={styles.deleteBtn}>
            <TextComponent
              text="Delete Menu"
              color={Colors.red}
              family={'300'}
            />
          </Touchable>
          <Touchable style={styles.editBtn}>
            <TextComponent
              text="Edit Menu"
              color={Colors.primary}
              family={'300'}
            />
          </Touchable>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(MenuDetailScreen);
