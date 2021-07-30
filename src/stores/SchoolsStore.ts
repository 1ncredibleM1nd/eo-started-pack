import { flow, getEnv, Instance, types } from "mobx-state-tree";
import { School } from "./model/School";
import type { StoreEnvironment } from "./StoreEnvironment";
import type { TApiSchools } from "../ApiResolvers/Account";
import type { AxiosResponse } from "axios";

export const SchoolsStore = types
  .model("SchoolsStore", {
    schools: types.array(School),
  })
  .views((self) => ({
    get activeSchoolsIds() {
      return self.schools.filter(({ active }) => active).map(({ id }) => id);
    },

    getById(schoolId: string) {
      return self.schools.find(({ id }) => schoolId == id);
    },
  }))
  .actions((self) => ({
    init: flow(function* init() {
      const { api, storage } = getEnv<StoreEnvironment>(self);
      const { data }: AxiosResponse<TApiSchools> =
        yield api.account.getSchools();

      Object.entries(data.data).forEach(([id, school]) => {
        self.schools.push({
          id,
          logo: school.logo,
          name: school.schoolName,
          active: storage.get("schools", {})[id] ?? true,
        });
      });

      return self.schools;
    }),
  }));

export type SchoolsStoreInstance = Instance<typeof SchoolsStore>;
