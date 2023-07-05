import { createEvent, sample } from "effector";
import { controls, routes } from "src/shared/routing";

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
