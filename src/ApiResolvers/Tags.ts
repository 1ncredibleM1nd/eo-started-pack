import { API } from "@/actions/axios";

export class Tags {
  static getAll(schoolIds: number | number[]) {
    return API.post("/tag/get-tags", {
      schools: schoolIds,
    });
  }

  static add(schoolId: number, name: string) {
    return API.post("/tag/add-tag", { schoolId, name });
  }

  static delete(id: number) {
    return API.post("/tag/delete-tag", { id });
  }

  static edit(id: number, name: string) {
    return API.post("/tag/edit-tag", { id, name });
  }
}
