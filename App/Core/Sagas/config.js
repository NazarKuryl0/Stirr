import { put, call, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../Stores/Config/Constants';
import { getConfigData } from '../Services/ConfigServices';

function* fetchConfig() {
  const configData = yield call(getConfigData);
  if (configData.status !== 200) {
    yield put({
      type: actionTypes.FETCH_CONFIG_FAILED,
      error: 'Error in fetching config'
    });
  } else {
    const {channel_list} = configData.data.API;
    yield put({
      type: actionTypes.FETCH_CONFIG_SUCCEEDED,
      payload: {
        channel_list
      },
    });
  }
}

function* configWatcher() {
  yield takeLatest(actionTypes.FETCH_CONFIG, fetchConfig);
}

export default configWatcher;
