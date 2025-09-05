import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LegendItem = ({ text, dotColor }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dot(dotColor)} />
      <Text style={styles.label}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: dotColor => ({
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: dotColor ?? '#FF8F72', // peach color
    marginRight: 6,
  }),
  label: {
    fontSize: 16,
    color: '#7D8A99', // grayish text color
    fontWeight: '500',
  },
});

export default LegendItem;
