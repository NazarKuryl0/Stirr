import { StyleSheet } from 'react-native';

import { WIDTH } from '../../../Core/Constants';

export const styles = StyleSheet.create({
  videoPlayerBlock: {
    width: WIDTH,
    height: (WIDTH * 9) / 16,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBlock: {
    width: '100%',
    height: '100%',
  },
  progressbarBlock: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 10,
    backgroundColor: '#ffffff',
  },
  passedTimeBlock: {
    backgroundColor: '#FFDA3A',
    height: '100%',
  },
});
