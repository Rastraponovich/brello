import { createEvent, createStore, sample } from "effector";

import { controls, routes } from "~/shared/routing";

export type TUser = {
  firstName: string;
  lastName: string;
  image?: string;
  photo?: string;
  email?: string;
  id: number;
};

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
