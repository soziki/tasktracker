import axios from 'axios';
import keycloak from '../keycloak';

export const apiClient = axios.create();

apiClient.interceptors.request.use(async (config) => {
  try {
    await keycloak.updateToken(30);
  } catch {
    keycloak.login();
  }
  if (keycloak.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      keycloak.login();
    }
    return Promise.reject(error);
  }
);
