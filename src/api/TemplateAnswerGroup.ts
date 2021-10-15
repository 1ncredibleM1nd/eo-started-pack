import { API } from "@/actions/axios";

export class TemplateAnswerGroup {
  static getAll(schoolId: number) {
    return API.post("/template-answer/get-all", { schoolId });
  }

  static add(schoolId: number, name: string) {
    return API.post("/template-answer/create", { schoolId, name });
  }

  static remove(id: number) {
    return API.post("/template-answer/delete", {
      templateAnswerId: id,
    });
  }

  static edit(id: number, name: string) {
    return API.post("/template-answer/edit", { templateAnswerId: id, name });
  }
}
