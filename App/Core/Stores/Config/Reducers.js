import * as actionTypes from './Constants';

const initialState = {
  navData: undefined,
  timer: undefined,
  appStyles: undefined,
  error: undefined,
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CONFIG:
      return {
        ...state,
        error: undefined,
        navData: undefined,
        timer: undefined,
        appStyles: undefined,
      };
    case actionTypes.FETCH_CONFIG_SUCCEEDED:
      return {
        ...state,
        error: undefined,
        timer: action.payload.timer,
        navData: action.payload.navData,
        appStyles: action.payload.appStyles,
      };
    case actionTypes.FETCH_CONFIG_FAILED:
      return {
        ...state,
        navData: undefined,
        timer: undefined,
        appStyles: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};

export default configReducer;
