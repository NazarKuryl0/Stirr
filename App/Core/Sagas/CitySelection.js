import { put, call, takeLatest, all } from 'redux-saga/effects';
import { getData } from '../Services/CitySelection';

import * as actionTypes from '../Stores/CitySelection/Constants';

function* fetchCitySelectionData(d) {
  const { url } = d;
  const citySelectionData = yield call(() => getData(url));
  if (citySelectionData.status !== 200) {
    yield put({
      type: actionTypes.FETCH_CITY_SELECTION_DATA_FAILED,
      error: 'Error in fetching city selection data',
    });
  } else {
    const {
      data: { page },
    } = citySelectionData;
    const teaserData = page.filter((p) => p.type === 'TEXT_TEASER')[0];
    const filteredTeaserData = {
      image: teaserData.imageURL,
      subtitle: teaserData.content,
    };
    const threeColumTeaser = page.filter((p) => p.type === 'THREE_COLUMN_TEASER_LIST')[0];
    let filteredThreeColumTeaserData;
    if (threeColumTeaser) {
      const threeColumTeaserData = yield call(() => getData(threeColumTeaser.content));
      filteredThreeColumTeaserData = {
        title: threeColumTeaser.displayTitle,
        data: threeColumTeaserData.data.rss.channel.pagecomponent.component,
      };
    }
    const fourColumTeaser = page.filter((p) => p.type === 'FOUR_COLUMN_TEASER_LIST');
    let filteredFourColumTeaserData;
    if (fourColumTeaser) {
      const fourColumTeaserData = yield all(
        fourColumTeaser.map((item) => {
          return call(() => getData(item.content));
        })
      );
      filteredFourColumTeaserData = {
        title: fourColumTeaser.map((el) => {
          return el.displayTitle;
        }),
        data: fourColumTeaserData.map((el) => {
          return el.data.rss.channel.pagecomponent.component;
        }),
      };
    }
    yield put({
      type: actionTypes.FETCH_CITY_SELECTION_DATA_SUCCEEDED,
      payload: {
        filteredTeaserData,
        filteredThreeColumTeaserData,
        filteredFourColumTeaserData,
      },
    });
  }
}

function* CitySelectionWatcher() {
  yield takeLatest(actionTypes.FETCH_CITY_SELECTION_DATA, fetchCitySelectionData);
}

export default CitySelectionWatcher;
