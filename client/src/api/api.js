import 'isomorphic-fetch';
import config from '../config';


export const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  return headers;
};

export const getURL = (endpoint) => {
  const url = config.API_HOST;
  return `${url}${endpoint}`;
};

export const getBody = (params, method) => {
  return method === 'GET' ? {} : JSON.stringify(params);
};

export const checkError = (json) => {
  if (json.status && json.status >= 300) {
    const { message: jsonError } = json;

    if (typeof jsonError === 'string') throw new Error(jsonError);

    const error = new Error(jsonError.message);
    error.errors = jsonError.errors;

    throw error;
  }
  return json;
};

export const callApi = ({
  method = 'GET',
  endpoint = '/',
  body: params = {},
}) => {
  const headers = getHeaders();
  const body = getBody(params, method);
  const url = getURL(endpoint);

  const requestParams = (method === 'GET') ? { method, headers } : { method, headers, body };
  return fetch(url, requestParams)
    .then(response => response.json())
    .then(json => checkError(json))
    .catch((error) => {
      throw error.message;
    });
};
