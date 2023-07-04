import { ReactNode, ReactElement, ForwardRefExoticComponent } from "react";

export type TKey = keyof Omit<TMenuItem, "icon">;

export interface IDropdownProps {
  keyProperty?: TKey;
  items?: TMenuItem[];
  titleProperty?: TKey;
  buttonClassName?: string;
  groupProperty?: keyof TMenuItem;
  menuHead?: ReactNode | ReactElement;
  buttonContent: string | ReactNode | ReactElement;
}

export type TMenuItem = {
  id: number;
  text: string;
  hotkey: string;
  group?: number | string | null;
  icon?: string | ReactElement | ReactNode | ForwardRefExoticComponent<unknown>;
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
