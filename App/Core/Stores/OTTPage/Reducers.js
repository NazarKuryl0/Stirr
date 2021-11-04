import * as actionTypes from './Constants';

const initialState = {
  background: undefined,
  displayTitle: undefined,
  subTitle: undefined,
  logoURL: undefined,
  stationText: undefined,
  promoText: undefined,
  buttonText: undefined,
  station: undefined,
  isLoading: true,
  error: undefined,
};

const OTTPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STATION_AUTO_SELECTION_DATA:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case actionTypes.FETCH_STATION_AUTO_SELECTION_DATA_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        background: action.payload.background,
        displayTitle: action.payload.displayTitle,
        subTitle: action.payload.subTitle,
        logoURL: action.payload.logoURL,
        stationText: action.payload.stationText,
        promoText: action.payload.promoText,
        buttonText: action.payload.buttonText,
        station: action.payload.station,
      };
    case actionTypes.FETCH_STATION_AUTO_SELECTION_DATA_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default OTTPageReducer;
