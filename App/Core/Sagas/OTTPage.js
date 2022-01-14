import { put, call, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from '../Stores/OTTPage/Constants';
import * as commonActionTypes from '../Stores/Common/Constants';
import { SET_STATION } from '../Stores/Common/Constants';
import { getData, getDataWithStation } from '../Services';

function* fetchStationAutoSelectionData(d) {
  yield put({
    type: commonActionTypes.SHOW_LOADER,
  });
  const { url } = d;
  const data = yield call(() => getData(url));
  if (data.status !== 200) {
    yield put({
      type: actionTypes.FETCH_STATION_AUTO_SELECTION_DATA_FAILED,
      error: 'Error in fetching station auto selection data',
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  } else {
    const {
      data: { page },
    } = data;
    const { button } = page[0];
    const station = button['media:content']['sinclair:action_config'].station[0];
    yield put({
      type: SET_STATION,
      payload: {
        station,
      },
    });
    yield put({
      type: actionTypes.FETCH_STATION_AUTO_SELECTION_DATA_SUCCEEDED,
      payload: {
        page,
      },
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  }
}

function* fetchOTTPageData(d) {
  yield put({
    type: commonActionTypes.SHOW_LOADER,
  });
  const { url, station } = d;
  const data = yield call(() => getDataWithStation(url, station));
  if (data.status !== 200) {
    yield put({
      type: actionTypes.FETCH_OTTPAGE_DATA_FAILED,
      error: 'Error in fetching OTTPage data',
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  } else {
    const {
      data: { page },
    } = data;
    const componentData = yield all(
      page.map((item) => {
        return call(() => getDataWithStation(item.content, station));
      })
    );
    let filteredComponentData = [];
    componentData.forEach((component) => {
      filteredComponentData.push(component.data.rss.channel.pagecomponent.component);
    });
    yield put({
      type: actionTypes.FETCH_OTTPAGE_DATA_SUCCESS,
      payload: {
        page,
        filteredComponentData,
      },
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  }
}
function* OTTPageWatcher() {
  yield takeLatest(actionTypes.FETCH_STATION_AUTO_SELECTION_DATA, fetchStationAutoSelectionData);
  yield takeLatest(actionTypes.FETCH_OTTPAGE_DATA, fetchOTTPageData);
}

export default OTTPageWatcher;
