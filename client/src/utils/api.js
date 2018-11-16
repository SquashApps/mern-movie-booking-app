import axios2 from 'axios';
import config from '../config';

const axios = axios2.create({
  baseURL: `${config.HTTP_PROTOCOL}://${config.API_HOST}:${config.API_PORT}`,
});

axios.interceptors.request.use((configuration) => {
  // eslint-disable-next-line
  configuration.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return configuration;
}, error => Promise.reject(error));

axios.interceptors.response.use((response) => {
  const { data } = response;
  return data;
},
error => Promise.reject(error));
export default axios;
