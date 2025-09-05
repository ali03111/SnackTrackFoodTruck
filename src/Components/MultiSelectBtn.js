import { useState } from 'react';
import ThemeButton from './ThemeButton';
import { StyleSheet } from 'react-native';
import { Colors } from '../Theme/Variables';
import { hp, wp } from '../Hooks/useResponsive';
import ThemeButtonWithIcon from './ThemeButtonWithIcon';

export const MultiSelectBtn = ({
  items,
  isDisable,
  selectedAlter,
  onSelectVal,
  objId,
  isMultipule,
  btnStyle,
  textStyle,
  mainViewStyle,
  selectedBgColor,
}) => {
  const [dummy, setDummy] = useState(0);

  const handlePress = allergy => {};

  return items?.map((item, index) => (
    <ThemeButtonWithIcon
      key={index}
      onPress={() => {
        onSelectVal(objId, item);
        // setDummy(pre => pre + 1);
      }}
      title={item?.name ?? item?.title ?? item}
      style={{
        ...styles.btnMain(
          isMultipule
            ? Boolean(selectedAlter?.find(res => res?.id == item.id))
            : Boolean(
                (selectedAlter?.alternates?.id ?? selectedAlter?.id) ==
                  item?.id,
              ),
          selectedBgColor,
        ),
        ...btnStyle,
      }}
      textStyle={{
        ...styles.btnText(
          isMultipule
            ? Boolean(selectedAlter?.find(res => res?.id == item.id))
            : Boolean(
                (selectedAlter?.alternates?.id ?? selectedAlter?.id) ==
                  item?.id,
              ),
        ),
        ...textStyle,
      }}
      isDisable={isDisable}
    />
  ));
};
export const styles = StyleSheet.create({
  btnMain: (isSelected, selectedBgColor) => ({
    borderRadius: 30,
    borderWidth: 1,
    borderColor: selectedBgColor ? Colors.lightBlackColor : Colors.textGray,
    height: hp('4'),
    width: 'auto',
    paddingHorizontal: wp('4.7'),
    marginRight: wp('2'),
    marginBottom: hp('1'),
    backgroundColor: isSelected
      ? selectedBgColor ?? Colors.lightBlackColor
      : 'rgba(248, 248, 248, 1)',
  }),
  btnText: isSelected => ({
    color: isSelected ? 'white' : Colors.textGray,
    fontSize: hp('1.5'),
  }),
});
