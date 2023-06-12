import ReactDOM from "react-dom/client";
import React from "react";

// import { App } from "app/ui";
import "app/styles/index.css";
import { NotFoundPage } from "./pages/404";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <NotFoundPage />
  </React.StrictMode>
);
