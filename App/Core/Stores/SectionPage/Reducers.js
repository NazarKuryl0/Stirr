import * as actionTypes from './Constants';

const initialState = {
  isLoading: true,
  error: undefined,
};

const SectionPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SECTION_PAGE_DATA:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case actionTypes.FETCH_SECTION_PAGE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
      };
    case actionTypes.FETCH_SECTION_PAGE_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default SectionPageReducer;
