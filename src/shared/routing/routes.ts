import { type UnmappedRouteObject, createRoute } from "atomic-router";

export const routes = {
  home: createRoute(),
  board: {
    board: createRoute(),
    settings: createRoute<{ id: string }>(),
  },
  onboarding: {
    user: createRoute(),
    workspace: createRoute(),
  },
  auth: {
    signIn: createRoute(),
    finish: createRoute(),
  },
  workspace: {
    settings: createRoute(),
    boards: createRoute(),
  },
  user: createRoute(),
};

export const notFoundRoute = createRoute();

export const routesMap: UnmappedRouteObject<object | { id: string }>[] = [
  {
    path: "/auth/sign-in",
    route: routes.auth.signIn,
  },
  {
    path: "/auth/finish",
    route: routes.auth.finish,
  },

  {
    path: "/onboarding/user",
    route: routes.onboarding.user,
  },
  {
    path: "/onboarding/workspace",
    route: routes.onboarding.workspace,
  },
  {
    path: "/workspace/:workspace/board/:id",
    route: routes.board.board,
  },
  {
    path: "/board/:id/settings",
    route: routes.board.settings,
  } as UnmappedRouteObject<object | { id: string }>,
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
    path: "/workspace/boards",
    route: routes.workspace.boards,
  },
];
