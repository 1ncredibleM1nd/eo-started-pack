import store from "store";
import { makeAutoObservable } from "mobx";
import { TemplateAnswer, TemplateAnswerGroup } from "@/stores/model";
import { Api } from "@/api";
import { socket } from "@/api/socket";

export class TemplateAnswersStore {
  constructor() {
    makeAutoObservable(this);

    socket.on("templateAnswerAdded", (data) => {
      this.add(data.id, data.name, data.groupId, data.content);
    });

    socket.on("templateAnswerRemoved", (data) => {
      this.delete(data.id);
    });

    socket.on("templateAnswerEdited", (data) => {
      this.edit(data.id, data.name, data.content);
    });

    socket.on("templateAnswerGroupAdded", (data) => {
      this.addGroup(data.id, data.name, data.isDeletable);
    });

    socket.on("templateAnswerGroupRemoved", (data) => {
      this.deleteGroup(data.id);
    });

    socket.on("templateAnswerGroupEdited", (data) => {
      this.editGroup(data.id, data.name);
    });
  }

  templateAnswers = new Map<number, TemplateAnswer>();
  templateAnswerGroups = new Map<number, TemplateAnswerGroup>();

  async load(schoolId: number) {
    store.set("templateAnswers", null);
    store.set("templateAnswerGroups", null);
    this.templateAnswers?.clear();
    this.templateAnswerGroups?.clear();
    const { data: r } = await Api.templateAnswers.getAll(schoolId);
    if (!r.error) {
      r.data.forEach((templateAnswerGroup) => {
        this.templateAnswerGroups.set(
          templateAnswerGroup.id,
          new TemplateAnswerGroup(
            templateAnswerGroup.id,
            templateAnswerGroup.name,
            templateAnswerGroup.isDeletable
          )
        );

        templateAnswerGroup.templateAnswers?.forEach((templateAnswer) => {
          this.templateAnswers.set(
            templateAnswer.id,
            new TemplateAnswer(
              templateAnswer.id,
              templateAnswer.name,
              templateAnswerGroup.id,
              templateAnswer.content
            )
          );
        });
      });
    }
  }

  add(id: number, name: string, groupId: number, content: string) {
    const templateAnswer = new TemplateAnswer(id, name, groupId, content);
    this.templateAnswers.set(templateAnswer.id, templateAnswer);
    this.saveTemplateAnswers();
  }

  delete(id: number) {
    this.templateAnswers.delete(id);
    this.saveTemplateAnswers();
  }

  edit(id: number, name: string, content: string) {
    const templateAnswer = this.templateAnswers.get(id);
    templateAnswer?.setName(name);
    templateAnswer?.setContent(content);
  }

  editRemote(id: number, name: string, content: string) {
    return Api.templateAnswers.edit(id, name, content);
  }

  saveTemplateAnswers() {
    store.set("templateAnswers", Array.from(this.templateAnswers.entries()));
  }

  getById(ids: number[]) {
    return ids.map((id) => this.templateAnswers.get(id));
  }

  getTemplates() {
    return Array.from(this.templateAnswers.values());
  }

  addGroup(id: number, name: string, isDeletable: boolean) {
    const templateAnswerGroup = new TemplateAnswerGroup(id, name, isDeletable);
    this.templateAnswerGroups.set(templateAnswerGroup.id, templateAnswerGroup);
    this.saveTemplateAnswerGroups();
  }

  deleteGroup(id: number) {
    this.templateAnswerGroups.delete(id);
    this.saveTemplateAnswerGroups();
  }

  editGroup(id: number, name: string) {
    const templateAnswerGroup = this.templateAnswerGroups.get(id);
    templateAnswerGroup?.setName(name);
  }

  editRemoteGroup(id: number, name: string) {
    return Api.templateAnswers.editGroup(id, name);
  }

  saveTemplateAnswerGroups() {
    store.set(
      "templateAnswerGroups",
      Array.from(this.templateAnswerGroups.entries())
    );
  }

  getGroupById(ids: number[]) {
    return ids.map((id) => this.templateAnswerGroups.get(id));
  }

  getGroups() {
    return Array.from(this.templateAnswerGroups.values());
  }
}
