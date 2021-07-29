import React, { createContext, useContext } from "react";
import {
  appStore,
  authStore,
  chatStore,
  contactStore,
  userStore,
} from "./implementation";

export const globalStore = {
  appStore,
  authStore,
  userStore,
  chatStore,
  contactStore,
};

export const GlobalStoreContext = createContext(globalStore);

export function useStore() {
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
