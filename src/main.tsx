import ReactDOM from "react-dom/client";
import React from "react";

import "app/styles/index.css";
import { App } from "./app";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
