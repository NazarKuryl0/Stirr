import { all } from 'redux-saga/effects';
import config from './config';
import OTTPage from './OTTPage';
import ShowPage from './ShowPage';

export default function* root() {
  yield all([config(), OTTPage(), ShowPage()]);
}
