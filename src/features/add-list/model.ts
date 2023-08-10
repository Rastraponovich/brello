import { createEvent } from "effector";

export const actions = {};

const xxx = createEvent();

xxx.watch(console.log);

xxx.watch(() => {
  console.log("xxx");
});
