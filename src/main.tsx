import { RouterProvider } from "atomic-router-react";
import { allSettled, fork } from "effector";
import { Provider } from "effector-react";
import { createRoot } from "react-dom/client";

import "~/app/styles/index.css";

import { appStarted } from "~/shared/init";
import { router } from "~/shared/routing";

import { Application } from "./app";

const root = document.getElementById("root") as HTMLElement;

const scope = fork();

console.log(import.meta.env);

allSettled(appStarted, { scope }).catch(() => console.warn("совсем все плохо"));

createRoot(root).render(
  <Provider value={scope}>
    <RouterProvider router={router}>
      <Application />
    </RouterProvider>
  </Provider>,
);
