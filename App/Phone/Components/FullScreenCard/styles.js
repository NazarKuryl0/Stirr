import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    minHeight: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  mainBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    height: '100%',
    paddingHorizontal: 44,
  },
  title: {
    fontSize: 25,
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#FFDA3A',
  },
  logo: {
    width: '100%',
    height: 43,
    marginVertical: 65,
  },
  station: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonBlock: {
    width: 300,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 26,
  },
  timeBlock: {
    height: 20,
  },
  time: {
    fontSize: 18,
    color: '#FFDA3A',
  },
  promoTextBlock: {
    position: 'absolute',
    bottom: 20,
  },
  promoText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
});
