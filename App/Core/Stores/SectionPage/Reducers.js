import * as actionTypes from './Constants';

const initialState = {
  error: undefined,
  feedTeaserListData: undefined,
  standartTeaserListData: undefined,
};

const SectionPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SECTION_PAGE_DATA:
      return {
        ...state,
        error: undefined,
        feedTeaserListData: undefined,
        standartTeaserListData: undefined,
      };
    case actionTypes.FETCH_SECTION_PAGE_DATA_SUCCESS:
      return {
        ...state,
        error: undefined,
        feedTeaserListData: action.payload.feedTeaserListData,
        standartTeaserListData: action.payload.standartTeaserListData,
      };
    case actionTypes.FETCH_SECTION_PAGE_DATA_FAILED:
      return {
        ...state,
        feedTeaserListData: undefined,
        standartTeaserListData: undefined,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default SectionPageReducer;
