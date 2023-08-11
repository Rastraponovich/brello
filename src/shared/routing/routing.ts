import { type UnmappedRouteObject, createRoute } from "atomic-router";

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
    signIn: createRoute(),
  },
  workspace: {
    settings: createRoute(),
    boards: createRoute(),
  },
  user: createRoute(),
};

export const notFoundRoute = createRoute();

export const routesMap: UnmappedRouteObject<object>[] = [
  {
    path: "/sign-in",
    route: routes.auth.signIn,
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
