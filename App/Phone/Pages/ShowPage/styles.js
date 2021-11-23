import { StyleSheet } from 'react-native';

import { WIDTH } from '../../../Core/Constants';

export const styles = StyleSheet.create({
  showDataBlock: {
    width: '100%',
    height: WIDTH,
  },
  showDataImageBlock: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  showDataDescriptionBlock: {
    position: 'absolute',
    left: 20,
    bottom: 50,
    width: 300,
  },
  showTitleBlock: {
    marginBottom: 10,
  },
  showTitle: {
    fontSize: 23,
    color: '#ffffff',
  },
  showSubtitle: {
    fontSize: 14,
    color: '#ffffff',
  },
  mainBlock: {
    paddingLeft: 20,
  },
  seasonsTitlesBlock: {
    marginRight: 20,
  },
  activeSeasonTitleBlock: {
    borderBottomColor: '#FFDA3A',
    borderBottomWidth: 2,
  },
  seasonContentBlock: {
    marginRight: 20,
  },
  seasonTitle: {
    color: '#ffffff',
    fontSize: 18,
  },
  espideBlock: {
    width: '100%',
    marginTop: 14,
  },
  espideImageBlock: {
    width: '100%',
    height: 220,
    backgroundColor: 'black',
    marginBottom: 16,
  },
  episodeTitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  background: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
});
