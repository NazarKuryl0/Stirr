import { FETCH_SHOW_PAGE_DATA } from './Constants';

export const fetchShowPageData = (url, station) => ({
  type: FETCH_SHOW_PAGE_DATA,
  url,
  station,
});
