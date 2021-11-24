import { put, call, takeLatest, all } from 'redux-saga/effects';

import { getData } from '../Services/SectionPage';
import * as actionTypes from '../Stores/SectionPage/Constants';

function* fetchSectionPageData(d) {
  const { url } = d;
  const data = yield call(() => getData(url));
  if (data.status !== 200) {
    yield put({
      type: actionTypes.FETCH_SECTION_PAGE_DATA_FAILED,
      payload: {
        error: 'Error in fetching section page data',
      },
    });
  } else {
    const {
      data: { page },
    } = data;
  }
}

function* SectionWatcher() {
  yield takeLatest(actionTypes.FETCH_SECTION_PAGE_DATA, fetchSectionPageData);
}

export default SectionWatcher;
