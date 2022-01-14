import { FETCH_CHANNELS_DATA, SET_SELECTED_PROGRAM } from './Constants';

export const fetchChannelsData = () => ({
  type: FETCH_CHANNELS_DATA,
});

export const setSelectedProgram = (program, duration) => ({
  type: SET_SELECTED_PROGRAM,
  program,
  duration,
});
