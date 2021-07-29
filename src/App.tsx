import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Layout } from "antd";
import Chats from "@/pages/Chat";
import "@/styles/index.scss";
import { useStore } from "./stores";

const App = observer(() => {
  const { appStore, authStore } = useStore();

  useEffect(() => {
    async function init() {
      //for safari browser
      setTimeout(function () {
        // Hide the address bar!
        window.scrollTo(0, 1);
      }, 0);

      let response = await authStore.initialize();
      if (response) {
        appStore.initialization();
      }
    }

    init();
  }, []);

  // Check auth when changing browser tabs
  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "visible") {
      await authStore.login();
    }
  });

  return (
    <Layout>
      <Layout className="site-layout">
        <div className="chats-tab-open h-100">
          <div className={"main-layout h-100"}>
            <Chats />
            {/*<NavBarLayout /> */}
          </div>
        </div>
      </Layout>
    </Layout>
  );
});

export default App;
