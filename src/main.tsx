import "reflect-metadata";
import { createElement } from "react";
import { render } from "react-dom";
import { setup } from "goober";

import App from "./App";
import "@/assets/icons/index";
import "./styles/index.scss";
import "./styles/ant/index.scss";
import { RootStoreProvider } from "./stores";
import { shouldForwardProp } from "goober/should-forward-prop";

setup(
  createElement,
  undefined,
  undefined,
  shouldForwardProp((prop) => prop !== "active")
);

render(
  <RootStoreProvider>
    <App />
  </RootStoreProvider>,
  document.getElementById("root")
);
