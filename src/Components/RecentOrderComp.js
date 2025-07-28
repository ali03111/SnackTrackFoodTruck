import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { TextComponent } from './TextComponent';
import ThemeButtonWithIcon from './ThemeButtonWithIcon';
import { arrRight } from '../Assets';
import { Colors } from '../Theme/Variables';
import GradientText from './GradientText';

const RecentOrderComp = ({
  orderId,
  time,
  items = [],
  onCancel,
  onCook,
  mainViewStyles,
  orderStatus,
}) => {
  const renderButtons = () => (
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
        <TextComponent text="Cancel" size="1.7" styles={styles.cancelText} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cookBtn} onPress={onCook}>
        <TextComponent text="Cook" size="1.7" styles={styles.cookText} />
      </TouchableOpacity>
    </View>
  );
  const statusButtons = () => (
    <View style={{ ...styles.buttonRow, justifyContent: 'center' }}>
      <ThemeButtonWithIcon
        title={'Order status'}
        image={arrRight}
        style={{ backgroundColor: 'transparent' }}
        textStyle={{ color: Colors.secondryColor }}
        imageStyle={{ tintColor: Colors.secondryColor }}
      />
    </View>
  );

  const statusCheck = {
    New: renderButtons,
    orderpending: renderButtons,
    'In process': statusButtons,
    Cancelled: () => {},
  };

  const renderItems = () => {
    const visibleItems = items.slice(0, 3);
    const remainingCount = items.length - visibleItems.length;

    return (
      <>
        {(orderStatus == 'Cancelled' ? items : visibleItems).map(
          (item, index) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <GradientText style={styles.heading} GradientAlignment={0.7}>
                {`${item.quantity}x `}
              </GradientText>
              <TextComponent
                key={index}
                text={`${item.name}`}
                size="1.7"
                styles={styles.itemText}
              />
            </View>
          ),
        )}
        {orderStatus != 'Cancelled' && remainingCount > 0 && (
          <TextComponent
            text={`+${remainingCount} more…`}
            size="1.5"
            styles={styles.moreText}
          />
        )}
      </>
    );
  };

  return (
    <View style={[styles.container, mainViewStyles]}>
      <View style={styles.header}>
        <TextComponent text={orderId} size="1.4" fade />
        <TextComponent text={time} size="1.4" fade />
      </View>

      <View style={styles.itemContainer}>{renderItems()}</View>

      {statusCheck[orderStatus]?.() ?? null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('85'),
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: wp('4'),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: hp('1'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1'),
  },
  itemContainer: {
    marginBottom: hp('2'),
  },
  itemText: {
    fontWeight: '500',
    marginVertical: hp('0.3'),
  },
  moreText: {
    fontStyle: 'italic',
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    backgroundColor: '#ffe6e6',
    paddingVertical: hp('1'),
    paddingHorizontal: wp('6'),
    borderRadius: 10,
    width: wp('40'),
    alignItems: 'center',
  },
  cookBtn: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: hp('1'),
    paddingHorizontal: wp('8'),
    borderRadius: 10,
    width: wp('40'),
    alignItems: 'center',
  },
  cancelText: {
    color: '#000',
    fontWeight: '600',
  },
  cookText: {
    color: '#000',
    fontWeight: '600',
  },
});

export default RecentOrderComp;
