import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomePagePhone from './Phone/Pages/WelcomePage';
import OTTPagePhone from './Phone/Pages/OTTPage';

let routeConfigMap;
if (Platform.isTVOS) {
  routeConfigMap = {};
} else {
  routeConfigMap = {
    MainScreen: WelcomePagePhone,
    OTTPage: OTTPagePhone,
  };
}

const StackNavigator = createStackNavigator(routeConfigMap, {
  initialRouteName: 'MainScreen',
  headerMode: 'none',
});

export default createAppContainer(StackNavigator);
