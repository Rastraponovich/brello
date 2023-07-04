import { MouseEventHandler } from "react";
import { TBaseIconProps } from "shared/ui/icon";

export type TBaseButtonGroupVariant = "text" | "icon" | "dot" | "iconWithText";

export type TBaseButtonGroupAction = {
  id: number;
  text?: string;
  icon?: TBaseIconProps;
  handler?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant?: TBaseButtonGroupVariant | null | undefined;
};

export interface IButtonsGroup {
  actions: TBaseButtonGroupAction[];
  variant?: TBaseButtonGroupVariant;
  fullWidth?: boolean;
}
