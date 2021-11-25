import * as actionTypes from './Constants';

const initialState = {
  error: undefined,
  OTTPageData: undefined,
  OTTPageComponentsData: undefined,
};

const OTTPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STATION_AUTO_SELECTION_DATA:
      return {
        ...state,
        error: undefined,
        OTTPageData: undefined,
        OTTPageComponentsData: undefined,
      };
    case actionTypes.FETCH_STATION_AUTO_SELECTION_DATA_SUCCEEDED:
      return {
        ...state,
        OTTPageData: action.payload.page,
        OTTPageComponentsData: undefined,
      };
    case actionTypes.FETCH_STATION_AUTO_SELECTION_DATA_SUCCEEDED:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.FETCH_OTTPAGE_DATA:
      return {
        ...state,
        error: undefined,
        OTTPageData: undefined,
        OTTPageComponentsData: undefined,
      };
    case actionTypes.FETCH_OTTPAGE_DATA_SUCCESS:
      return {
        ...state,
        OTTPageData: action.payload.page,
        OTTPageComponentsData: action.payload.filteredComponentData,
      };
    case actionTypes.FETCH_OTTPAGE_DATA_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default OTTPageReducer;
