import { createContext, useContext, ReactNode } from "react";
import { UsersStore } from "./UsersStore";
import { SchoolsStore } from "./SchoolsStore";
import { ChannelsStore } from "./ChannelsStore";
import { SidebarStore } from "@/stores/SidebarStore";
import {
  appStore,
  authStore,
  chatStore,
  contactStore,
} from "@/stores/implementation";
import { makeAutoObservable } from "mobx";
import { TagsStore } from "@/stores/TagsStore";

class RootStore {
  appStore = appStore;
  authStore = authStore;
  chatStore = chatStore;
  contactStore = contactStore;
  sidebarStore = new SidebarStore();
  tagsStore = new TagsStore();
  usersStore = new UsersStore();
  schoolsStore = new SchoolsStore();
  channelsStore = new ChannelsStore();

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    await this.usersStore.init();
    await Promise.all([this.channelsStore.init(), this.schoolsStore.init()]);
    await this.tagsStore.load(this.schoolsStore.activeSchoolsIds);
  }
}

export const globalStore = new RootStore();

export const GlobalStoreContext = createContext(globalStore);

export function useStore(): RootStore {
  return useContext(GlobalStoreContext);
}

export function GlobalStoreProvider({ children }: { children: ReactNode }) {
  return (
    <GlobalStoreContext.Provider value={globalStore}>
      {children}
    </GlobalStoreContext.Provider>
  );
}
