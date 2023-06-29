import ReactDOM from "react-dom/client";
import React from "react";

import "app/styles/index.css";
import { UserPage } from "./pages/user/settings";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <UserPage />
  </React.StrictMode>
);
