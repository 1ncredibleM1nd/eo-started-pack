import axios from "axios";

const AUTH = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/v1",
  withCredentials: true,
});

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

export { API, AUTH };
