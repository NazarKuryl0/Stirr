import * as actionTypes from './Constants';

const initialState = {
  isLoading: true,
  error: undefined,
  OTTPageData: undefined,
  OTTPageComponentsData: undefined,
};

const OTTPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STATION_AUTO_SELECTION_DATA:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case actionTypes.FETCH_STATION_AUTO_SELECTION_DATA_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        OTTPageData: action.payload.page,
        OTTPageComponentsData: undefined,
      };
    case actionTypes.FETCH_STATION_AUTO_SELECTION_DATA_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionTypes.FETCH_OTTPAGE_DATA:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case actionTypes.FETCH_OTTPAGE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OTTPageData: action.payload.page,
        OTTPageComponentsData: action.payload.filteredComponentData,
      };
    case actionTypes.FETCH_OTTPAGE_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default OTTPageReducer;
