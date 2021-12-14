import { put, select, call, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../Stores/Channels/Constants';
import * as commonActionTypes from '../Stores/Common/Constants';
import { getChannelsData } from '../Services/Channels';

function* fetchChannelsList() {
  yield put({
    type: commonActionTypes.SHOW_LOADER,
  });
  const store = yield select();
  const {
    config: { channelsListURL },
    common: { station },
  } = store;
  if (!channelsListURL) {
    yield put({
      type: actionTypes.FETCH_CHANNELS_DATA_FAILED,
      error: 'Missing URL for fetching channels data',
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  } else {
    const data = yield call(() => getChannelsData(channelsListURL, station));
    if (data.status !== 200) {
      yield put({
        type: actionTypes.FETCH_CHANNELS_DATA_FAILED,
        error: 'Error in fetching channels data',
      });
      yield put({
        type: commonActionTypes.HIDE_LOADER,
      });
    } else {
      const {
        data: { channel, categories },
      } = data;
      yield put({
        type: actionTypes.FETCH_CHANNELS_DATA_SUCCEEDED,
        payload: {
          channel,
          categories,
        },
      });
      yield put({
        type: commonActionTypes.HIDE_LOADER,
      });
    }
  }
}

function* channelsWatcher() {
  yield takeLatest(actionTypes.FETCH_CHANNELS_DATA, fetchChannelsList);
}

export default channelsWatcher;
