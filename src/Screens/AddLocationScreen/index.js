import { View, Text, TextInput, Image, Switch } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComponent';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import { Controller } from 'react-hook-form';
import useAddLocationScreen from './useAddLocationScreen';
import { carPark, check, gpsImg, seatAvilabe } from '../../Assets';
import { Touchable } from '../../Components/Touchable';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import { timeDateArry } from '../../Utils/localDB';
import ThemeButton from '../../Components/ThemeButton';
import TimePickerModal from '../../Components/TimePickerModal';

const AddLocationScreen = () => {
  const { control, errors } = useAddLocationScreen();

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
    mainViewStyles,
  }) => {
    return (
      <View style={{ ...styles.mainView, ...mainViewStyles }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: rightView ? 'space-between' : 'flex-start',
            alignItems: 'center',
          }}
        >
          {title && (
            <TextComponent
              text={title}
              fade={true}
              styles={{
                ...styles.compTitle,
                ...titleStyle,
              }}
            />
          )}
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
    <View>
      <HeaderComponent headerTitle={'ADD LOCATION'} isBack />
      <KeyBoardWrapper
        styles={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <TitleInputView
          title={'Write your truck name *'}
          errorName={errors['eventTitle']}
          innerLeftView={
            <Controller
              control={control}
              name="eventTitle"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter truck name"
                  maxLength={50}
                  placeholderTextColor={'gray'}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          }
        />
        <TitleInputView
          title={'Add Location *'}
          errorName={errors['eventLocation']?.locationName}
          innerLeftView={
            <Controller
              control={control}
              name="eventLocation"
              render={({ field: { onChange, value } }) => (
                <Touchable
                  style={styles.textTouchBtn}
                  // onPress={() =>
                  //   dynamicRoute('LocationScreen', (locationName, coords) => {
                  //     onChange({
                  //       locationName: locationName,
                  //       coords: coords,
                  //     });
                  //   })
                  // }
                >
                  <TextComponent
                    text={value?.locationName ?? 'Please select location.'}
                    styles={{ ...styles.textStyle, width: wp('80') }}
                  />
                </Touchable>
              )}
            />
          }
          innerExtraView={
            <Image
              source={gpsImg}
              resizeMode="contain"
              style={styles.leftViewImg}
              tintColor={Colors.primaryColor}
            />
          }
        />
        <TitleInputView
          mainViewStyles={{ marginTop: hp('-1') }}
          errorName={errors['eventLocation']?.locationName}
          innerLeftView={
            <Controller
              control={control}
              name="eventLocation"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textTouchBtn}>
                  <Image
                    source={carPark}
                    resizeMode="contain"
                    style={styles.leftViewImg}
                  />
                  <TextComponent
                    text={'Parking availability'}
                    styles={{
                      ...styles.textStyle,
                      width: wp('80'),
                      marginLeft: wp('3'),
                    }}
                  />
                </View>
              )}
            />
          }
          innerExtraView={
            <Controller
              control={control}
              name={`privateEvent`}
              render={({ field: { onChange, value } }) => {
                return (
                  <Switch
                    trackColor={{
                      false: Colors.grayFaded,
                      true: 'transparent',
                    }}
                    thumbColor={value ? Colors.primaryColor : '#EAF6ED'}
                    ios_backgroundColor="#EAF6ED"
                    onValueChange={e => onChange(e ? 1 : 0)}
                    value={Boolean(value == 1)}
                    style={{
                      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                      left: wp('2'),
                    }}
                  />
                );
              }}
            />
          }
        />
        <TitleInputView
          mainViewStyles={{ marginTop: hp('-1') }}
          errorName={errors['eventLocation']?.locationName}
          innerLeftView={
            <Controller
              control={control}
              name="eventLocation"
              render={({ field: { onChange, value } }) => (
                <View style={styles.textTouchBtn}>
                  <Image
                    source={seatAvilabe}
                    resizeMode="contain"
                    style={styles.leftViewImg}
                  />
                  <TextComponent
                    text={'Seating availability'}
                    styles={{
                      ...styles.textStyle,
                      width: wp('80'),
                      marginLeft: wp('3'),
                    }}
                  />
                </View>
              )}
            />
          }
          innerExtraView={
            <Controller
              control={control}
              name={`privateEvent`}
              render={({ field: { onChange, value } }) => {
                return (
                  <Switch
                    trackColor={{
                      false: Colors.grayFaded,
                      true: 'transparent',
                    }}
                    thumbColor={value ? Colors.primaryColor : '#EAF6ED'}
                    ios_backgroundColor="#EAF6ED"
                    onValueChange={e => onChange(e ? 1 : 0)}
                    value={Boolean(value == 1)}
                    style={{
                      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                      left: wp('2'),
                    }}
                  />
                );
              }}
            />
          }
        />
        <TitleInputView
          mainViewStyles={{ marginTop: hp('-1'), paddingBottom: hp('2') }}
          title={'Any special notes'}
          errorName={errors['eventTitle']}
          centerInnerView={
            <Controller
              control={control}
              name="eventTitle"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputView}>
                  <TextInput
                    style={{
                      overflow: 'scroll',
                      alignSelf: 'flex-start',
                      color: 'black',
                    }}
                    placeholder="Enter truck name"
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
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: hp('2'),
          }}
        >
          <TextComponent
            text={'Set Operating Days'}
            styles={{
              fontWeight: 'bold',
              paddingLeft: wp('5'),
              marginBottom: hp('1'),
            }}
          />
          {timeDateArry.map((res, index) => (
            <TitleInputView
              errorName={errors['eventLocation']?.locationName}
              innerLeftView={
                <Controller
                  control={control}
                  name="eventLocation"
                  render={({ field: { onChange, value } }) => (
                    <Touchable
                      style={{ ...styles.textTouchBtn, width: wp('58') }}
                    >
                      <Image
                        source={check}
                        resizeMode="contain"
                        style={{ ...styles.leftViewImg, width: wp('5') }}
                      />
                      <TextComponent
                        text={res?.title}
                        styles={{
                          ...styles.textStyle,
                          width: wp('80'),
                          marginLeft: wp('3'),
                        }}
                      />
                    </Touchable>
                  )}
                />
              }
              innerExtraView={
                <Controller
                  control={control}
                  name={`privateEvent`}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Touchable
                        style={{
                          ...styles.textTouchBtn,
                          marginLeft: 'auto', // ✅ Push to the right
                          width: 'auto',
                        }}
                        onPress={
                          () => {}
                          // toggleDate('eventStartTime', 'time', null, onChange)
                        }
                      >
                        <TextComponent
                          text={`${res?.openTime} to ${res?.closeTime}`}
                          // text={getCustom12HourTime(value ?? currentDate)}
                          styles={{ ...styles.textStyle, textAlign: 'right' }}
                        />
                      </Touchable>
                    );
                  }}
                />
              }
            />
          ))}
          <ThemeButton
            title={'Save'}
            btnStyle={styles.saveBtn}
            textStyle={{ fontSize: hp('1.5') }}
          />
        </View>
      </KeyBoardWrapper>
      <TimePickerModal isModal={false} />
    </View>
  );
};

export default memo(AddLocationScreen);
