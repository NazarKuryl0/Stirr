import { all } from 'redux-saga/effects';
import config from './config';

export default function* root() {
  yield all([
    config(),
  ]);
}
