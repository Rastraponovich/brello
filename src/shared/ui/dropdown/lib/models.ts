import { ReactNode, ReactElement } from "react";

export interface IDropdownProps {
  buttonContent: string | ReactNode | ReactElement;
  buttonClassName?: string;
  menuHead?: ReactNode | ReactElement;
  groupProperty?: keyof TMenuItem;
}

export type TMenuItem = {
  id: number;
  group: number | string | null;
  text: string;
  icon: string | ReactElement | ReactNode;
  hotkey: string;
};

export interface IMenuItemProps {
  item: TMenuItem;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?(): void;
}
