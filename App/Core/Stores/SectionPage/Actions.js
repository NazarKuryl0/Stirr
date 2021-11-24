import { FETCH_SECTION_PAGE_DATA } from './Constants';

export const fetchSectionPageData = (url) => ({
  type: FETCH_SECTION_PAGE_DATA,
  url,
});
