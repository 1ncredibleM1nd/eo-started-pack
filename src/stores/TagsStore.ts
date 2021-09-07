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

  noTags = store.get("noTags") ?? false;
  toggleNoTags() {
    this.noTags = !this.noTags;
    store.set("noTags", this.noTags);
  }

  async load(schoolIds: number[]) {
    const { data: r } = await tags.getAll(schoolIds);
    if (!r.error) {
      r.data.forEach((tag) => {
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
  }

  async add(schoolId: number, name: string): Promise<Tag | null> {
    const { data: r } = await tags.add(schoolId, name);

    if (!r.error) {
      const tag = new Tag(r.data.id, r.data.name, r.data.schoolId, false);
      this.tags.set(tag.id, tag);
      this.saveTags();
      return tag;
    }

    return null;
  }

  async delete(id: number) {
    const { data: r } = await tags.delete(id);

    if (!r.error) {
      if (r.data) {
        this.tags.delete(id);
      }

      this.saveTags();
      return r.data;
    }

    return null;
  }

  async edit(id: number, name: string) {
    const { data: r } = await tags.edit(id, name);
    if (!r.error) {
      if (r.data) {
        const tag = this.tags.get(id);
        tag?.setName(name);
      }
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
