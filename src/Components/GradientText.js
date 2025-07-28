import React from 'react';
import { Text } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../Theme/Variables';

const GradientText = props => {
  return (
    <MaskedView maskElement={<Text {...props} onPress={props.onPress} />}>
      <LinearGradient
        colors={['rgba(255, 212, 74, 1)', 'rgba(231, 182, 0, 1)']}
        start={{ x: 0, y: 1 }}
        end={{ x: props.GradientAlignment, y: 0 }}
      >
        <Text
          {...props}
          onPress={props.onPress}
          style={[props.style, { opacity: 0 }]}
        />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
