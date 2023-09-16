import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { toCamel, toSnakeCase, trimValue } from '@nemo/helpers';

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
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(authInterceptor, errorInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);
