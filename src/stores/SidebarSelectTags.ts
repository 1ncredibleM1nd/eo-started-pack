import { makeAutoObservable } from "mobx";
import { Tag } from "@/stores/model";

export class SidebarSelectTags {
  tags = new Map<number, boolean>();

  constructor(allTags: Tag[]) {
    makeAutoObservable(this);

    allTags.forEach((tag) => {
      this.tags.set(tag.id, false);
    });
  }

  select(id: number, value: boolean) {
    this.tags.set(id, value);
  }

  getChecked(id: number) {
    return this.tags.get(id) as boolean;
  }

  get selected() {
    return Array.from(this.tags.entries())
      .filter(([_, value]) => value)
      .map(([id]) => id);
  }
}
