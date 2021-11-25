import * as actionTypes from './Constants';

const initialState = {
  error: undefined,
  OTTTextPageData: undefined,
};

const OTTTextPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_OTTTEXT_PAGE_DATA:
      return {
        ...state,
        error: undefined,
        OTTTextPageData: undefined,
      };
    case actionTypes.FETCH_OTTTEXT_PAGE_DATA_SUCCESS:
      return {
        ...state,
        error: undefined,
        OTTTextPageData: action.payload.data,
      };
    case actionTypes.FETCH_OTTTEXT_PAGE_DATA_FAILED:
      return {
        ...state,
        OTTTextPageData: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};

export default OTTTextPageReducer;
