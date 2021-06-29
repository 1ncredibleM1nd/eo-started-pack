import axios from "axios";
import { authStore } from "@/stores/implementation";

const AUTH = axios.create({
  baseURL: process.env.APP_API_URL + "/v1",
  withCredentials: true,
});

const API = axios.create({
  baseURL: process.env.APP_API_URL,
  withCredentials: true,
});

function CredentionalsInterceptor(request) {
  let interlayer: string;

  if (authStore.isFrame) {
    interlayer = "/rest";
  } else {
    interlayer = "/v1";
  }

  request.headers["Authorization"] = `Bearer ${authStore.getToken()}`;

  if (authStore.isFrame) {
    request.headers["Timestamp"] = authStore.getTimestamp();
  }

  if (authStore.isFrame) {
    request.headers["User"] = authStore.getUserId();
  }

  request.url = interlayer + request.url;

  return request;
}

API.interceptors.request.use(CredentionalsInterceptor);

export { API, AUTH };
