import { createEvent, sample } from "effector";
import { controls } from "src/shared/routing";

export const cancelButtonClicked = createEvent();

sample({
  clock: cancelButtonClicked,
  target: controls.back,
});
