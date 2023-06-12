import ReactDOM from "react-dom/client";
import React from "react";

// import { App } from "app/ui";
import "app/styles/index.css";
// import { OnboardingPage } from "./pages/workspace/onboarding";
// import { UserPage } from "./pages/user/settings";
import { AuthPage } from "./pages/auth";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <UserPage /> */}
    <AuthPage />
  </React.StrictMode>
);
