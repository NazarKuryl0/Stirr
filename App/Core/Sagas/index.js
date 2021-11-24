import { all } from 'redux-saga/effects';
import config from './config';
import OTTPage from './OTTPage';
import ShowPage from './ShowPage';
import CitySelection from './CitySelection';

export default function* root() {
  yield all([config(), OTTPage(), ShowPage(), CitySelection()]);
}
