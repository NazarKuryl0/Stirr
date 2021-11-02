import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreenPhone from './Phone/SplashScreen';

let routeConfigMap;
if (Platform.isTVOS) {
  routeConfigMap = {
  };
} else {
  routeConfigMap = {
    MainScreen: SplashScreenPhone,
  };
}

const StackNavigator = createStackNavigator(routeConfigMap, {
  initialRouteName: 'MainScreen',
  headerMode: 'none',
});

export default createAppContainer(StackNavigator);
