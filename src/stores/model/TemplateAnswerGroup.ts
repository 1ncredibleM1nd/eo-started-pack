import { makeAutoObservable } from "mobx";

export class TemplateAnswerGroup {
  id: number = -1;
  name: string = "";
  isDeletable: boolean = false;

  constructor(id: number, name: string, isDeletable: boolean) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.isDeletable = isDeletable;
  }

  setName(name: string) {
    this.name = name;
  }
}
