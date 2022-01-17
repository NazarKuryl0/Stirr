import { put, call, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../Stores/Config/Constants';
import * as commonActionTypes from '../Stores/Common/Constants';
import { getData } from '../Services';
import { converterToRGBA } from '../Services/Helpers';

function* fetchConfig() {
  yield put({
    type: commonActionTypes.SHOW_LOADER,
  });
  const configURL =
    'https://ott-config.sinclairstoryline.com/configapi/7ad01bd9f43d1f05f4a414c0bf424c81/1.0/Stirr/ios/iOS/1.0.18.0/Chrome88/';
  const configData = yield call(() => getData(configURL));
  if (configData.status !== 200) {
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
    yield put({
      type: actionTypes.FETCH_CONFIG_FAILED,
      error: 'Error in fetching config',
    });
  } else {
    const {
      features,
      city_auto_select: { timer },
      nav_city_auto_select,
      nav,
      channel_info: programsDataURL,
      channel_list: channelsListURL,
      search_URL,
      vmap_generator,
      cust_params_extras,
      theme: {
        button,
        general: { background, logo_color },
      },
    } = configData.data.API;
    const navURL = features.city_auto_select ? nav_city_auto_select : nav;
    const {
      data: { navigation: navData },
    } = yield call(() => getData(navURL));
    const buttonStyles = {
      default: {
        borderRadius: +button.border_size,
        color: converterToRGBA(button.text_color.rgba[0]),
      },
      active: {
        backgroundColor: converterToRGBA(button.color_on.linear_gradient[1].rgba[0]),
      },
      inActive: {
        backgroundColor: converterToRGBA(button.color_off.rgba[0]),
      },
    };
    const appStyles = {
      buttonStyles,
      backgroundURL: background,
      logo: logo_color,
    };
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
    yield put({
      type: actionTypes.FETCH_CONFIG_SUCCEEDED,
      payload: {
        timer,
        navData,
        appStyles,
        channelsListURL,
        programsDataURL,
        search_URL,
        vmap_generator,
        cust_params_extras,
      },
    });
  }
}

function* configWatcher() {
  yield takeLatest(actionTypes.FETCH_CONFIG, fetchConfig);
}

export default configWatcher;
