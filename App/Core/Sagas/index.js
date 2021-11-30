import { all } from 'redux-saga/effects';
import config from './config';
import OTTPage from './OTTPage';
import ShowPage from './ShowPage';
import CitySelection from './CitySelection';
import OTTText from './OTTText';
import OTTEpisode from './OTTEpisode';
import SectionPage from './SectionPage';

export default function* root() {
  yield all([
    config(),
    OTTPage(),
    ShowPage(),
    CitySelection(),
    SectionPage(),
    OTTText(),
    OTTEpisode(),
  ]);
}
