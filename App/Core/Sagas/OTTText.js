import { put, call, takeLatest } from 'redux-saga/effects';
import { getData } from '../Services';

import * as actionTypes from '../Stores/OTTText/Constants';
import * as commonActionTypes from '../Stores/Common/Constants';

function* fetchOTTTextPageData(d) {
  yield put({
    type: commonActionTypes.SHOW_LOADER,
  });
  const { url } = d;
  const data = yield call(() => getData(url));
  if (data.status !== 200) {
    yield put({
      type: actionTypes.FETCH_OTTTEXT_PAGE_DATA_FAILED,
      error: 'Error in fetching OTTText page data',
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  } else {
    yield put({
      type: actionTypes.FETCH_OTTTEXT_PAGE_DATA_SUCCESS,
      payload: {
        data: data.data,
      },
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  }
}

function* OTTTextPageWatcher() {
  yield takeLatest(actionTypes.FETCH_OTTTEXT_PAGE_DATA, fetchOTTTextPageData);
}

export default OTTTextPageWatcher;
