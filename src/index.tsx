import * as React from "react";
import * as ReactDOM from "react-dom";
import { setup } from "goober";

import App from "./App";
import "@/images/icons/index";
import "./styles/index.scss";
import "./styles/ant/index.scss";
import { GlobalStoreProvider } from "./stores";

setup(React.createElement);

ReactDOM.render(
  <GlobalStoreProvider>
    <App />
  </GlobalStoreProvider>,
  document.getElementById("root")
);
