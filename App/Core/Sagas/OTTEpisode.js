import { put, call, takeLatest, select } from 'redux-saga/effects';

import { getData, getDRMAccesses, getDRMFailPlayback } from '../Services/OTTEpisode';
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
    let drm = {};
    let drmFailUrl = '';
    const store = yield select();
    const {
      common: { station },
    } = store;
    if (
      OTTEpisodeData['media:content']['sinclair:drm'] &&
      OTTEpisodeData['media:content']['sinclair:drm_url']
    ) {
      try {
        drm = yield call(() =>
          getDRMAccesses(OTTEpisodeData['media:content']['sinclair:drm_url'], station, {
            'sinclair:drm': OTTEpisodeData['media:content']['sinclair:drm'],
            guid: OTTEpisodeData['guid']['content'],
          })
        );
      } catch (e) {
        drmFailUrl = yield call(() =>
          getDRMFailPlayback(OTTEpisodeData['media:content']['sinclair:drm_url'], station, {
            'sinclair:drm': OTTEpisodeData['media:content']['sinclair:drm'],
            guid: OTTEpisodeData['guid']['content'],
          })
        );
      }
    }
    const filteredOTTEpisodeData = {
      title: OTTEpisodeData['media:content']['media:title'].content,
      subtitle: OTTEpisodeData['media:content']['media:description'].content,
      imageURL: OTTEpisodeData['media:content']['media:thumbnail'][0].url,
      videoURL: OTTEpisodeData.link,
      duration: OTTEpisodeData['media:content'].duration,
      drm,
      drmFailUrl,
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
