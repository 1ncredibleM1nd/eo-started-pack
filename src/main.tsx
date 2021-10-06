import "reflect-metadata";
import { createElement } from "react";
import { render } from "react-dom";
import { setup } from "goober";

import "@/images/icons/index";
import "./styles/index.scss";
import "./styles/ant/index.scss";
import App from "./App";
import { GlobalStoreProvider } from "./stores";

setup(createElement);

render(
  <GlobalStoreProvider>
    <App />
  </GlobalStoreProvider>,
  document.getElementById("root")
);
