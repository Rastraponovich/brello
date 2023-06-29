import ReactDOM from "react-dom/client";
import React from "react";

import "app/styles/index.css";
// import { BoardsPage } from "./pages/workspace/boards";
import { AuthOnboarding } from "./pages/auth";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthOnboarding />
  </React.StrictMode>
);
