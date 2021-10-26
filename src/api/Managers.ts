import { RequestBuilder } from "@/api/request-builder";

export class Managers {
  static getAll(schoolIds: number | number[]) {
    return RequestBuilder.instance.post("/managers/get-managers-by-schools", {
      schoolIds: schoolIds,
    });
  }
}
