import { FETCH_OTTTEXT_PAGE_DATA } from './Constants';

export const fetchOTTTextPageData = (url) => ({
  type: FETCH_OTTTEXT_PAGE_DATA,
  url,
});

