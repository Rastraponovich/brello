import { createEvent, sample } from "effector";

import { routes } from "~/shared/routing";

export const currentRoute = routes.auth.finish;

export const goBackButtonClicked = createEvent();

sample({
  clock: goBackButtonClicked,
  target: routes.auth.signIn.open,
});
