import { makeAutoObservable } from "mobx";
import store from "store";

export class Tag {
  id: number = -1;
  name: string = "";
  schoolId: number = -1;
  selected: boolean = false;
  color: string = "";

  constructor(
    id: number,
    name: string,
    schoolId: number,
    selected: boolean,
    color: string
  ) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.schoolId = schoolId;
    this.selected = selected;
    this.color = color;
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
