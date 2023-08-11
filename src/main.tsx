import { allSettled, fork } from "effector";
import { Provider } from "effector-react";
import { createRoot } from "react-dom/client";

import "app/styles/index.css";

import { Application, appStarted } from "./app";

const root = document.getElementById("root") as HTMLElement;

const scope = fork();

allSettled(appStarted, { scope });

createRoot(root).render(
  <Provider value={scope}>
    <Application />
  </Provider>,
);
