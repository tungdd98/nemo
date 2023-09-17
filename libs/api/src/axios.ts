import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { toCamel, toSnakeCase, trimValue } from '@nemo/common-helpers';

/**
 * Adds authorization headers to API calls
 * @param {AxiosRequestConfig} config
 */
const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.params = toSnakeCase(trimValue(config.params), true);
  config.data = toSnakeCase(trimValue(config.data), true);

  const token = '';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/**
 * Axios response interceptors
 * @param {AxiosResponse} response
 */
const responseInterceptor = (response: AxiosResponse) => {
  response.data = toCamel(response.data);
  return response;
};

/**
 * Axios error interceptor
 * @param {AxiosError} axiosError
 */
const errorInterceptor = (axiosError: AxiosError) => {
  return Promise.reject(axiosError);
};

/** Setup an API instance */
export const api = axios.create({
  baseURL: 'https://5eaf78cd0605ed0016d2c9a1.mockapi.io/api/tv/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(authInterceptor, errorInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);
