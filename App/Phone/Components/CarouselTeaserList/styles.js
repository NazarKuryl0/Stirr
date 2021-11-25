import { StyleSheet } from 'react-native';

import { WIDTH } from '../../../Core/Constants';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: WIDTH,
  },
  descriptionBlock: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    width: 300,
  },
  titleBlock: {
    marginBottom: 10,
  },
  title: {
    fontSize: 23,
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
  },
  dotsContainer: {
    position: 'absolute',
    width: '100%',
    bottom: -10,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FFDA3A',
    marginHorizontal: -10,
  },
  inactiveDot: {
    backgroundColor: '#4A4A4A',
  },
});
