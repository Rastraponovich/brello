import ReactDOM from "react-dom/client";
import React from "react";

import "app/styles/index.css";
import { BoardPage } from "./pages/board";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BoardPage />
  </React.StrictMode>
);
