import { all } from 'redux-saga/effects';
import config from './config';
import Channels from './Channels';
import OTTPage from './OTTPage';
import ShowPage from './ShowPage';
import CitySelection from './CitySelection';
import OTTText from './OTTText';
import OTTEpisode from './OTTEpisode';
import OTTSearch from './OTTSearch';
import SectionPage from './SectionPage';

export default function* root() {
  yield all([
    config(),
    Channels(),
    OTTPage(),
    ShowPage(),
    CitySelection(),
    SectionPage(),
    OTTText(),
    OTTEpisode(),
    OTTSearch(),
  ]);
}
