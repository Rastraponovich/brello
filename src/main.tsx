import ReactDOM from "react-dom/client";
import React from "react";

import "app/styles/index.css";
import { App } from "./app";
import { appStarted } from "./shared/config";

const root = document.getElementById("root") as HTMLElement;

appStarted();
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
