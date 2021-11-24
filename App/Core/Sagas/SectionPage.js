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
    const feetTeaserList = page.filter((p) => p.type === 'FEED_TEASER_LIST');
    const feedTeaserListData = yield all(
      feetTeaserList.map((item) => {
        return call(() => getData(item.content));
      })
    );
    const filteredFeedTeaserListData = feedTeaserListData.map((item) => {
      return {
        title: item.data.rss.channel.title,
        data: item.data.rss.channel.pagecomponent.component,
      };
    });

    const standartTeaserList = page.filter((p) => p.type === 'STANDARD_TEASER_LIST');
    const standartTeaserListData = yield all(
      standartTeaserList.map((item) => {
        return call(() => getData(item.content));
      })
    );
    const filteredStandartTeaserListData = standartTeaserListData.map((item) => {
      return {
        title: item.data.rss.channel.title,
        data: item.data.rss.channel.pagecomponent.component,
      };
    });
    yield put({
      type: actionTypes.FETCH_SECTION_PAGE_DATA_SUCCESS,
      payload: {
        feedTeaserListData: filteredFeedTeaserListData,
        standartTeaserListData: filteredStandartTeaserListData,
      },
    });
  }
}

function* SectionWatcher() {
  yield takeLatest(actionTypes.FETCH_SECTION_PAGE_DATA, fetchSectionPageData);
}

export default SectionWatcher;
