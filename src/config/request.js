import axios from "axios";
export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const reftoken = localStorage.getItem("refresh_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token} ${reftoken}`;
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
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
    }
  }
);
