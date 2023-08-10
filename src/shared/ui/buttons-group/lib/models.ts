import { MouseEventHandler } from "react";

import { type IconProps } from "shared/ui/icon";

export type TBaseButtonGroupVariant = "text" | "icon" | "dot" | "iconWithText";

export type TBaseButtonGroupAction = {
  id: number;
  text?: string;
  icon?: IconProps["name"];
  handler?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant?: TBaseButtonGroupVariant | null | undefined;
};

export interface IButtonsGroup {
  actions: TBaseButtonGroupAction[];
  variant?: TBaseButtonGroupVariant;
  fullWidth?: boolean;
}
