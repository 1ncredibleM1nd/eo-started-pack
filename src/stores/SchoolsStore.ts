import store from "store";
import { School } from "./model/School";
import { Api } from "@/api";
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

  get activeSchoolsCount() {
    return this.activeSchoolsIds.length;
  }

  isActive(schoolId: number) {
    return this.getById(schoolId)?.active;
  }

  async init() {
    const { data } = await Api.account.getSchools();
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
