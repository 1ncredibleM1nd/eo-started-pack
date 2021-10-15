import { singleton } from "tsyringe";
import store from "store";
import { makeAutoObservable } from "mobx";
import { TemplateAnswer } from "@/stores/model/TemplateAnswer";
import { TemplateAnswerGroup } from "@/stores/model/TemplateAnswerGroup";
import { templateAnswers } from "@/api";
import { Socket } from "@/services/socket";

@singleton()
export class TemplateAnswersStore {
  constructor(private socket: Socket) {
    makeAutoObservable(this);

    this.socket.on("templateAnswerAdded", (data) => {
      this.add(data.id, data.name, data.groupId, data.content);
    });

    this.socket.on("templateAnswerRemoved", (data) => {
      this.delete(data.id);
    });

    this.socket.on("templateAnswerEdited", (data) => {
      this.edit(data.id, data.name, data.content);
    });

    this.socket.on("templateAnswerGroupAdded", (data) => {
      this.addGroup(data.id, data.name, data.isDeletable);
    });

    this.socket.on("templateAnswerGroupRemoved", (data) => {
      this.deleteGroup(data.id);
    });

    this.socket.on("templateAnswerGroupEdited", (data) => {
      this.editGroup(data.id, data.name);
    });
  }

  templateAnswers = new Map<number, TemplateAnswer>();
  templateAnswerGroups = new Map<number, TemplateAnswerGroup>();

  async load(schoolId: number) {
    store.set("templateAnswers", null);
    store.set("templateAnswerGroups", null);
    this.templateAnswer?.clear();
    this.templateAnswerGroups?.clear();
    const { data: r } = await templateAnswers.getAll(schoolId);
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
    return templateAnswers.edit(id, name, content);
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
    return templateAnswers.editGroup(id, name);
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
