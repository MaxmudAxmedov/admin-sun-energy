import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("🔑 Sending header:", config.headers.Authorization);
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
    return Promise.reject(error);
  }
);

export default request;
