import ReactDOM from "react-dom/client";
import React from "react";

// import { App } from "app/ui";
import "app/styles/index.css";
// import { NotFoundPage } from "./pages/404";
import { AuthPage } from "./pages/auth";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthPage />
  </React.StrictMode>
);
