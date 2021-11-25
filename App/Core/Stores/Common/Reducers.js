import * as actionTypes from './Constants';

const initialState = {
  station: undefined,
  isLoading: false,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STATION:
      return {
        ...state,
        station: action.payload.station,
      };
    case actionTypes.SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default commonReducer;
