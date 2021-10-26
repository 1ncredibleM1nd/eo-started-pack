import { RequestBuilder } from "@/api/request-builder";

export class Tags {
  getAll(schoolIds: number | number[]) {
    return RequestBuilder.instance.post("/tag/get-tags", {
      schools: schoolIds,
    });
  }

  add(schoolId: number, name: string) {
    return RequestBuilder.instance.post("/tag/add-tag", { schoolId, name });
  }

  remove(id: number) {
    return RequestBuilder.instance.post("/tag/delete-tag", { id });
  }

  edit(id: number, name: string) {
    return RequestBuilder.instance.post("/tag/edit-tag", { id, name });
  }
}
