import { attach, createEvent, createStore, sample } from "effector";

import { api } from "~/shared/api";
import type { Profile } from "~/shared/api/rest/user";
import { appStarted } from "~/shared/init";
import { controls, routes } from "~/shared/routing";

const getProfileFx = attach({
  effect: api.user.profileGetFx,
});

const getMeFx = attach({
  effect: api.auth.getMeFx,
});

sample({
  clock: appStarted,
  target: getMeFx,
});

sample({
  clock: getMeFx.doneData,
  filter: (profile) => !!profile,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  fn: (profile) => ({ user_id: profile!.id }),
  target: getProfileFx,
});

export type TUser = {
  firstName: string;
  lastName: string;
  image?: string;
  photo?: string;
  email?: string;
  id: number | string;
};

export const cancelButtonClicked = createEvent();
export const logOutButtonClicked = createEvent();
export const viewProfileButtonClicked = createEvent();

export const $profile = createStore<Profile | null>(null);

$profile.on(getProfileFx.doneData, (_, profile) => profile);

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
