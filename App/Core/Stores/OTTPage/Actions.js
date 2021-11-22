import { FETCH_STATION_AUTO_SELECTION_DATA, FETCH_OTTPAGE_DATA } from './Constants';

export const fetchStationAutoSelectionData = (url) => ({
  type: FETCH_STATION_AUTO_SELECTION_DATA,
  url,
});

export const fetchOTTPageData = (url, station) => ({
  type: FETCH_OTTPAGE_DATA,
  url,
  station,
});
