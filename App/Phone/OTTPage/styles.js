import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    height: '100%',
  },
  logo: {
    width: '100%',
    height: 43,
  },
  buttonBlock: {
    width: 300,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 25,
  },
});
