import { ReactNode, ReactElement, ForwardRefExoticComponent } from "react";

export type TKey = keyof Omit<TMenuItem, "icon">;

export interface IDropdownProps {
  buttonContent: string | ReactNode | ReactElement;

  buttonClassName?: string;
  menuHead?: ReactNode | ReactElement;
  groupProperty?: keyof TMenuItem;
  keyProperty?: TKey;
  titleProperty?: TKey;
  items?: TMenuItem[];
}

export type TMenuItem = {
  id: number;
  group?: number | string | null;
  text: string;
  icon?: string | ReactElement | ReactNode | ForwardRefExoticComponent<unknown>;
  hotkey: string;
};

export interface IMenuItemProps {
  item: TMenuItem;
  active: boolean;
  disabled: boolean;
  className?: string;
  onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
  keyProperty?: TKey;
  titleProperty: TKey;
  type?: "menu" | "checkbox";
}
