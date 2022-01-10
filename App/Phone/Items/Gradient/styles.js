import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: (w, h) => {
    return {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      left: 0,
      width: w,
      height: h,
    };
  },
});
