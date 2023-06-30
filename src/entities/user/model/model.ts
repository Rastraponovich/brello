import { createStore } from "effector";
import { TUser } from "../lib";

export const $user = createStore<TUser | null>(null);

export const actions = {};
