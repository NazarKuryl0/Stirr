import * as actionTypes from './Constants';

const initialState = {
  station: undefined,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STATION:
      return {
        ...state,
        station: action.payload.station,
      };
    default:
      return state;
  }
};

export default commonReducer;
