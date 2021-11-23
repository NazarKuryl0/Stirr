import React from 'react';
import FastImage from 'react-native-fast-image';

import { styles } from './styles';

export default Background = (props) => {
  return <FastImage source={{uri: props.url}} style={styles.background} />;
};
