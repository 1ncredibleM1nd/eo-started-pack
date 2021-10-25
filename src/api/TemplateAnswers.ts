import { API } from "@/api/axios";

export class TemplateAnswers {
  static getAll(schoolId: number) {
    return API.post("/template-answer/get-all", { schoolId });
  }

  static add(groupId: number, name: string, content: string) {
    return API.post("/template-answer/create", { groupId, name, content });
  }

  static remove(id: number) {
    return API.post("/template-answer/delete", { id });
  }

  static edit(id: number, name: string, content: string) {
    return API.post("/template-answer/edit", { id, name, content });
  }

  static getTemplates(groupId: number) {
    return API.post("/template-answer/get-templates", { groupId });
  }

  static addGroup(schoolId: number, name: string) {
    return API.post("/template-answer/create-group", { schoolId, name });
  }

  static removeGroup(id: number) {
    return API.post("/template-answer/delete-group", { id });
  }

  static editGroup(id: number, name: string) {
    return API.post("/template-answer/edit-group", { id, name });
  }

  static getGroups(schoolId: number) {
    return API.post("/template-answer/get-groups", { schoolId });
  }
}
