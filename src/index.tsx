import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
/** TODO:зарефакторить иконки */
import "@/images/icons/index";
import "./styles/index.scss";
import "./styles/ant/index.scss";
import { GlobalStoreProvider } from "./stores";

ReactDOM.render(
  <GlobalStoreProvider>
    <App />
  </GlobalStoreProvider>,
  document.getElementById("root")
);
