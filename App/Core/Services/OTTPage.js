import axios from 'axios';

export function getStationAutoSelectionData(url) {
  return axios.get(url);
}
