import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import App from "./App";
import "mobx-react/batchingForReactDom";
/** TODO:зарефакторить иконки */
import "@/images/icons/index";
import "./styles/index.scss";
import "./styles/ant/index.scss";
import * as stores from "@/stores/implementation";
import { Provider } from "mobx-react";

Sentry.init({
  dsn: "https://9e4815affe3e4590bebe5679355e45cc@o343986.ingest.sentry.io/1890878",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);
