import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { boldDivider, crossWhite, editPicBtn } from '../Assets';
import { TextComponent } from './TextComponent';
import ThemeButton from './ThemeButton';
import { useCallback, useRef, useState } from 'react';
import { Touchable } from './Touchable';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { MultiSelectBtn } from './MultiSelectBtn';

const ageRange = Array.from({ length: 23 }, (_, i) => {
  const age = 18 + i;
  return { label: String(age), value: String(age) };
});
const BtnModalComponent = ({
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
    selectedBtn: activeTags,
  });

  // Calculate 13 years ago from today
  const currentDate = new Date();
  const maxSelectableDate = new Date();
  maxSelectableDate.setFullYear(currentDate.getFullYear() - 13);

  const [modalState, setModalState] = useState(false);

  const [firstName, setFirstName] = useState(activeTags?.firstName);

  const [lastName, setLastName] = useState(activeTags?.lastName);

  const [_, forceUpdate] = useState(); // Just to trigger updates

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const { selectedBtn } = innerDataState;

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
        // hideModalContentWhileAnimating
        // useNativeDriver
        onBackButtonPress={onBackPress}
        style={styles.bottomModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              ...styles.modalData,
              paddingBottom: !onPress ? hp('5') : 0,
            }}
          >
            <View style={styles.upperIconView}>
              <Image
                source={boldDivider}
                resizeMode="contain"
                style={styles.divider}
              />
              <Touchable onPress={() => onBackPress()}>
                <Image
                  source={crossWhite}
                  resizeMode="contain"
                  style={styles.cancelIcon}
                />
              </Touchable>
            </View>
            <TextComponent text={activeTitle} styles={styles.headingText} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              // keyboardShouldPersistTaps="always"
              contentContainerStyle={styles.modalScroll}
            >
              <MultiSelectBtn
                items={allData}
                isMultipule
                selectedAlter={selectedBtn}
                // selectedBgColor={Colors.backgroundTheme}
                // textStyle={{ fontSize: hp('1.2'), color: 'black' }}
                // btnStyle={{
                //   height: 'auto',
                //   paddingVertical: hp('0.5'),
                //   paddingHorizontal: wp('2'),
                // }}
                isPrimaryColorStyle
                onSelectVal={(objId, item) => {
                  if (Boolean(selectedBtn?.find(res => res?.id == item?.id))) {
                    onChangeVal(
                      'selectedBtn',
                      selectedBtn?.filter(res => res?.id != item?.id),
                    );
                  } else onChangeVal('selectedBtn', [...selectedBtn, item]);
                }}
              />
            </ScrollView>
            {/* {firstHit && ( */}
            {onPress && (
              <ThemeButton
                title={'Save'}
                btnStyle={styles.modalBtn}
                onPress={() => {
                  onPress(innerDataState.selectedBtn, true);
                  onBackPress();
                }}
                isYellowTheme
                textStyle={{ fontSize: hp('1.5') }}
              />
            )}
            {/* )} */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BtnModalComponent;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalData: {
    // height: tripType ? hp('40') : hp('30'),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 3,
    shadowRadius: 7.68,
    elevation: 20,
    width: wp('100'),
    paddingHorizontal: wp('5'),
    maxHeight: hp('90'),
    height: 'auto',
    alignSelf: 'center',
    marginBottom: hp('-2.5'),

    // height: hp('40'),
  },
  upperIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  divider: { width: wp('15'), height: hp('5'), left: wp('40'), top: hp('1') },
  cancelIcon: {
    alignSelf: 'flex-end',
    tintColor: 'black',
    width: wp('5'),
    height: hp('2'),
  },
  headingText: {
    fontSize: hp('1.5'),
    fontWeight: 'bold',
    // paddingLeft: wp('5'),
    marginBottom: hp('1'),
  },
  addIcon: {
    position: 'absolute',
    right: wp('15'),
    height: hp('6'),
    top: hp('8.8'),
  },
  whiteCircle: {
    // height: hp('22'),
    // width: wp('32'),
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('90'),
    marginTop: hp('10'),
  },
  modalScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: wp('90'),
    // paddingBottom: hp('5'), // Adjust as needed
  },
  inputView: {
    width: wp('90'),
    height: hp('5'),
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    paddingHorizontal: wp('3'),
    marginBottom: hp('5'),
  },
  ageViewModal: {
    width: wp('90'),
    marginBottom: hp('20'),
    marginTop: hp('3'),
  },
  modalBtn: {
    width: wp('90'),
    alignSelf: 'center',
    marginTop: hp('2'),
    marginBottom: hp('5'),
    height: hp('4'),
  },
  textStyle: {
    fontSize: hp('1.5'),
    textAlign: 'center',
    borderRadius: 25,
    borderWidth: 1,
    paddingVertical: hp('2'),
  },
  gender: selectedGender => ({
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: selectedGender ? Colors.black : Colors.textGray,
    borderRadius: 50,
    width: wp('92'),
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1.5'),
    alignItems: 'center',
    marginBottom: hp('3.5'),
    backgroundColor: selectedGender ? Colors.black : 'transparent',
    // height: hp('3'),
  }),
  genderTitle: selectedGender => ({
    fontWeight: '400',
    fontSize: hp('1.5'),
    color: selectedGender ? Colors.white : Colors.textGray,
  }),
  leftIconStyle: {
    width: wp('5'),
    height: hp('2'),
  },
});
