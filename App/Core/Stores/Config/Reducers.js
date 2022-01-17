import * as actionTypes from './Constants';

const initialState = {
  navData: undefined,
  timer: undefined,
  appStyles: undefined,
  channelsListURL: undefined,
  programsDataURL: undefined,
  vmap_generator: undefined,
  cust_params_extras: undefined,
  search_URL: undefined,
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
        channelsListURL: undefined,
        programsDataURL: undefined,
        vmap_generator: undefined,
        cust_params_extras: undefined,
        search_URL: undefined,
      };
    case actionTypes.FETCH_CONFIG_SUCCEEDED:
      return {
        ...state,
        error: undefined,
        timer: action.payload.timer,
        navData: action.payload.navData,
        appStyles: action.payload.appStyles,
        channelsListURL: action.payload.channelsListURL,
        programsDataURL: action.payload.programsDataURL,
        vmap_generator: action.payload.vmap_generator,
        cust_params_extras: action.payload.cust_params_extras,
        search_URL: action.payload.search_URL,
      };
    case actionTypes.FETCH_CONFIG_FAILED:
      return {
        ...state,
        navData: undefined,
        timer: undefined,
        appStyles: undefined,
        channelsListURL: undefined,
        programsDataURL: undefined,
        vmap_generator: undefined,
        cust_params_extras: undefined,
        search_URL: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};

export default configReducer;
