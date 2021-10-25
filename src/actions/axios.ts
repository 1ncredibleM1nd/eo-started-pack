import axios from "axios";
import { authStore } from "@/stores/implementation";

const AUTH = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/v1",
  withCredentials: true,
});

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

// @ts-ignore forgive me for that
function CredentialsInterceptor(request) {
  request.headers["Authorization"] = `Bearer ${authStore.getToken()}`;

  if (authStore.isFrame) {
    request.headers["Timestamp"] = authStore.getTimestamp();
    request.headers["User"] = authStore.getUserId();
    request.headers["RentId"] = authStore.getRentId();
  }

  request.url = `${authStore.isFrame ? "rest" : "v1"}${request.url}`;

  return request;
}

API.interceptors.request.use(CredentialsInterceptor);

export { API, AUTH };
