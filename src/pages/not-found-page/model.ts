import { createEvent, sample } from "effector";

import { controls, routes } from "~/shared/routing";
import { notFoundRoute } from "~/shared/routing/routes";

export const currentRoute = notFoundRoute;

export const goBackButtonClicked = createEvent();

sample({
  clock: goBackButtonClicked,
  target: controls.back,
});

export const goHomeButtonClicked = createEvent();
sample({
  clock: goHomeButtonClicked,
  target: routes.home.open,
});
