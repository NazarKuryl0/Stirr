import * as actionTypes from './Constants';

const initialState = {
  error: undefined,
  suggestionsList: undefined,
};

const OTTSearchPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SUGGESTIONS_LIST:
      return {
        ...state,
        error: undefined,
        suggestionsList: undefined,
      };
    case actionTypes.GET_SUGGESTIONS_LIST_SUCCESS:
      return {
        ...state,
        error: undefined,
        suggestionsList: action.payload.filteredSuggestionsListDataWithComponentsData,
      };
    case actionTypes.GET_SUGGESTIONS_LIST_FAILED:
      return {
        ...state,
        suggestionsList: undefined,
        error: action.error,
      };
    case actionTypes.CLEAR_SUGGESTIONS_LIST:
      return {
        ...state,
        suggestionsList: undefined,
        error: undefined,
      };
    default:
      return state;
  }
};

export default OTTSearchPageReducer;
