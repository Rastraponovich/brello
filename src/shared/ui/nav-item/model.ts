import { type IconName } from "~/shared/ui/icon";

export interface NavItemProps extends TNavItem {
  selected: boolean;
}
export type TNavItem = {
  id: number;
  title: string;
  href?: string;
  icon?: IconName;
  path?: string;
};
