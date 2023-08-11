import {
  UnmappedRouteObject,
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from "atomic-router";
import { sample } from "effector";
import { createBrowserHistory } from "history";

import { appStarted } from "./config";

export const routes = {
  home: createRoute(),
  board: {
    board: createRoute(),
    settings: createRoute(),
  },
  auth: {
    login: createRoute(),
    onboarding: createRoute(),
  },
  workspace: { settings: createRoute(), onboarding: createRoute(), boards: createRoute() },
  user: createRoute(),
  notFountPage: createRoute(),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const routesMap: UnmappedRouteObject<any>[] = [
  {
    path: "/login",
    route: routes.auth.login,
  },

  {
    path: "/auth/onboarding",
    route: routes.auth.onboarding,
  },

  {
    path: "/board/:id",
    route: routes.board.board,
  },
  {
    path: "/board/:id/settings",
    route: routes.board.settings,
  },
  {
    path: "/user",
    route: routes.user,
  },
  {
    path: "/",
    route: routes.home,
  },
  { path: "/workspace/settings", route: routes.workspace.settings },
  { path: "/workspace/onboarding", route: routes.workspace.onboarding },
  { path: "/workspace/boards", route: routes.workspace.boards },
];

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  controls,
  notFoundRoute: routes.notFountPage,
});

export const $currentPage = router.$path.map((state) => state);

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
