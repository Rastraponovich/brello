import { RouteInstance } from "atomic-router";

import { type IconName } from "~/shared/ui/icon";

export type NavItemProps = Omit<TNavItem, "id">;
export type TNavItem = {
  id: number;
  title: string;
  icon?: IconName;
  path: RouteInstance<object>;
};
