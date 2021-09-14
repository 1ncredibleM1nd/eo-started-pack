import { createElement } from "react";
import * as ReactDOM from "react-dom";
import { setup } from "goober";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import "@/images/icons/index";
import "./styles/index.scss";
import "./styles/ant/index.scss";
import { GlobalStoreProvider } from "./stores";

setup(createElement);
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStoreProvider>
      <App />
    </GlobalStoreProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
