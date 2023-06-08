import ReactDOM from "react-dom/client";
import React from "react";

import { App } from "app/ui";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
