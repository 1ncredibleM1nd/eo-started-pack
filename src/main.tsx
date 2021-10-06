import "reflect-metadata";
import { createElement } from "react";
import { render } from "react-dom";
import { setup } from "goober";

import App from "./App";
import "@/images/icons/index";
import "./styles/index.scss";
import "./styles/ant/index.scss";
import { GlobalStoreProvider } from "./stores";

setup(createElement);

render(
  <GlobalStoreProvider>
    <App />
  </GlobalStoreProvider>,
  document.getElementById("root")
);
