import { createEvent, sample } from "effector";

import { routes } from "~/shared/routing";

export const currentRoute = routes.home;

export const signinButtonClicked = createEvent();

sample({
  clock: signinButtonClicked,
  target: routes.auth.signIn.open,
});
