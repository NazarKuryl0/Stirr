import { put, call, takeLatest, select } from 'redux-saga/effects';

import { getData, getDRMAccesses, getDRMFailPlayback, getExtraAdParams } from '../Services';
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
    const store = yield select();
    const {
      common: { station },
      config: { cust_params_extras, vmap_generator },
    } = store;

    let drm = {};
    let drmFailUrl = '';
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

    let adUrl = '';
    let midrollBreaks = [];
    if (
      OTTEpisodeData['media:content']['sinclair:ad_preroll'] ||
      OTTEpisodeData['media:content']['sinclair:ad_midroll'] ||
      OTTEpisodeData['media:content']['sinclair:ad_postroll']
    ) {
      const extraAdParams = yield call(() => getExtraAdParams(cust_params_extras, station));

      const adParams = {
        ...extraAdParams,
      };

      let adParamsString = '';
      let standParams = '';

      for (const [key, value] of Object.entries(adParams)) {
        if (key !== 'pmnd' && key !== 'pmxd') {
          adParamsString += `${key}${value ? `=${value}` : ''}&`;
        }
      }
      adUrl += `${vmap_generator}?`;

      OTTEpisodeData['media:content']['sinclair:ad_preroll'] &&
        (adUrl += `preroll=${encodeURIComponent(
          OTTEpisodeData['media:content']['sinclair:ad_preroll']
        )}&`);
      OTTEpisodeData['media:content']['sinclair:ad_midroll'] &&
        (adUrl += `midroll=${encodeURIComponent(
          OTTEpisodeData['media:content']['sinclair:ad_midroll']['content']
        )}&`);
      OTTEpisodeData['media:content']['sinclair:ad_postroll'] &&
        (adUrl += `postroll=${encodeURIComponent(
          OTTEpisodeData['media:content']['sinclair:ad_postroll']
        )}&`);
      if (OTTEpisodeData['media:content']['sinclair:ad_midroll']) {
        adUrl += `breaks=${OTTEpisodeData['media:content']['sinclair:ad_midroll']['breaks']}&`;
        midrollBreaks = OTTEpisodeData['media:content']['sinclair:ad_midroll']['breaks']
          .split(',')
          .map(
            (breakString) => parseInt(breakString, 10) * 1000 // converting to milliseconds
          );
      }

      adUrl += `${standParams}cust_params=${encodeURIComponent(adParamsString)}`;
    } else {
      console.log('Playback without ads');
    }
    const filteredOTTEpisodeData = {
      title: OTTEpisodeData['media:content']['media:title'].content,
      subtitle: OTTEpisodeData['media:content']['media:description'].content,
      imageURL: OTTEpisodeData['media:content']['media:thumbnail'][0].url,
      videoURL: OTTEpisodeData.link,
      duration: OTTEpisodeData['media:content'].duration,
      drm,
      drmFailUrl,
      adUrl,
      midrollBreaks,
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
