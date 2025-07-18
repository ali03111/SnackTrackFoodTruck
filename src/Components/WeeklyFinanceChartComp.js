import React from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const WeeklyFinanceChartComp = () => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [3000, 4500, 2800, 5200], // Example expense data
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Red for expenses
      },
      {
        data: [5000, 6000, 5500, 7000], // Example income data
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, // Green for income
      },
    ],
    legend: ['Expenses', 'Income'],
  };

  return (
    <View>
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: 10,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        verticalLabelRotation={0}
        fromZero
        showBarTops={false}
      />
    </View>
  );
};

export default WeeklyFinanceChartComp;
