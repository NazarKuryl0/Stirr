import { SET_STATION } from './Constants';

export const setStation = (station) => ({
  type: SET_STATION,
  station,
});
