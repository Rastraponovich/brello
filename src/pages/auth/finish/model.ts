import { attach, createEvent, createStore, sample } from "effector";
import { delay, not, reset } from "patronum";

import { api } from "~/shared/api";
import { routes } from "~/shared/routing";

export const currentRoute = routes.auth.finish;

const getMeFx = attach({ effect: api.auth.getMeFx });

const authFinished = createEvent();
const authFailed = createEvent();

export const goBackButtonClicked = createEvent();

export const $pending = getMeFx.pending;
export const $successfuly = createStore(false);

sample({
  clock: currentRoute.opened,
  filter: not(getMeFx.pending),
  target: getMeFx,
});

// happy path
sample({
  clock: getMeFx.doneData,
  filter: Boolean,
  target: authFinished,
});

$successfuly.on(authFinished, () => true);

sample({
  clock: delay({ source: authFinished, timeout: 1000 }),
  filter: currentRoute.$isOpened,
  target: routes.onboarding.user.open,
});

// fail path
sample({
  clock: getMeFx.doneData,
  filter: (user) => !user,
  target: authFailed,
});

sample({
  clock: getMeFx.fail,
  target: authFailed,
});

$successfuly.on(authFailed, () => false);

sample({
  clock: goBackButtonClicked,
  target: routes.auth.signIn.open,
});

reset({
  clock: currentRoute.closed,
  target: $successfuly,
});
