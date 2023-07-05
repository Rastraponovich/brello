import { createHistoryRouter, createRoute } from "atomic-router";
import { createBrowserHistory } from "history";

export const homeRoute = createRoute();
export const boardRoute = createRoute();
export const notFoundRoute = createRoute();

const history = createBrowserHistory();

export const routes = [
  { path: "/", route: homeRoute },
  { path: "/board", route: boardRoute },
  { path: "/404", route: notFoundRoute },
];

export const router = createHistoryRouter({
  routes,
  notFoundRoute: notFoundRoute,
});

router.setHistory(history);
