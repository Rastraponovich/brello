import ReactDOM from "react-dom/client";
import React from "react";

import "app/styles/index.css";
import { WorkSpaceSettingsPage } from "./pages/workspace/settings/ui";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <WorkSpaceSettingsPage />
  </React.StrictMode>
);
