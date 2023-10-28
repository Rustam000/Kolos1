import axios from "axios";
import { memoizedRefreshToken, refreshTokenFn } from "./refreshToken";
import { BASE_URL } from "../constants/constants";

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access");

    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Token ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosPrivate.interceptors.response.use(
  //if response has new tokens, shouldn't we update our tokens
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      //should save a failed request for resending later
      const newAccessToken = await refreshTokenFn();
      //const result = await memoizedRefreshToken();

      if (newAccessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Token ${newAccessToken}`,
        };
      }

      return axios(config);
      //shouldn't we resend a request with new access token?
    }
    return Promise.reject(error);
  },
);

export { axiosPrivate };
