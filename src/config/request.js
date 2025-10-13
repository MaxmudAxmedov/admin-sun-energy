import axios from "axios";
import { getStorage } from "@/storage/local-store";

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
  timeout: 10000,
});

request.interceptors.request.use(
  (request) => {
    const token = getStorage("access_token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
