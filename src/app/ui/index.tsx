import "app/styles/index.css";
import { RouterProvider, Route } from "atomic-router-react";

import { boardRoute, homeRoute, notFoundRoute, router } from "./routing";

import { BoardPage } from "src/pages/board";
import { NotFoundPage } from "src/pages/404";
import { BoardsPage } from "src/pages/workspace/boards";

export const App = () => {
  return (
    <RouterProvider router={router}>
      <Route route={homeRoute} view={BoardsPage} />
      <Route route={boardRoute} view={BoardPage} />
      <Route route={notFoundRoute} view={NotFoundPage} />
    </RouterProvider>
  );
};
