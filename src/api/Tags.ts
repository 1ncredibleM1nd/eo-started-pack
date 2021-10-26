import { API } from "@/api/axios";

export class Tags {
  getAll(schoolIds: number | number[]) {
    return API.post("/tag/get-tags", {
      schools: schoolIds,
    });
  }

  add(schoolId: number, name: string) {
    return API.post("/tag/add-tag", { schoolId, name });
  }

  remove(id: number) {
    return API.post("/tag/delete-tag", { id });
  }

  edit(id: number, name: string) {
    return API.post("/tag/edit-tag", { id, name });
  }
}
