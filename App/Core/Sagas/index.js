import { all } from 'redux-saga/effects';
import config from './config';
import OTTPage from './OTTPage';

export default function* root() {
  yield all([config(), OTTPage()]);
}
