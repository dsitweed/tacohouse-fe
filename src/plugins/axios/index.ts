import axios, { AxiosError, AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API_URL;

// check authentication - use a call back
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export interface IResponse<T = any> {
    data: T,
    status: number;
    statusText: string,
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: InternalAxiosRequestConfig;
    request?: any;
    // Custom variable
    success?: boolean;
    message?: string,
}

// handle response
axios.interceptors.response.use(
    function (response) {
        return { ...response, success: true };
    },
    function (error: AxiosError<any>): IResponse<any> {
        if(error.response) {
            const { response } = error;
            let message = response.data.message;

            // check internet connection
            if (!navigator.onLine) {
                message = "No internet connection.";
            }

            return { ...response, message, success: false };
        } else if (error.request) {
            return { ...error.response!, message: "Network error.", success: false, };
        } else {
            return { ...error.response!, message: "Network error", success: false };
        }
    }
);