import { createEvent, createStore, sample } from "effector";
import { controls, routes } from "src/shared/routing";

import { type TUser } from "./lib";

export const $user = createStore<TUser | null>(null);

export const viewProfileButtonClicked = createEvent();

sample({
  clock: viewProfileButtonClicked,
  target: routes.user.open,
});

export const logOutButtonClicked = createEvent();

sample({
  clock: logOutButtonClicked,
  target: routes.home.open,
});

export const cancelButtonClicked = createEvent();
sample({
  clock: cancelButtonClicked,
  target: controls.back,
});
