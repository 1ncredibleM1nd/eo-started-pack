import store from "store";
import { makeAutoObservable } from "mobx";
import { Tag } from "@/stores/model";
import { Api } from "@/api";
import { filter, uniqBy } from "lodash-es";
import { RootStoreInstance } from ".";
import { socket } from "@/api/socket";

export class TagsStore {
  constructor(private readonly rootStore: RootStoreInstance) {
    makeAutoObservable(this);

    socket.on("tagAdded", (data) => {
      this.add(data.id, data.school_id, data.name, data.color);
    });

    socket.on("tagRemoved", (data) => {
      this.delete(data.id);
    });

    socket.on("tagEdited", (data) => {
      this.edit(data.id, data.name);
    });
  }

  tags = new Map<number, Tag>();
  noTags = store.get("noTags") ?? false;
  toggleNoTags() {
    this.noTags = !this.noTags;
    store.set("noTags", this.noTags);
  }

  async load(schoolIds: number[]) {
    const { data: r } = await Api.tags.getAll(schoolIds);
    if (!r.error) {
      r.data.forEach((tag) => {
        this.tags.set(
          tag.id,
          new Tag(
            tag.id,
            tag.name,
            tag.schoolId,
            store.get("tags", {})[tag.id] ?? false,
            tag.color
          )
        );
      });
    }
  }

  add(id: number, schoolId: number, name: string, color: string) {
    const tag = new Tag(id, name, schoolId, false, color);
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

  resetTags() {
    Array.from(this.tags.values()).forEach((tag) => {
      tag.setSelected(false);
    });

    this.noTags = false;
    store.set("noTags", false);
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
        this.rootStore.schoolsStore.isActive(tag.schoolId)
      ),
      "name"
    ) as Tag[];
  }
}
