import type { ReactElement, ReactNode } from "react";

import type { IconName } from "~/shared/ui/icon";

export type TKey = keyof Omit<TMenuItem, "onClick" | "handler">;

export interface DropdownProps {
  keyProperty?: TKey;
  items?: TMenuItem[];
  titleProperty?: TKey;
  groupProperty?: TKey;
  menuClassName?: string;
  buttonClassName?: string;
  menuHead?: ReactNode | ReactElement;
  buttonContent: string | ReactNode | ReactElement;
}

export type TMenuItem = {
  text: string;
  hotkey: string;
  id: number | string;
  icon?: IconName | null;
  group?: number | string | null;
  onClick?: React.DOMAttributes<HTMLButtonElement>["onClick"];
};

export interface MenuItemProps {
  item: TMenuItem;
  active: boolean;
  disabled: boolean;
  className?: string;
  keyProperty?: TKey;
  titleProperty: TKey;
  type?: "menu" | "checkbox";
  onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
}
