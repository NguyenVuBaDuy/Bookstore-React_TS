import axios from "axios";
import { handleRefreshTokenAPI } from "services/api.service";


const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

const handleRefreshToken = async () => {
    const res = await handleRefreshTokenAPI()
    if (res && res.data) {
        return res.data.access_token
    } else null
}

const NO_RETRY_HEADER: string = 'x-no-retry'

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response && response.data) return response.data
    return response
}, async function (error) {


    if (error.config && error.response
        && +error.response.status === 401
        && !error.config.headers[NO_RETRY_HEADER]
    ) {
        const access_token = await handleRefreshToken();
        error.config.headers[NO_RETRY_HEADER] = 'true'
        if (access_token) {
            error.config.headers['Authorization'] = `Bearer ${access_token}`;
            localStorage.setItem('access_token', access_token)
            return instance.request(error.config);
        }
    }

    if (
        error.config && error.response
        && +error.response.status === 400
        && error.config.url === '/api/v1/auth/refresh'
    ) {
        if (
            window.location.pathname !== '/'
            && !window.location.pathname.startsWith('/book')
        ) {
            window.location.href = '/login';
        }
    }

    return error?.response?.data ?? Promise.reject(error);
});

export default instance