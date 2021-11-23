import { put, call, takeLatest, all } from 'redux-saga/effects';
import { getData } from '../Services/ShowPage';

import * as actionTypes from '../Stores/ShowPage/Constants';

function* fetchShowPageData(d) {
  const { url } = d;
  const data = yield call(() => getData(url));
  if (data.status !== 200) {
    yield put({
      type: actionTypes.FETCH_SHOW_PAGE_DATA_FAILED,
      error: 'Error in fetching show page data',
    });
  } else {
    const {
      data: { page },
    } = data;
    const show = page.filter((p) => p.type === 'HERO_TEASER')[0];
    const showData = yield call(() => getData(show.content));
    const filteredShowData = {
      title: show.title,
      description:
        showData.data.rss.channel.pagecomponent.component[0].item['media:content'][
          'media:description'
        ].content,
      image:
        showData.data.rss.channel.pagecomponent.component[0].item['media:content'][
          'media:thumbnail'
        ].url,
    };

    const seasons = page.filter((p) => p.type === 'SEASON_GRID_TEASER_LIST');
    const seasonsData = yield all(
      seasons.map((season)=>{
        return call(()=>getData(season.content))
      })
    )
    const filteredSeasonsData = {
      titles: seasons.map((season)=>{
        return season.title
      }),
      seasonsData: seasonsData.map((season=>{
        return season.data.rss.channel.pagecomponent.component
      }))
    }
    yield put({
      type: actionTypes.FETCH_SHOW_PAGE_DATA_SUCCESS,
      payload: {
        filteredShowData,
        filteredSeasonsData,
      }
    })
  }
}

function* ShowPageWatcher() {
  yield takeLatest(actionTypes.FETCH_SHOW_PAGE_DATA, fetchShowPageData);
}

export default ShowPageWatcher;
