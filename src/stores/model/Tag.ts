import { makeAutoObservable } from "mobx";
import store from "store";

export class Tag {
  id: number = -1;
  name: string = "";
  schoolId: number = -1;
  selected: boolean = false;

  constructor(id: number, name: string, schoolId: number, selected: boolean) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.schoolId = schoolId;
    this.selected = selected;
  }

  setName(name: string) {
    this.name = name;
  }

  setSelected(selected: boolean) {
    this.selected = selected;

    store.set("tags", {
      ...store.get("tags"),
      [this.id]: selected,
    });
  }
}
