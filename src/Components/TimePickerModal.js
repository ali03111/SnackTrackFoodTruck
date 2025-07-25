import { Image, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { boldDivider, clockRed, crossWhite } from '../Assets';
import { TextComponent } from '../Components/TextComponent';
import ThemeButton from '../Components/ThemeButton';
import { useState } from 'react';
import { Touchable } from '../Components/Touchable';
import { Colors } from '../Theme/Variables';
import { hp, wp } from '../Hooks/useResponsive';
import DatePicker from 'react-native-date-picker';
import {
  convertToCustomTimeFormat,
  formatTimeBothFormats,
  formatTimeTo24Hour,
  getCustom12HourTime,
} from '../Services/GlobalFunctions';

// Utility function to format time in HH:mm

const currentDate = new Date();

const TimePickerModal = ({
  activeTags,
  isModal,
  onPress,
  afterSelectTime,
  onBackPress,
}) => {
  const [innerDataState, setInnerDateState] = useState({
    startTime: null,
    endTime: null,
  });

  const [modalState, setModalState] = useState(null);

  const { endTime, startTime } = innerDataState;

  const updateState = data => setInnerDateState(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => {
    updateState({ [key]: val });
  };

  return (
    <View style={styles.modalView}>
      <Modal
        isVisible={isModal}
        animationInTiming={100}
        animationOutTiming={100}
        avoidKeyboard
        animationType="fade"
        onBackButtonPress={onBackPress}
        style={styles.bottomModal}
      >
        <View style={styles.modalWrapper}>
          <View style={[styles.modalData, !onPress && styles.extraPadding]}>
            <View style={styles.upperIconView}>
              <Image
                source={boldDivider}
                resizeMode="contain"
                style={styles.divider}
              />
              <Touchable onPress={onBackPress}>
                <Image
                  source={crossWhite}
                  resizeMode="contain"
                  style={styles.cancelIcon}
                />
              </Touchable>
            </View>

            <Image
              source={clockRed}
              resizeMode="contain"
              style={styles.clockIcon}
            />

            <TextComponent
              text={'SET OPERATING HOURS'}
              styles={styles.headingText}
            />
            <TextComponent
              text={
                'For each selected day, input the start and \nend time of operations'
              }
              size={'1.5'}
              styles={styles.subText}
              fade
            />

            <View style={styles.timeRow}>
              <TextComponent
                text={startTime?.time12 || '--:--'}
                styles={styles.timeBox}
                size={'1.8'}
                onPress={() => {
                  setModalState('startTime');
                }}
              />
              <TextComponent text={'to'} />
              <TextComponent
                text={endTime?.time12 || '--:--'}
                styles={styles.timeBox}
                size={'1.8'}
                onPress={() => {
                  setModalState('endTime');
                }}
              />
            </View>

            <ThemeButton
              title={'Continue'}
              btnStyle={styles.modalBtn}
              onPress={() => {
                afterSelectTime(isModal, startTime, endTime);
                onBackPress();
              }}
              isYellowTheme
              textStyle={styles.btnText}
            />
          </View>
        </View>
      </Modal>

      <DatePicker
        mode={'time'}
        open={Boolean(modalState != null)}
        date={currentDate}
        is24hourSource="locale"
        locale="en"
        onCancel={() => setModalState(null)}
        modal
        onConfirm={e => {
          const timeFormatted = formatTimeBothFormats(e); // 'HH:mm'
          onChangeVal(modalState, timeFormatted);
          setModalState(null);
        }}
      />
    </View>
  );
};

export default TimePickerModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalData: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 3,
    shadowRadius: 7.68,
    elevation: 20,
    width: wp('100'),
    paddingHorizontal: wp('5'),
    maxHeight: hp('90'),
    alignSelf: 'center',
    marginBottom: hp('-2.5'),
  },
  extraPadding: {
    paddingBottom: hp('5'),
  },
  upperIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    width: wp('15'),
    height: hp('5'),
    left: wp('37'),
    top: hp('1'),
  },
  cancelIcon: {
    alignSelf: 'flex-end',
    tintColor: 'black',
    width: wp('5'),
    height: hp('2'),
  },
  clockIcon: {
    width: wp('33'),
    height: hp('15'),
    alignSelf: 'center',
  },
  headingText: {
    fontSize: hp('2.5'),
    paddingLeft: wp('5'),
    textAlign: 'center',
    marginVertical: hp('4'),
  },
  subText: {
    textAlign: 'center',
    paddingHorizontal: wp('5'),
  },
  timeRow: {
    flexDirection: 'row',
    marginTop: hp('2'),
    backgroundColor: Colors.bgGray,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5'),
    paddingVertical: hp('2'),
  },
  timeBox: {
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('5'),
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.grayFaded,
    backgroundColor: 'white',
  },
  modalBtn: {
    width: wp('90'),
    alignSelf: 'center',
    marginTop: hp('3'),
    marginBottom: hp('2'),
    height: hp('5'),
  },
  btnText: {
    fontSize: hp('1.5'),
  },
  bottomModal: {
    margin: 0,
  },
});
