import { routes } from "~/shared/routing";
import type { TNavItem } from "~/shared/ui/nav-item";

export const __NAVS__: TNavItem[] = [
  {
    id: 1,
    title: "boards",
    icon: "common/layers-two",
    path: routes.workspace.boards,
  },
  { id: 2, title: "members", icon: "common/user-circle", path: routes.home },
];
