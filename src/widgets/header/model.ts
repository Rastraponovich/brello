import { createEvent, createStore } from "effector";
import { TNavItem } from "src/shared/ui/nav-item";
import { helpers } from "./lib";

import { $currentPage, router } from "src/shared/routing";

export const $menuItems = createStore<TNavItem[]>(helpers.navs);
export const $selected = createStore<TNavItem["path"]>("/").on(
  $currentPage,
  (_, path) => path,
);

export const navButtonClicked = createEvent<string>();

router.$path.watch(console.log);