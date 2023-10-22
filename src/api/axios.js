import axios from "axios";

const kolosApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

const authInterceptor = (config) => {
  const access = localStorage.getItem("access");
  if (access) config.headers.authorization = `Bearer ${access}`;
  return config;
};

kolosApi.interceptors.request.use(authInterceptor);

export { kolosApi };
