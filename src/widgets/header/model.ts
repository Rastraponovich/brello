import { createEvent, createStore } from "effector";

import { $currentPage } from "shared/routing";
import { TNavItem } from "shared/ui/nav-item";

import { helpers } from "./lib";

export const $menuItems = createStore<TNavItem[]>(helpers.navs);
export const $selected = createStore<TNavItem["path"]>("/").on($currentPage, (_, path) => path);

export const navButtonClicked = createEvent<string>();
