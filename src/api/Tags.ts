import { API } from "@/api/axios";

export class Tags {
  static getAll(schoolIds: number | number[]) {
    return API.post("/tag/get-tags", {
      schools: schoolIds,
    });
  }

  static add(schoolId: number, name: string) {
    return API.post("/tag/add-tag", { schoolId, name });
  }

  static remove(id: number) {
    return API.post("/tag/delete-tag", { id });
  }

  static edit(id: number, name: string) {
    return API.post("/tag/edit-tag", { id, name });
  }
}
