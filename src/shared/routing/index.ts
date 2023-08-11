import {
  UnmappedRouteObject,
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from "atomic-router";
import { sample } from "effector";
import { createBrowserHistory } from "history";

import { appStarted } from "~/app/model";

export const routes = {
  home: createRoute(),
  board: {
    board: createRoute(),
    settings: createRoute(),
  },
  onboarding: {
    user: createRoute(),
    workspace: createRoute(),
  },
  auth: {
    signin: createRoute(),
  },
  workspace: {
    settings: createRoute(),
    boards: createRoute(),
  },
  user: createRoute(),
};

export const notFoundRoute = createRoute();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const routesMap: UnmappedRouteObject<any>[] = [
  {
    path: "/sign-in",
    route: routes.auth.signin,
  },

  {
    path: "/onboarding/user",
    route: routes.onboarding.user,
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
  {
    path: "/workspace/settings",
    route: routes.workspace.settings,
  },
  {
    path: "/onboarding/workspace",
    route: routes.onboarding.workspace,
  },
  {
    path: "/workspace/boards",
    route: routes.workspace.boards,
  },
];

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  notFoundRoute,
  controls,
});

export const $currentPage = router.$path.map((state) => state);

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
