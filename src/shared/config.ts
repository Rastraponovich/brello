import { createEvent } from "effector";
import { debug } from "patronum";

export const appStarted = createEvent();

debug({ trace: true }, appStarted);
