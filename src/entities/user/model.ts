import { createEvent, createStore, sample } from "effector";

import { Tables } from "~/shared/api/client";
import { controls, routes } from "~/shared/routing";

export type TUser = {
  firstName: string;
  lastName: string;
  image?: string;
  photo?: string;
  email?: string;
  id: number;
};

export const viewProfileButtonClicked = createEvent();
export const cancelButtonClicked = createEvent();
export const logOutButtonClicked = createEvent();

export const $profile = createStore<Tables<"profiles"> | null>(null);

sample({
  clock: viewProfileButtonClicked,
  target: routes.user.open,
});

sample({
  clock: logOutButtonClicked,
  target: routes.home.open,
});

sample({
  clock: cancelButtonClicked,
  target: controls.back,
});
