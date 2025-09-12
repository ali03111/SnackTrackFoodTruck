import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { memo, useCallback } from 'react';
import { HeaderComponent } from '../../Components/HeaderComponent';
import { addIcon, editWhite, plusWhite, trashWhite } from '../../Assets';
import { AniFlatOneByOne } from '../../AnimatedComp/AniFlatOneByOne';
import { styles } from './styles';
import LocationCardCopm from '../../Components/LocationCardCopm';
import { SwipeListView } from 'react-native-swipe-list-view';
import useMyLocationScreen from './useMyLocationScreen';

const MyLocationScreen = ({ navigation }) => {
  const { locationList } = useMyLocationScreen();

  const renderItem = useCallback(
    ({ item, index }) => {
      return <LocationCardCopm item={item} />;
    },
    [8],
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {}}
      >
        <Image source={trashWhite} style={styles.trashIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}>
        <Image source={editWhite} style={styles.trashIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        headerTitle={'MY LOCATIONS'}
        rightIconImg={addIcon}
        onRightPress={() => navigation.navigate('AddLocationScreen')}
      />
      <SwipeListView
        showsVerticalScrollIndicator={false}
        style={styles.upComingFlatlistView}
        useFlatList
        // data={[1, 23, 4]}
        data={locationList}
        // sections={bottomData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        previewRowKey={'0'}
        // previewOpenValue={-40}
        previewOpenDelay={3000}
        // previewOpenValue={-40}
        closeOnRowPress
        refreshing={false}
      />
    </View>
  );
};

export default memo(MyLocationScreen);
