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
    width: 20,
    height: 20,
  },
  defaultBlock: {
    width: 20,
    height: 17,
  },
  logo: {
    width: 100,
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
  },
});
