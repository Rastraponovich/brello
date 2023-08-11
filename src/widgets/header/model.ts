import { createEvent, createStore } from "effector";

import { $currentPage } from "~/shared/routing";
import { TNavItem } from "~/shared/ui/nav-item";

import { __NAVS__ } from "./constants";

export const $menuItems = createStore<TNavItem[]>(__NAVS__);
export const $selected = createStore<TNavItem["path"]>("/").on($currentPage, (_, path) => path);

export const navButtonClicked = createEvent<string>();
