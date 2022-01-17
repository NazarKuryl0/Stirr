import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 75,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  burger: {
    flex: 1,
  },
  stationBlock: {
    flex: 1,
    alignItems: 'flex-end',
  },
  station: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'Montserrat-Medium',
  },
  searchBlock: {
    flex: 1,
    alignItems: 'flex-end',
  },
  defaultBlock: {
    width: 20,
    height: 17,
  },
  logo: {
    flex: 1,
    height: 37,
  },
  modalBlock: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  close: {
    position: 'absolute',
    top: 43,
    left: 20,
    zIndex: 2,
  },
  modalMainBlock: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBlock: {
    marginBottom: 24,
  },
  activeNavBlock: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFDA3A',
  },
  titleBlock: {
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
  },
});
