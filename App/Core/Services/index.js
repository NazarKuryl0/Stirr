import axios from 'axios';

export function getDataWithStation(url, station) {
  return axios.get(url, {
    params: {
      station,
    },
  });
}

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

export async function getExtraAdParams(url, station) {
  const {
    data: { cust_params },
  } = await axios.get(url, {
    params: {
      station,
    },
  });

  return {
    ...cust_params,
  };
}

export function getSuggestions(url, value) {
  return axios.get(url, {
    params: {
      query: value,
    },
  });
}
