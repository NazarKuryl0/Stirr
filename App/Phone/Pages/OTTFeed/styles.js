import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: '100%',
  },
  selectedProgramBlock: {
    width: '100%',
    height: 83,
    backgroundColor: '#0E1F2F',
    flexDirection: 'row',
  },
  selectedProgramChannelBlock: {
    width: 83,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedProgramDescriptionBlock: {
    paddingVertical: 9,
    justifyContent: 'center',
  },
  selectedProgramDescriptionBlockFirstLine: {
    flexDirection: 'row',
  },
  liveBlock: {
    backgroundColor: '#FFDE22',
    height: 20,
    paddingHorizontal: 3,
    marginRight: 8,
  },
  live: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  nowPlaying: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#FFDE22',
  },
  selectedProgramTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#ffffff',
  },
  categoriesBlock: {
    height: 85,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingLeft: 24,
  },
  categoryBlock: {
    backgroundColor: '#DDDDDD30',
    paddingHorizontal: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DDDDDD30',
    height: 30,
    marginRight: 24,
    justifyContent: 'center',
  },
  activeCategoryBlock: {
    backgroundColor: undefined,
    borderColor: '#FFDA3A',
  },
  category: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'Montserrat-Semibold',
  },
  activeCategory: {
    color: '#FFDA3A',
  },
  timesBlock: {
    flexDirection: 'row',
  },
  timeBlock: {
    height: 57,
    width: 83,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
  channelsWithProgramsBlock: {
    flexDirection: 'row',
  },
  channelBlock: {
    height: 95,
    width: 83,
    backgroundColor: '#202020',
    borderBottomColor: '#000000',
    borderBottomWidth: 2,
    paddingVertical: 20,
    alignItems: 'center',
  },
  timelineBlock: {
    height: 57,
    width: 275,
    justifyContent: 'center',
  },
  timelineText: {
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  channel: {
    fontSize: 18,
    color: '#B5B6B8',
    fontFamily: 'Montserrat-Medium',
  },
  channelIcon: {
    width: 50,
    height: 30,
  },
  programsBlock: {
    flexDirection: 'column',
  },
  programsRowBlock: {
    height: 95,
    flexDirection: 'row',
  },
  programBlock: (duration) => {
    return {
      backgroundColor: 'grey',
      borderBottomColor: '#000000',
      borderBottomWidth: 2,
      justifyContent: 'center',
      borderRightColor: '#000000',
      borderRightWidth: 2,
      paddingHorizontal: 12,
      width: duration,
    };
  },
  program: {
    fontSize: 15,
    color: '#ffffff',
    fontFamily: 'Montserrat-Medium',
  },
});
