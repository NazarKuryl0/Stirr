import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
});
