import axios, {
  AxiosError,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
} from 'axios';
import { getCookie } from '@/store/slices/auth.slice';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// check authentication - use a call back = add access token to Header
axios.interceptors.request.use((config) => {
  const token = getCookie('accessToken');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface IResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request?: any;
  // Custom variables
  success?: boolean;
  message?: string;
}

// handle response
axios.interceptors.response.use(
  function (response) {
    return { ...response, success: true };
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (error: AxiosError<any>): IResponse<any> {
    if (error.response) {
      const { response } = error;
      let message = response.data.message;

      // check internet connection
      if (!navigator.onLine) {
        message = 'No internet connection.';
      }

      return { ...response, message, success: false };
    } else if (error.request) {
      return { ...error.response!, message: 'Network error.', success: false };
    } else {
      return { ...error.response!, message: 'Network error', success: false };
    }
  },
);
