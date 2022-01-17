import { StyleSheet } from 'react-native';

import { WIDTH } from '../../../Core/Constants';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mainBlock: {
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  searchLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: WIDTH - 40 - 20 - 10, //40 is from mainBlock.paddingHorizontal, 20 from search icon size, 10 from innput marginRight
    height: 30,
    color: '#ffffff',
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-Medium',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    marginRight: 10,
  },
});
