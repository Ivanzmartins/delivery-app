import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const apiPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const adminPost = async (endpoint, body, token) => {
  const { data } = await api.post(endpoint, body, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const apiGetAll = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const apiGetAllWithToken = async (endpoint, token) => {
  const { data } = await api.get(endpoint, { headers: { Authorization: token } });
  return data;
};

export const changeOrderStatus = async (endpoint, body) => {
  const { data } = await api.put(endpoint, body);
  return data;
};

export default api;
