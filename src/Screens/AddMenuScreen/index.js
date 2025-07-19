import { View, Text, TextInput, Image } from 'react-native';
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
  } = useAddMenuScreen();

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
          //   errorName={errors['eventTitle']}
          innerLeftView={
            <Controller
              control={control}
              name="eventTitle"
              render={({ field: { onChange, value } }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={itemName}
                    resizeMode="contain"
                    style={styles.inputIconStyle}
                  />
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter expense name"
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
          title={'Starting period'}
          //   errorName={errors['eventTitle']}
          centerInnerView={
            <Controller
              control={control}
              name="eventStartDate"
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
                      //   alignSelf: 'flex-start',
                      color: 'black',
                      fontSize: hp('1.5'),
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
          title={'Price'}
          //   errorName={errors['eventTitle']}
          innerLeftView={
            <Controller
              control={control}
              name="eventTitle"
              render={({ field: { onChange, value } }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={price}
                    resizeMode="contain"
                    style={styles.inputIconStyle}
                  />
                  <TextInput
                    style={styles.inputStyle}
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
              name="eventStartDate"
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    ...styles.textTouchBtn,
                    height: 'auto',
                    paddingHorizontal: wp('10'),
                  }}
                  onPress={
                    () => {}
                    // toggleDate('eventStartDate', 'date', null, onChange)
                  }
                >
                  <Touchable>
                    <Image
                      source={uploadImgRed}
                      resizeMode="contain"
                      style={styles.uploadImg}
                    />
                  </Touchable>
                </View>
              )}
            />
          }
        />

        <TitleInputView
          title={'Dietary Information'}
          errorName={errors['eventLocation']?.locationName}
          innerViewOuterStyle={{ height: 'auto' }}
          innerLeftView={
            <Controller
              control={control}
              name="eventLocation"
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
