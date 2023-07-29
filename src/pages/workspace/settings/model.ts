import { createEvent, sample } from "effector";
import { controls } from "shared/routing";

export const cancelButtonClicked = createEvent();

sample({
  clock: cancelButtonClicked,
  target: controls.back,
});
