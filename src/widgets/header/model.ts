import { createStore } from "effector";
import { TNavItem } from "src/shared/ui/nav-item";
import { helpers } from "./lib";

export const $menuItems = createStore<TNavItem[]>(helpers.navs);
export const $selected = createStore<TNavItem["id"]>(1);
