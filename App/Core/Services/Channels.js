import axios from 'axios';

export function getChannelsData(url, station) {
  return axios.get(url, {
    params: {
      station,
    },
  });
}
