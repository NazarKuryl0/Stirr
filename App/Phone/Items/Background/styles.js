import { StyleSheet } from 'react-native';
import { HEIGHT } from '../../../Core/Constants';

export const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
    minHeight: HEIGHT,
  },
});
