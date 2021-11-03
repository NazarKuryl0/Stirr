import { put, call, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../Stores/Config/Constants';
import { getData } from '../Services/ConfigServices';

function* fetchConfig() {
  const configURL = 'https://ott-config.sinclairstoryline.com/configapi/7ad01bd9f43d1f05f4a414c0bf424c81/1.0/Stirr/ios/iOS/1.0.18.0/Chrome88/'
  const configData = yield call(() => getData(configURL));
  if (configData.status !== 200) {
    yield put({
      type: actionTypes.FETCH_CONFIG_FAILED,
      error: 'Error in fetching config'
    });
  } else {
    const { features, city_auto_select: { timer }, nav_city_auto_select, nav } = configData.data.API;
    const navURL = features.city_auto_select ? nav_city_auto_select : nav;
    const { data: { navigation: navData } } = yield call(() => getData(navURL));
    yield put({
      type: actionTypes.FETCH_CONFIG_SUCCEEDED,
      payload: {
        timer,
        navData
      },
    });
  }
}

function* configWatcher() {
  yield takeLatest(actionTypes.FETCH_CONFIG, fetchConfig);
}

export default configWatcher;
