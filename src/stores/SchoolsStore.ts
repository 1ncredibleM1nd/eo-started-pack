import store from "store";
import { School } from "./model/School";
import { account } from "@/ApiResolvers";
import { makeAutoObservable } from "mobx";

export class SchoolsStore {
  schools: School[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get activeSchoolsIds() {
    return this.schools.filter(({ active }) => active).map(({ id }) => id);
  }

  getById(schoolId: number) {
    return this.schools.find(({ id }) => schoolId === id);
  }

  isActive(schoolId: number) {
    return this.getById(schoolId)?.active;
  }

  async init() {
    const { data } = await account.getSchools();
    Object.entries(data.data).forEach(([id, school]) => {
      this.schools.push(
        new School(
          Number(id),
          school.logo,
          school.schoolName,
          store.get("schools", {})[id] ?? true
        )
      );
    });
  }
}
