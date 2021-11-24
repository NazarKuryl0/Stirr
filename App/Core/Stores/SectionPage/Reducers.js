import * as actionTypes from './Constants';

const initialState = {
  isLoading: true,
  error: undefined,
  feedTeaserListData: undefined,
  standartTeaserListData: undefined,
};

const SectionPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SECTION_PAGE_DATA:
      return {
        ...state,
        isLoading: true,
        error: undefined,
        feedTeaserListData: undefined,
        standartTeaserListData: undefined,
      };
    case actionTypes.FETCH_SECTION_PAGE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        feedTeaserListData: action.payload.feedTeaserListData,
        standartTeaserListData: action.payload.standartTeaserListData,
      };
    case actionTypes.FETCH_SECTION_PAGE_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        feedTeaserListData: undefined,
        standartTeaserListData: undefined,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default SectionPageReducer;
