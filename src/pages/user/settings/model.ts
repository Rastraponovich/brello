import { createEvent, sample } from "effector";

import { controls } from "~/shared/routing";

export const resetButtonClicked = createEvent();

sample({
  clock: resetButtonClicked,
  target: controls.back,
});
