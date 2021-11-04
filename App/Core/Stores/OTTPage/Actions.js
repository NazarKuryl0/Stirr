import { FETCH_STATION_AUTO_SELECTION_DATA } from './Constants';

export const fetchStationAutoSelectionData = (url) => ({
  type: FETCH_STATION_AUTO_SELECTION_DATA,
  url,
});
