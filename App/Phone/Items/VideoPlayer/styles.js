import { StyleSheet } from 'react-native';

import { WIDTH, HEIGHT } from '../../../Core/Constants';

export const styles = StyleSheet.create({
  videoPlayerBlockInPortraitAndFullscreen: {
    width: '100%',
    height: HEIGHT,
    marginTop: -70,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  videoPlayerBlockInPortrait: {
    width: '100%',
    height: (WIDTH * 9) / 16,
    backgroundColor: 'black',
  },
  videoPlayerBlock: {
    width: '100%',
    height: WIDTH,
    backgroundColor: 'black',
    marginTop: -70,
  },
  videoBlock: {
    width: '100%',
    height: '100%',
  },
  controlsBlock: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsBlockInPortrait: {
    height: (WIDTH * 9) / 16,
  },
  additionalControlsBlock: {
    position: 'absolute',
    right: 40,
  },
  progressbarBlock: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 10,
    backgroundColor: '#ffffff',
  },
  progressbarBlockInLandscape: {
    bottom: 20,
  },
  passedTimeBlock: {
    backgroundColor: '#FFDA3A',
    height: '100%',
  },
});
