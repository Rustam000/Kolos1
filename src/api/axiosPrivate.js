import axios from "axios";
import { memoizedRefreshToken } from "./refreshToken";
import { BASE_URL } from "../constants/constants";

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const tokens = JSON.parse(localStorage.getItem("token"));

    if (tokens?.access) {
      config.headers = {
        ...config.headers,
        authorization: `Token ${tokens?.access}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await memoizedRefreshToken();

      if (result?.access) {
        config.headers = {
          ...config.headers,
          authorization: `Token ${result?.access}`,
        };
      }

      return axios(config);
      //shouldn't we resend a request with new access token?
    }
    return Promise.reject(error);
  },
);

export { axiosPrivate };
