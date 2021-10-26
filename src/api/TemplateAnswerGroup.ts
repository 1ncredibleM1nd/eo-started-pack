import { RequestBuilder } from "@/api/request-builder";

export class TemplateAnswerGroup {
  static getAll(schoolId: number) {
    return RequestBuilder.instance.post("/template-answer/get-all", {
      schoolId,
    });
  }

  static add(schoolId: number, name: string) {
    return RequestBuilder.instance.post("/template-answer/create", {
      schoolId,
      name,
    });
  }

  static remove(id: number) {
    return RequestBuilder.instance.post("/template-answer/delete", {
      templateAnswerId: id,
    });
  }

  static edit(id: number, name: string) {
    return RequestBuilder.instance.post("/template-answer/edit", {
      templateAnswerId: id,
      name,
    });
  }
}
