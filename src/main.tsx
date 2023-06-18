import ReactDOM from "react-dom/client";
import React from "react";

import "app/styles/index.css";
import { OnboardingPage } from "./pages/workspace/onboarding";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <OnboardingPage />
  </React.StrictMode>
);
