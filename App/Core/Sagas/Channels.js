import { put, select, call, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from '../Stores/Channels/Constants';
import * as commonActionTypes from '../Stores/Common/Constants';
import { getDataWithStation, getDRMAccesses, getDRMFailPlayback } from '../Services';

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
    const selectedProgram = {
      program: filteredProgramData,
      channel: item.program,
      programDuration: item.duration,
      drm,
      drmFailUrl,
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
