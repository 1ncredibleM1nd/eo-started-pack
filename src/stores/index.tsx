import React, { createContext, useContext } from "react";
import { flow, Instance, types } from "mobx-state-tree";
import { UsersStore } from "./UsersStore";
import { SchoolsStore } from "./SchoolsStore";
import { ChannelsStore } from "./ChannelsStore";
import {
  appStore,
  authStore,
  chatStore,
  contactStore,
} from "@/stores/implementation";
import * as api from "../ApiResolvers";
import * as storage from "store";

export const Store = types
  .model("Store", {
    usersStore: UsersStore,
    schoolsStore: SchoolsStore,
    channelsStore: ChannelsStore,
  })
  .volatile((self) => ({
    appStore,
    authStore,
    chatStore,
    contactStore,
  }))
  .actions((self) => ({
    init: flow(function* init() {
      yield self.usersStore.init();
      yield Promise.all([self.channelsStore.init(), self.schoolsStore.init()]);
    }),
  }));

export type StoreInstance = Instance<typeof Store>;

export const globalStore = Store.create(
  {
    usersStore: {},
    schoolsStore: {},
    channelsStore: {},
  },
  {
    api,
    storage,
  }
);

export const GlobalStoreContext = createContext(globalStore);

export function useStore(): StoreInstance {
  return useContext(GlobalStoreContext);
}

export function GlobalStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalStoreContext.Provider value={globalStore}>
      {children}
    </GlobalStoreContext.Provider>
  );
}
