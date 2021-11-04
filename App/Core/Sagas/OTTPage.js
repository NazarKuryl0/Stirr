import { put, call, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../Stores/OTTPage/Constants';
import { getStationAutoSelectionData } from '../Services/OTTPage';

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
    const { background, displayTitle, subTitle, logo, stationText, promoText, button } = page[0];
    const logoURL = logo[0];
    const buttonText = button['media:content']['media:title'].content;
    const station = button['media:content']['sinclair:action_config'].station[0];
    yield put({
      type: actionTypes.FETCH_STATION_AUTO_SELECTION_DATA_SUCCEEDED,
      payload: {
        background,
        displayTitle,
        subTitle,
        logoURL,
        stationText,
        promoText,
        buttonText,
        station,
      },
    });
  }
}

function* OTTPageWatcher() {
  yield takeLatest(actionTypes.FETCH_STATION_AUTO_SELECTION_DATA, fetchStationAutoSelectionData);
}

export default OTTPageWatcher;
