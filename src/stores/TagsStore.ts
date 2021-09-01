import { makeAutoObservable } from "mobx";
import { Tag } from "@/stores/model/Tag";
import { tags } from "@/ApiResolvers";
import group from "lodash.groupby";
import store from "store";

export class TagsStore {
  tags = new Map<number, Tag>();

  constructor() {
    makeAutoObservable(this);
  }

  async load(schoolIds: number[]) {
    const { data } = await tags.getAll(schoolIds);
    data.data.forEach((tag) => {
      this.tags.set(
        tag.id,
        new Tag(
          tag.id,
          tag.name,
          tag.schoolId,
          store.get("tags", {})[tag.id] ?? false
        )
      );
    });
  }

  async add(schoolId: number, name: string): Promise<Tag> {
    const { data } = await tags.add(schoolId, name);
    const tag = data.data;
    this.tags.set(tag.id, new Tag(tag.id, tag.name, tag.schoolId, false));
    this.saveTags();
    return data.data;
  }

  async delete(id: number) {
    const { data } = await tags.delete(id);
    if (data.data) {
      this.tags.delete(id);
    }
    this.saveTags();
    return data.data;
  }

  async edit(id: number, name: string) {
    const { data } = await tags.edit(id, name);
    if (data.data) {
      const tag = this.tags.get(id);
      tag?.setName(name);
    }
  }

  saveTags() {
    store.set(
      "tags",
      Array.from(this.tags.entries(), ([id, tag]) => ({ [id]: tag.selected }))
    );
  }

  getById(ids: number[]) {
    return ids.map((id) => this.tags.get(id));
  }

  getBySchools(schoolIds: number[]) {
    return Array.from(this.tags.values()).filter((tag) =>
      schoolIds.includes(tag.schoolId)
    );
  }

  get activeTags() {
    return Array.from(this.tags.values()).filter(({ selected }) => selected);
  }

  get groupBySchools() {
    return group(Array.from(this.tags.values()), "schoolId");
  }
}
