import axios from "axios";

const kolosApi = axios.create({
  baseURL: "http://51.20.115.221/api/v1/",
  // baseURL: import.meta.env.VITE_APP_API_URL,
});

kolosApi.interceptors.request.use(
  //why async?
  async (config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers = {
        ...config.headers,
        authorization: `Token ${access}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export { kolosApi };

/* const createApi = () => {
  return axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL
  })
}

const $mainApi = createApi()
const $authApi = createApi()

const selectedStorage = localStorage || sessionStorage

const getToken = () => selectedStorage.getItem('access')

const authInterceptor = config => {
  const access = getToken()
  if (access) config.headers.authorization = `Bearer ${access}`
  return config
}

$authApi.interceptors.request.use(authInterceptor)

export { $mainApi, $authApi } */
