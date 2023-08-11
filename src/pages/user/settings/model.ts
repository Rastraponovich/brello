import { createEvent, sample } from "effector";

import { controls, routes } from "~/shared/routing";

export const currentRoute = routes.user;
export const resetButtonClicked = createEvent();

sample({
  clock: resetButtonClicked,
  target: controls.back,
});
