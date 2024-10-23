import axios from "axios";
import { getToken, getRefreshToken, setToken, setRefreshToken, removeToken } from "./auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      // config.headers = {};
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response interceptor
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requestInterceptor = service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error.response.status) {
      return Promise.reject(new Error("Cannot connect to server!"));
    }
    const ignoreUrlConfigs = ["/authentication/login", "/authentication/forgot-password"];
    if (error.response.status === 401 && ignoreUrlConfigs.includes(error.response.config?.url)) {
      return Promise.reject(new Error(error.response.data?.error_description));
    } else if (
      error.response.status === 401 &&
      !ignoreUrlConfigs.includes(error.response.config?.url)
    ) {
      return service({
        url: "/authentication/refresh-token",
        method: "post",
        data: { refreshToken: getRefreshToken() }
      })
        .then(res => {
          setToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken, res.data.refreshExpiresIn);
          error.response.config.headers["Authorization"] = "Bearer " + res.data.accessToken;
          return service(error.response.config);
        })
        .catch(() => {
          removeToken();
          window.location.href = "/login";
        });
    }
    if (error.response.status === 400) {
      return Promise.reject(new Error(error.response.data?.message));
    }
    if (error.response.status === 403) {
      return Promise.reject(new Error("You don't have access this"));
    }
    if (error.response.status === 404) {
      return Promise.reject(new Error("Not found"));
    }
    if (error.response.status === 500) {
      return Promise.reject(new Error(error.response.message || "Internal Server Error"));
    }
    return Promise.reject(new Error("Failed"));
  }
);

export default service;
