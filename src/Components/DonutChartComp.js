import React from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Circle } from 'react-native-svg';
import { hp, wp } from '../Hooks/useResponsive';
import { TextComponent } from './TextComponent';
import LegendItem from './DotWithText';

const DonutChartComp = () => {
  const data = [
    { key: 1, value: 50, svg: { fill: '#00CFFF' } },
    { key: 2, value: 30, svg: { fill: '#4A4A64' } },
    { key: 3, value: 20, svg: { fill: '#A100FF' } },
    { key: 4, value: 10, svg: { fill: '#FF0000' } },
    { key: 5, value: 10, svg: { fill: '#6E57E0' } },
    { key: 6, value: 5, svg: { fill: '#6DEFA3' } },
    { key: 7, value: 5, svg: { fill: '#FF8F72' } },
  ];

  return (
    <View
      style={{
        // height: hp('30'),
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PieChart
        style={{ height: hp('20'), width: wp('50') }}
        data={data}
        outerRadius={'100%'}
        innerRadius={'70%'} // This creates the donut shape
      >
        {/* Optional: add center white circle manually if needed */}
        {/* <G>
          <Circle cx="50%" cy="50%" r="35%" fill="white" />
        </G> */}
      </PieChart>

      <TextComponent
        text={'Expenses categories'}
        styles={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginVertical: hp('1'),
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          width: wp('80'),
        }}
      >
        <LegendItem text={'Traveling'} />
        <LegendItem text={'Grocery'} dotColor={'#00CFFF'} />
        <LegendItem text={'Rent'} dotColor={'#A100FF'} />
        <LegendItem text={'Entertainment'} dotColor={'#FF0000'} />
        <LegendItem text={'Clothing'} dotColor={'#6DEFA3'} />
        <LegendItem text={'Others'} dotColor={'#6E57E0'} />
      </View>
    </View>
  );
};

export default DonutChartComp;
