import { FETCH_CITY_SELECTION_DATA } from './Constants';

export const fetchCitySelectionData = (url) => ({
  type: FETCH_CITY_SELECTION_DATA,
  url,
});
