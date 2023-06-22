import { ReactElement } from "react";

export interface INavItemProps extends TNavItem {
  selected?: boolean;
}
export type TNavItem = {
  id: number;
  title: string;
  href?: string;
  icon?: ReactElement;
};
