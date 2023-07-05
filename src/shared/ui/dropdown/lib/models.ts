import { ReactNode, ReactElement } from "react";
import { IconName } from "shared/ui/icon";

export type TKey = keyof Omit<TMenuItem, "onClick" | "handler">;

export interface IDropdownProps {
  keyProperty?: TKey;
  items?: TMenuItem[];
  titleProperty?: TKey;
  groupProperty?: TKey;
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

export interface IMenuItemProps {
  item: TMenuItem;
  active: boolean;
  disabled: boolean;
  className?: string;
  keyProperty?: TKey;
  titleProperty: TKey;
  type?: "menu" | "checkbox";
  onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
}
