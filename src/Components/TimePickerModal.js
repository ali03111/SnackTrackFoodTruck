import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { boldDivider, clockRed, crossWhite, editPicBtn } from '../Assets';
import { TextComponent } from '../Components/TextComponent';
import ThemeButton from '../Components/ThemeButton';
import { useCallback, useRef, useState } from 'react';
import { Touchable } from '../Components/Touchable';
import { Colors } from '../Theme/Variables';
import { hp, wp } from '../Hooks/useResponsive';
import DatePicker from 'react-native-date-picker';

const ageRange = Array.from({ length: 23 }, (_, i) => {
  const age = 18 + i;
  return { label: String(age), value: String(age) };
});
const currentDate = new Date();
const TimePickerModal = ({
  activeTags,
  isModal,
  onPress,
  heading,
  onSelect,
  onBackPress,
  activeTitle,
  allData,
}) => {
  const [innerDataState, setInnerDateState] = useState({
    profileImg: activeTags?.profileImg,
    userAge: activeTags?.age,
    userGender: activeTags?.userGender,
    eventType: activeTags?.eventTypes,
    associations: activeTags?.eventAssociations,
  });

  const [modalState, setModalState] = useState(false);

  const [firstName, setFirstName] = useState(activeTags?.firstName);

  const [lastName, setLastName] = useState(activeTags?.lastName);

  const [_, forceUpdate] = useState(); // Just to trigger updates

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const { associations, eventType, profileImg, userAge, userGender } =
    innerDataState;

  const updateState = data => setInnerDateState(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => {
    updateState({ [key]: val });
  };

  const [firstHit, setFirstHit] = useState(false);

  return (
    <View style={styles.modalView}>
      <Modal
        isVisible={isModal}
        animationInTiming={100}
        animationOutTiming={100}
        avoidKeyboard
        animationType="fade"
        onBackButtonPress={
          firstHit && activeTags.length == 0 ? onPress : onBackPress
        }
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
              <Touchable
                onPress={() => (onPress ? onPress({}, false) : onBackPress())}
              >
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
                text={'09:00 AM'}
                styles={styles.timeBox}
                size={'1.8'}
                onPress={() => {
                  setModalState(true);
                }}
              />
              <TextComponent text={'to'} />
              <TextComponent
                text={'09:00 AM'}
                styles={styles.timeBox}
                size={'1.8'}
              />
            </View>

            <ThemeButton
              title={'Continue'}
              btnStyle={styles.modalBtn}
              onPress={() => {
                onPress({ ...innerDataState, firstName, lastName }, true);
              }}
              isYellowTheme
              textStyle={styles.btnText}
            />
          </View>
        </View>
      </Modal>
      <DatePicker
        mode={'time'}
        // mode={datePicker.modalType}
        open={modalState}
        date={currentDate}
        // date={value ?? currentDate}
        is24hourSource="locale"
        locale="en"
        // onCancel={() => toggleDate(null)}
        modal
        onConfirm={e => {
          console.log(
            'lksdbvlksbdlkvbsdlkbvlsdblvkbsdlvbsdkvsd',
            e,
            new Date(e.getTime() + 24 * 60 * 60 * 1000),
            e.toDateString(),
          );
          // if (datePicker.stateName == 'perfEventList') {
          //   datePicker.onChange();
          //   onSelectValueInList(
          //     datePicker?.index,
          //     datePicker.modalType ?? 'date',
          //     e,
          //   );
          //   toggleDate(null);
          // } else {
          // onChange(e);
          // // onChange(new Date(e.getTime() + 24 * 60 * 60 * 1000));
          // // datePicker.onChange(e);
          // // onSelectValue(datePicker.stateName, e);
          // toggleDate(null);
          // }
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
