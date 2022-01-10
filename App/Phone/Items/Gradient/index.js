import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

import { styles } from './styles';

const Gradient = function (props) {
  const { width: w, height: h, startColor, endColor } = props;
  return (
    <View style={styles.root(w, h)}>
      <Svg height={h} width={w}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={startColor} stopOpacity="1" />
            <Stop offset="1" stopColor={endColor} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width={w} height={h} fill="url(#grad)" />
      </Svg>
    </View>
  );
};

export default Gradient;
