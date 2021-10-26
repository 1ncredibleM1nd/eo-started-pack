import { RequestBuilder } from "@/api/request-builder";

export class TemplateAnswers {
  getAll(schoolId: number) {
    return RequestBuilder.instance.post("/template-answer/get-all", {
      schoolId,
    });
  }

  add(groupId: number, name: string, content: string) {
    return RequestBuilder.instance.post("/template-answer/create", {
      groupId,
      name,
      content,
    });
  }

  remove(id: number) {
    return RequestBuilder.instance.post("/template-answer/delete", { id });
  }

  edit(id: number, name: string, content: string) {
    return RequestBuilder.instance.post("/template-answer/edit", {
      id,
      name,
      content,
    });
  }

  getTemplates(groupId: number) {
    return RequestBuilder.instance.post("/template-answer/get-templates", {
      groupId,
    });
  }

  addGroup(schoolId: number, name: string) {
    return RequestBuilder.instance.post("/template-answer/create-group", {
      schoolId,
      name,
    });
  }

  removeGroup(id: number) {
    return RequestBuilder.instance.post("/template-answer/delete-group", {
      id,
    });
  }

  editGroup(id: number, name: string) {
    return RequestBuilder.instance.post("/template-answer/edit-group", {
      id,
      name,
    });
  }

  getGroups(schoolId: number) {
    return RequestBuilder.instance.post("/template-answer/get-groups", {
      schoolId,
    });
  }
}
