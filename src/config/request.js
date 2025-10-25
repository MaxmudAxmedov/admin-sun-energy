import axios from "axios";
export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status == 403 || error?.response?.status == 401) {
      localStorage.removeItem("token");
      window.location.href == "/login";
    }
  }
);
