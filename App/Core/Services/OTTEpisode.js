import axios from 'axios';

export function getData(url) {
  return axios.get(url);
}

export async function getDRMAccesses(url, station, body) {
  const { data } = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
      'x-apiversion': '1.0',
      'x-appplatform': 'ios',
      'x-brand': 'stirr',
    },
    params: {
      station,
    },
  });
  return {
    ...data,
  };
}

export async function getDRMFailPlayback(url, station, body) {
  let failUrl = '';

  await axios
    .post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        'x-apiversion': '1.0',
        'x-appplatform': 'ios',
        'x-brand': 'stirr',
      },
      params: {
        station,
      },
    })
    .catch((error) => {
      if (error.response) {
        failUrl = error.response.data.errors[0].meta.drmfail;
      }
    });

  return failUrl;
}
