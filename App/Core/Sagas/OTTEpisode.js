import { put, call, takeLatest, all } from 'redux-saga/effects';

import { getData } from '../Services/OTTEpisode';
import * as actionTypes from '../Stores/OTTEpisode/Constants';
import * as commonActionTypes from '../Stores/Common/Constants';

function* fetchOTTEpisodePageData(d) {
  yield put({
    type: commonActionTypes.SHOW_LOADER,
  });
  const { url } = d;
  const data = yield call(() => getData(url));
  if (data.status !== 200) {
    yield put({
      type: actionTypes.FETCH_OTTEPISODE_PAGE_DATA_FAILED,
      error: 'Error in fetching OTTEpisode page data',
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  } else {
    const OTTEpisodeData = data.data.rss.channel.item;
    const filteredOTTEpisodeData = {
      title: OTTEpisodeData['media:content']['media:title'].content,
      subtitle: OTTEpisodeData['media:content']['media:description'].content,
      imageURL: OTTEpisodeData['media:content']['media:thumbnail'][0].url,
      videoURL: OTTEpisodeData.link,
    };
    yield put({
      type: actionTypes.FETCH_OTTEPISODE_PAGE_DATA_SUCCESS,
      payload: {
        filteredOTTEpisodeData,
      },
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  }
}

function* OTTEpisodeWatcher() {
  yield takeLatest(actionTypes.FETCH_OTTEPISODE_PAGE_DATA, fetchOTTEpisodePageData);
}

export default OTTEpisodeWatcher;
