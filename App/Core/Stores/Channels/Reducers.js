import * as actionTypes from './Constants';

const initialState = {
  error: undefined,
  channelsData: undefined,
  categories: undefined,
  selectedProgram: undefined,
};

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNELS_DATA:
      return {
        ...state,
        error: undefined,
        channelsData: undefined,
        categories: undefined,
      };
    case actionTypes.FETCH_CHANNELS_DATA_SUCCEEDED:
      return {
        ...state,
        error: undefined,
        channelsData: action.payload.filteredChannelsDataWithPrograms,
        categories: action.payload.categories,
      };
    case actionTypes.FETCH_CHANNELS_DATA_FAILED:
      return {
        ...state,
        error: action.error,
        channelsData: undefined,
        categories: undefined,
      };
    case actionTypes.SET_SELECTED_PROGRAM:
      return {
        ...state,
        error: action.error,
        selectedProgram: undefined,
      };
    case actionTypes.SET_SELECTED_PROGRAM_FAILED:
      return {
        ...state,
        error: action.error,
        selectedProgram: undefined,
      };
    case actionTypes.SET_SELECTED_PROGRAM_SUCCEEDED:
      return {
        ...state,
        error: undefined,
        selectedProgram: action.payload.selectedProgram,
      };
    default:
      return state;
  }
};

export default channelsReducer;
