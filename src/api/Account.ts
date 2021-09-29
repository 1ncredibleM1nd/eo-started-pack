import { API, AUTH } from "@/actions/axios";
import { AxiosResponse } from "axios";

export type TApiUser = {
  data: {
    id: number;
    username: string;
    avatar: string | null;
  };
};

export type TApiSchools = {
  data: { [id: string]: { logo: string; schoolName: string } };
};

function call<T>(path: string, params: T) {
  return fetch(`${import.meta.env.VITE_APP_API_URL}/v1/${path}`);
}

export default class Account {
  info() {
    return API.get<TApiUser>("/account/get-account");
  }

  isLogged() {
    return AUTH.get("/account/is-logged");
  }

  setSession(sessionId: string): Promise<AxiosResponse<any>> {
    const formData = new FormData();

    formData.append("encrypted_session_data", sessionId);

    return AUTH.post(`/account/set-session`, formData);
  }

  getSchools() {
    return API.get<TApiSchools>("/account/get-schools");
  }
}
