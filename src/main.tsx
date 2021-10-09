import "reflect-metadata";
import { createElement } from "react";
import { render } from "react-dom";
import { setup } from "goober";

import App from "./App";
import "@/images/icons/index";
import "./styles/index.scss";
import "./styles/ant/index.scss";
import { RootStoreProvider } from "./stores";

setup(createElement);

render(
  <RootStoreProvider>
    <App />
  </RootStoreProvider>,
  document.getElementById("root")
);
