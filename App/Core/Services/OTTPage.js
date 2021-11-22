import axios from 'axios';

export function getStationAutoSelectionData(url) {
  return axios.get(url);
}

export function getOTTPageData(url, station) {
  return axios.get(url, {
    params: {
      station,
    },
  });
}
export function getOTTPageComponentData(url, station) {
  return axios.get(url, {
    params: {
      station,
    },
  });
}
