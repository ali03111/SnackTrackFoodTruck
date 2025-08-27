import { View, Text, TextInput, Image, Platform, Alert } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComponent';
import useAddMenuScreen from './useAddMenuScreen';
import { TextComponent } from '../../Components/TextComponent';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import { Controller } from 'react-hook-form';
import { Touchable } from '../../Components/Touchable';
import ThemeButton from '../../Components/ThemeButton';
import { hp, wp } from '../../Hooks/useResponsive';
import { styles } from './styles';
import {
  arrRight,
  arrRightPurple,
  description,
  dietary,
  itemName,
  price,
  uploadImgRed,
} from '../../Assets';
import BtnModalComponent from '../../Components/BtnModalComponent';
import {
  uploadFromCamera,
  uploadFromGalary,
} from '../../Services/GlobalFunctions';
import { imageUrl } from '../../Utils/Urls';

const AddMenuScreen = () => {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    inputWidth,
    setInputWidth,
    modalState,
    setModalState,
    allTags,
  } = useAddMenuScreen();

  console.log('allTags', allTags);

  const TitleInputView = ({
    title,
    onChange,
    placeHolder,
    validation,
    rightView,
    innerViewOuterStyle,
    innerExtraView,
    titleStyle,
    innerLeftView,
    centerInnerView,
    errorName,
    errorView,
  }) => {
    return (
      <View style={styles.mainView}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: rightView ? 'space-between' : 'flex-start',
            alignItems: 'center',
          }}
        >
          <TextComponent
            text={title}
            fade={true}
            styles={{
              ...styles.compTitle,
              ...titleStyle,
            }}
          />
          {rightView}
        </View>
        {centerInnerView ? (
          centerInnerView
        ) : (
          <>
            <View
              style={{
                ...styles.innerView,
                ...innerViewOuterStyle,
              }}
            >
              {innerLeftView}
              {innerExtraView}
            </View>
            {errorName && (
              <TextComponent
                text={errorName.message}
                styles={styles.errorText}
              />
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent isBack headerTitle={'ADD MENU'} />
      <KeyBoardWrapper styles={{ paddingBottom: hp('10') }}>
        <TitleInputView
          title={'Item Name'}
          errorName={errors['menuName']}
          innerLeftView={
            <Controller
              control={control}
              name="menuName"
              render={({ field: { onChange, value } }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={itemName}
                    resizeMode="contain"
                    style={styles.inputIconStyle}
                  />
                  <TextInput
                    style={{
                      ...styles.inputStyle,
                      paddingTop: Platform.OS == 'ios' ? 0 : hp('1'),
                    }}
                    placeholder="Enter the dish or item name"
                    maxLength={50}
                    placeholderTextColor={'gray'}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
          }
        />
        <TitleInputView
          title={'Description'}
          errorName={errors['description']}
          centerInnerView={
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <View style={styles.desInputView}>
                  <Image
                    source={description}
                    resizeMode="contain"
                    style={{
                      width: wp('4'),
                      height: hp('2'),
                      marginRight: wp('2'),
                    }}
                  />
                  <TextInput
                    style={{
                      overflow: 'scroll',
                      color: 'black',
                      fontSize: hp('1.5'),
                      paddingVertical: hp('0'),
                    }}
                    placeholder="Enter item desription"
                    maxLength={50}
                    placeholderTextColor={'gray'}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
          }
        />
        <TitleInputView
          title={'price'}
          errorName={errors['price']}
          innerLeftView={
            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, value } }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={price}
                    resizeMode="contain"
                    style={styles.inputIconStyle}
                  />
                  <TextInput
                    style={{
                      ...styles.inputStyle,
                      paddingTop: Platform.OS == 'ios' ? 0 : hp('1'),
                    }}
                    placeholder="Input the price for the item"
                    maxLength={50}
                    placeholderTextColor={'gray'}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
          }
        />
        <TitleInputView
          title={'Image (optionally)'}
          //   errorName={errors['eventTitle']}
          centerInnerView={
            <Controller
              control={control}
              name="img"
              render={({ field: { onChange, value } }) => (
                <>
                  <View
                    style={{
                      ...styles.textTouchBtn,
                      height: 'auto',
                      paddingHorizontal: wp('10'),
                      borderRadius: 10,
                    }}
                  >
                    <Touchable
                      onPress={async () => {
                        Alert.alert(
                          'Pick to choose image',
                          '',
                          [
                            {
                              text: 'Camera',
                              onPress: async () => {
                                const imgData = await uploadFromCamera();
                                onChange(imgData);
                              },
                            },
                            {
                              text: 'Gallery', // Just a dismissal button
                              onPress: async () => {
                                const imgData = await uploadFromGalary();
                                onChange(imgData);
                              },
                            },
                          ],
                          { cancelable: true, onDismiss: () => {} },
                        );
                      }}
                    >
                      <Image
                        source={
                          value?.uri
                            ? {
                                uri: value?.isEdit
                                  ? imageUrl(value?.uri)
                                  : value?.uri,
                              }
                            : uploadImgRed
                        }
                        resizeMode={value?.uri ? 'cover' : 'contain'}
                        style={{
                          ...styles.uploadImg,
                          borderRadius: 10,
                        }}
                      />
                    </Touchable>
                  </View>
                  {errors['eventImg'] && (
                    <TextComponent
                      text={errors['eventImg'].message}
                      styles={styles.errorText}
                    />
                  )}
                </>
              )}
            />
          }
        />

        <TitleInputView
          title={'Dietary Information'}
          errorName={errors['operationDays']}
          innerViewOuterStyle={{ height: 'auto' }}
          innerLeftView={
            <Controller
              control={control}
              name="operationDays"
              render={({
                field: { onChange, value = [1, 2, 3, 4, 6, 7, 8, 9] },
              }) =>
                value.length > 0 ? (
                  <View
                    style={{
                      ...styles.textTouchBtn,
                      ...styles.dietaryView,
                    }}
                  >
                    {value.map(res => {
                      return (
                        <ThemeButton
                          title={'Vegan'}
                          btnStyle={styles.dietaryBtn}
                          textStyle={{
                            fontSize: hp('1.5'),
                            marginHorizontal: wp('2'),
                          }}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <Touchable
                    style={styles.textTouchBtn}
                    onPress={() => setModalState(true)}
                  >
                    <Image
                      source={dietary}
                      resizeMode="contain"
                      style={styles.inputIconStyle}
                    />
                    <TextComponent
                      text={'select Dietary Information'}
                      styles={{
                        ...styles.textStyle,
                        //   width: wp('80'),
                      }}
                      size={'1.5'}
                    />
                  </Touchable>
                )
              }
            />
          }
          innerExtraView={
            <Controller
              control={control}
              name="eventLocation"
              render={({
                field: { onChange, value = [1, 2, 3, 4, 6, 7, 8, 9] },
              }) =>
                value.length > 0 ? (
                  <TextComponent
                    text={'Add more'}
                    onPress={() => setModalState(true)}
                    size={'1.5'}
                  />
                ) : (
                  <Image
                    source={arrRightPurple}
                    resizeMode="contain"
                    style={styles.icon}
                    tintColor="black"
                  />
                )
              }
            />
          }
        />

        <ThemeButton
          title={'Add menu'}
          isTheme
          btnStyle={styles.saveBtn}
          textStyle={{ fontSize: hp('1.5') }}
        />
      </KeyBoardWrapper>
      {modalState && (
        <BtnModalComponent
          activeTags={[]}
          allData={
            [
              {
                id: 1,
                title: 'Gluten free',
              },
              {
                id: 2,
                title: 'Dairy free',
              },
              {
                id: 3,
                title: 'Paleo',
              },
              {
                id: 4,
                title: 'Vegetarian',
              },
              {
                id: 5,
                title: 'FODMAP',
              },
            ] ?? []
          }
          //   heading={onPressKey}
          activeTitle={'select Diet'}
          isModal={modalState}
          onPress={() => setModalState(false)}
          onSelect={() => {}}
          //   onPress={(e, isTrue) => toggleModal(e, isTrue)}
          onBackPress={() => setModalState(false)}
        />
      )}
    </View>
  );
};

export default memo(AddMenuScreen);
