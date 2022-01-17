import { put, call, takeLatest, select, all } from 'redux-saga/effects';

import { getSuggestions, getData } from '../Services';
import * as actionTypes from '../Stores/OTTSearch/Constants';
import * as commonActionTypes from '../Stores/Common/Constants';

function* getSuggestionsList(d) {
  yield put({
    type: commonActionTypes.SHOW_LOADER,
  });
  const { value } = d;
  const store = yield select();
  const {
    config: { search_URL },
  } = store;
  const data = yield call(() => getSuggestions(search_URL, value));
  if (data.status !== 200) {
    yield put({
      type: actionTypes.GET_SUGGESTIONS_LIST_FAILED,
      error: 'Error in getting suggestions list data',
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  } else {
    const suggestionsList = data.data.suggestions;
    const suggestionsListData = yield all(
      suggestionsList.map((item) => {
        return call(() => getData(item.url));
      })
    );

    let filteredSuggestionsListData = {};
    suggestionsListData.map((item) => {
      item.data.page.map((p) => {
        if (Object.keys(filteredSuggestionsListData).includes(p.displayTitle)) {
          filteredSuggestionsListData[`${p.displayTitle}`].push(p.content);
        } else {
          filteredSuggestionsListData[`${p.displayTitle}`] = [p.content];
        }
      });
    });
    yield put({
      type: actionTypes.GET_SUGGESTIONS_LIST_SUCCESS,
      payload: {
        filteredSuggestionsListData,
      },
    });
    yield put({
      type: commonActionTypes.HIDE_LOADER,
    });
  }
}

function* OTTSearchWatcher() {
  yield takeLatest(actionTypes.GET_SUGGESTIONS_LIST, getSuggestionsList);
}

export default OTTSearchWatcher;
