import * as actionTypes from './Constants';

const initialState = {
  error: undefined,
  teaserData: undefined,
  threeColumTeaserData: undefined,
  fourColumTeaserData: undefined,
};

const citySelectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CITY_SELECTION_DATA:
      return {
        ...state,
        teaserData: undefined,
        threeColumTeaserData: undefined,
        fourColumTeaserData: undefined,
        error: undefined,
      };
    case actionTypes.FETCH_CITY_SELECTION_DATA_SUCCEEDED:
      return {
        ...state,
        teaserData: action.payload.filteredTeaserData,
        threeColumTeaserData: action.payload.filteredThreeColumTeaserData,
        fourColumTeaserData: action.payload.filteredFourColumTeaserData,
      };
    case actionTypes.FETCH_CITY_SELECTION_DATA_FAILED:
      return {
        ...state,
        teaserData: undefined,
        fourColumTeaserData: undefined,
        threeColumTeaserData: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};

export default citySelectionReducer;
