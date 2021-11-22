import { put, call, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from '../Stores/OTTPage/Constants';
import { SET_STATION } from '../Stores/Common/Constants';
import {
  getStationAutoSelectionData,
  getOTTPageData,
  getOTTPageComponentData,
} from '../Services/OTTPage';

function* fetchStationAutoSelectionData(d) {
  const { url } = d;
  const data = yield call(() => getStationAutoSelectionData(url));
  if (data.status !== 200) {
    yield put({
      type: actionTypes.FETCH_STATION_AUTO_SELECTION_DATA_FAILED,
      error: 'Error in fetching station auto selection data',
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
  }
}

function* fetchOTTPageData(d) {
  const { url, station } = d;
  const data = yield call(() => getOTTPageData(url, station));
  if (data.status !== 200) {
    yield put({
      type: actionTypes.FETCH_OTTPAGE_DATA_FAILED,
      error: 'Error in fetching OTTPage data',
    });
  } else {
    const {
      data: { page },
    } = data;
    const componentData = yield all(
      page.map((item) => {
        return call(() => getOTTPageComponentData(item.content, station));
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
  }
}
function* OTTPageWatcher() {
  yield takeLatest(actionTypes.FETCH_STATION_AUTO_SELECTION_DATA, fetchStationAutoSelectionData);
  yield takeLatest(actionTypes.FETCH_OTTPAGE_DATA, fetchOTTPageData);
}

export default OTTPageWatcher;
