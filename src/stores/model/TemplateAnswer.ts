import { makeAutoObservable } from "mobx";

export class TemplateAnswer {
  id: number = -1;
  name: string = "";
  groupId: number = -1;
  content: string = "";

  constructor(id: number, name: string, groupId: number, content: string) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.content = content;
    this.groupId = groupId;
  }

  setName(name: string) {
    this.name = name;
  }

  setContent(content: string) {
    this.content = content;
  }
}
