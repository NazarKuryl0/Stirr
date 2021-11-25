import * as actionTypes from './Constants';

const initialState = {
  error: undefined,
  showData: undefined,
  seasonsData: undefined,
};

const OTTPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SHOW_PAGE_DATA:
      return {
        ...state,
        error: undefined,
        showData: undefined,
        seasonsData: undefined,
      };
    case actionTypes.FETCH_SHOW_PAGE_DATA_SUCCESS:
      return {
        ...state,
        showData: action.payload.filteredShowData,
        seasonsData: action.payload.filteredSeasonsData,
      };
    case actionTypes.FETCH_SHOW_PAGE_DATA_FAILED:
      return {
        ...state,
        showData: undefined,
        seasonsData: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};

export default OTTPageReducer;
