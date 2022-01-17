import { put, select, call, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from '../Stores/Channels/Constants';
import * as commonActionTypes from '../Stores/Common/Constants';
import {
  getDataWithStation,
  getDRMAccesses,
  getDRMFailPlayback,
  getExtraAdParams,
} from '../Services';

function* fetchChannelsList() {
  yield put({
    type: commonActionTypes.SHOW_LOADER,
  });
  const store = yield select();
  const {
    config: { channelsListURL, programsDataURL },
    common: { station },
    Channels: { selectedProgram },
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
    const data = yield call(() => getDataWithStation(channelsListURL, station));
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
      const channelsDataWithPrograms = yield all(
        channel.map((item) => {
          return call(() =>
            getDataWithStation(`${programsDataURL}${item['display-name']}`, station)
          );
        })
      );
      const filteredChannelsDataWithPrograms = channelsDataWithPrograms.map((item) => {
        return item.data;
      });
      yield put({
        type: actionTypes.FETCH_CHANNELS_DATA_SUCCEEDED,
        payload: {
          filteredChannelsDataWithPrograms,
          categories,
        },
      });
      if (!selectedProgram) {
        const program = filteredChannelsDataWithPrograms[0].channel[0];
        const duration =
          filteredChannelsDataWithPrograms[0].programme[0].stop / 100 -
          filteredChannelsDataWithPrograms[0].programme[0].start / 100;
        yield put({
          type: actionTypes.SET_SELECTED_PROGRAM,
          program,
          duration,
        });
      }
      yield put({
        type: commonActionTypes.HIDE_LOADER,
      });
    }
  }
}

function* setSelectedProgram(item) {
  yield put({
    type: commonActionTypes.SHOW_LOADER,
  });
  const store = yield select();
  const {
    config: { navData },
    common: { station },
  } = store;
  const programName = item.program['display-name'];
  const urlForFetchingProgramData = navData.filter((d) => d.type === 'OTTFeed')[0].path;
  const replacedUrlForFetchingProgramData = urlForFetchingProgramData.replace(
    /(\/api\/rest\/v3\/status\/[?=a-zA-Z-0-9]+)/,
    `/api/rest/v3/status/${programName}`
  );
  const programData = yield call(() =>
    getDataWithStation(replacedUrlForFetchingProgramData, station)
  );
  if (programData.status !== 200) {
    yield put({
      type: actionTypes.SET_SELECTED_PROGRAM_FAILED,
      error: 'Error in setting program data',
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  } else {
    let drm = {};
    let drmFailUrl = '';
    const store = yield select();
    const {
      common: { station },
      config: { cust_params_extras, vmap_generator },
    } = store;
    const filteredProgramData = programData.data.rss.channel;
    if (
      filteredProgramData.item['media:content']['sinclair:drm'] &&
      filteredProgramData.item['media:content']['sinclair:drm_url']
    ) {
      try {
        drm = yield call(() =>
          getDRMAccesses(filteredProgramData.item['media:content']['sinclair:drm_url'], station, {
            'sinclair:drm': filteredProgramData.item['media:content']['sinclair:drm'],
            guid: filteredProgramData.item['guid']['content'],
          })
        );
      } catch (e) {
        drmFailUrl = yield call(() =>
          getDRMFailPlayback(
            filteredProgramData.item['media:content']['sinclair:drm_url'],
            station,
            {
              'sinclair:drm': filteredProgramData.item['media:content']['sinclair:drm'],
              guid: filteredProgramData.item['guid']['content'],
            }
          )
        );
      }
    }

    let adUrl = '';
    if (
      filteredProgramData.item['media:content']['sinclair:ad_preroll'] ||
      filteredProgramData.item['media:content']['sinclair:ad_midroll'] ||
      filteredProgramData.item['media:content']['sinclair:ad_postroll']
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

      filteredProgramData.item['media:content']['sinclair:ad_preroll'] &&
        (adUrl += `preroll=${encodeURIComponent(
          filteredProgramData.item['media:content']['sinclair:ad_preroll']
        )}&`);
      filteredProgramData.item['media:content']['sinclair:ad_midroll'] &&
        (adUrl += `midroll=${encodeURIComponent(
          filteredProgramData.item['media:content']['sinclair:ad_midroll']['content']
        )}&`);
      filteredProgramData.item['media:content']['sinclair:ad_postroll'] &&
        (adUrl += `postroll=${encodeURIComponent(
          filteredProgramData.item['media:content']['sinclair:ad_postroll']
        )}&`);
      if (filteredProgramData.item['media:content']['sinclair:ad_midroll']) {
        adUrl += `breaks=${filteredProgramData.item['media:content']['sinclair:ad_midroll']['breaks']}&`;
      }

      adUrl += `${standParams}cust_params=${encodeURIComponent(adParamsString)}`;
    } else {
      console.log('Playback without ads');
    }
    const selectedProgram = {
      program: filteredProgramData,
      channel: item.program,
      programDuration: item.duration,
      drm,
      drmFailUrl,
      adUrl,
    };
    yield put({
      type: actionTypes.SET_SELECTED_PROGRAM_SUCCEEDED,
      payload: {
        selectedProgram,
      },
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  }
}

function* channelsWatcher() {
  yield takeLatest(actionTypes.FETCH_CHANNELS_DATA, fetchChannelsList);
  yield takeLatest(actionTypes.SET_SELECTED_PROGRAM, setSelectedProgram);
}

export default channelsWatcher;
