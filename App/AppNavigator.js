import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  WelcomePagePhone,
  OTTPagePhone,
  OTTEpisodePhone,
  SectionPagePhone,
  ShowPagePhone,
  CitySelectionPhone,
  OTTSettingsPhone,
  OTTTextPhone,
  OTTFeedPhone,
  OTTSearchPhone,
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
    CitySelection: CitySelectionPhone,
    OTTSettings: OTTSettingsPhone,
    OTTText: OTTTextPhone,
    OTTFeed: OTTFeedPhone,
    OTTSearch: OTTSearchPhone,
  };
}

const StackNavigator = createStackNavigator(routeConfigMap, {
  initialRouteName: 'MainScreen',
  headerMode: 'none',
});

export default createAppContainer(StackNavigator);
