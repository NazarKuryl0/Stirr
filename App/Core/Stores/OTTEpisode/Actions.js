import { FETCH_OTTEPISODE_PAGE_DATA } from './Constants';

export const fetchOTTEpisodePageData = (url) => ({
  type: FETCH_OTTEPISODE_PAGE_DATA,
  url,
});
