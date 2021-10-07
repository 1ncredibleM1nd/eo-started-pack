import { singleton } from "tsyringe";
import store from "store";
import { makeAutoObservable } from "mobx";
import { Tag } from "@/stores/model/Tag";
import { tags } from "@/api";
import { filter, uniqBy } from "lodash";
import { SchoolsStore } from "./SchoolsStore";

@singleton()
export class TagsStore {
  constructor(private schools: SchoolsStore) {
    makeAutoObservable(this);
  }

  tags = new Map<number, Tag>();

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

  add(id: number, schoolId: number, name: string) {
    const tag = new Tag(id, name, schoolId, false);
    this.tags.set(tag.id, tag);
    this.saveTags();
  }

  delete(id: number) {
    this.tags.delete(id);
    this.saveTags();
  }

  edit(id: number, name: string) {
    const tag = this.tags.get(id);
    tag?.setName(name);
  }

  editRemote(id: number, name: string) {
    return tags.edit(id, name);
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

  get activeTagsCount() {
    return this.activeTags.length;
  }

  get groupByName() {
    return uniqBy(
      filter(Array.from(this.tags.values()), (tag) =>
        this.schools.isActive(tag.schoolId)
      ),
      "name"
    );
  }
}
