import { createEvent, createStore } from "effector";

import type { TNavItem } from "~/shared/ui/nav-item";

import { __NAVS__ } from "./constants";

export const $menuItems = createStore<TNavItem[]>(__NAVS__);

export const navButtonClicked = createEvent<string>();
