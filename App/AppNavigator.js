import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  WelcomePage as WelcomePagePhone,
  OTTPage as OTTPagePhone,
  OTTEpisode as OTTEpisodePhone,
  SectionPage as SectionPagePhone,
  ShowPage as ShowPagePhone,
} from './Phone/Pages';

let routeConfigMap;
if (Platform.isTVOS) {
  routeConfigMap = {};
} else {
  routeConfigMap = {
    MainScreen: WelcomePagePhone,
    OTTPage: OTTPagePhone,
    OTTEpisode: OTTEpisodePhone,
    Section: SectionPagePhone,
    ShowPage: ShowPagePhone,
  };
}

const StackNavigator = createStackNavigator(routeConfigMap, {
  initialRouteName: 'MainScreen',
  headerMode: 'none',
});

export default createAppContainer(StackNavigator);
