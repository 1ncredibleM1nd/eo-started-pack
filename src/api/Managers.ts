import { API } from "@/actions/axios";

export class Managers {
  static getAll(schoolIds: number | number[]) {
    return API.post("/managers/get-managers-by-schools", {
      schoolIds: schoolIds,
    });
  }
}
