import { createEvent, createStore } from "effector";

import { router } from "~/shared/routing";
import { TNavItem } from "~/shared/ui/nav-item";

import { __NAVS__ } from "./constants";

const baseUrl = document.location.toString();

export const $menuItems = createStore<TNavItem[]>(__NAVS__);
export const $selected = createStore<TNavItem["path"]>(baseUrl).on(router.$path, (_, path) => path);

export const navButtonClicked = createEvent<string>();
