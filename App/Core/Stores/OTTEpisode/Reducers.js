import * as actionTypes from './Constants';

const initialState = {
  error: undefined,
  data: undefined,
};

const OTTEpisodePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_OTTEPISODE_PAGE_DATA:
      return {
        ...state,
        error: undefined,
        data: undefined,
      };
    case actionTypes.FETCH_OTTEPISODE_PAGE_DATA_SUCCESS:
      return {
        ...state,
        error: undefined,
        data: action.payload.filteredOTTEpisodeData,
      };
    case actionTypes.FETCH_OTTEPISODE_PAGE_DATA_FAILED:
      return {
        ...state,
        error: action.payload.error,
        data: undefined,
      };
    default:
      return state;
  }
};

export default OTTEpisodePageReducer;
