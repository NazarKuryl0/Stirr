import { StyleSheet } from 'react-native';

import { WIDTH } from '../../../Core/Constants';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerBlock: {
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputRow: {
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 10,
    marginRight: 20,
  },
  clearIconBlock: {
    height: 16,
    width: 16,
  },
  input: {
    //40 - headerBlock.paddingHorizontal, 12 - inputRow.padding, 20 - search icon width, 15 - cancel icon, 20 - inputRow.marginRight, 60 - Cancel text
    width: WIDTH - 40 - 12 - 20 - 15 - 20 - 60,
    height: '100%',
    color: '#ffffff',
    paddingHorizontal: 6,
    fontFamily: 'Montserrat-Medium',
    borderRadius: 6,
    marginRight: 10,
  },
  cancel: {
    fontFamily: 'Montserrat-Regular',
    color: '#ffffff',
    fontSize: 14,
  },
});
