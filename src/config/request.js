import { getStorage, setStorage } from "@/storage/local-store";
import axios from "axios";

export const request = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

const refreshAccessToken = async () => {
    const refresh_token = getStorage("refresh_token");
    const response = await request.post("/refresh-token", { refresh_token });
    const { access_token, refresh_token: new_refresh_token } =
        response.data.Data;

    setStorage("token", access_token);
    if (new_refresh_token) {
        setStorage("refresh_token", new_refresh_token);
    }

    return access_token;
};

request.interceptors.request.use(
    (config) => {
        const token = getStorage("token");
        if (token) {
            config.headers.Authorization = `${token}`;
        } else {
            console.warn("Token topilmadi, header qo‘shilmadi!");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

request.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return request(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `${newToken}`;
                processQueue(null, newToken);
                return request(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
