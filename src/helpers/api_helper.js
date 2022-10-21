import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";
import apiKey from "./jwt-token-access/apiKey";

//pass new generated access token here
const token = accessToken;
const apiKeys = apiKey;
//apply base url for axios
const API_URL = "https://api.univolenitsolutions.com";

// const API_URL = "https://dummy.com";
const axiosApi = axios.create({
  baseURL: API_URL,
});
axiosApi.defaults.headers.common["Authorization"] = localStorage.getItem('authUser')?.data?.tokens?.accessToken ?? token;
axiosApi.defaults.headers.common["x-api-key"] = apiKeys;

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}
