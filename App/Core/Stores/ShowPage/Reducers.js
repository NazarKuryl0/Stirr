import * as actionTypes from './Constants';

const initialState = {
  isLoading: true,
  error: undefined,
  showData: undefined,
  seasonsData: undefined,
};

const OTTPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SHOW_PAGE_DATA:
      return {
        ...state,
        isLoading: true,
        error: undefined,
        showData: undefined,
        seasonsData: undefined,
      };
    case actionTypes.FETCH_SHOW_PAGE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showData: action.payload.filteredShowData,
        seasonsData: action.payload.filteredSeasonsData,
      };
    case actionTypes.FETCH_SHOW_PAGE_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        showData: undefined,
        seasonsData: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};

export default OTTPageReducer;
