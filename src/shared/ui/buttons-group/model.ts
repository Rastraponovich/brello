import type { MouseEventHandler } from "react";

import { type IconProps } from "~/shared/ui/icon";

export type BaseButtonGroupVariant = "text" | "icon" | "dot" | "iconWithText";

export type BaseButtonGroupAction = {
  id: number;
  text?: string;
  icon?: IconProps["name"];
  handler?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant?: BaseButtonGroupVariant | null | undefined;
};

export interface ButtonsGroupProps {
  actions: BaseButtonGroupAction[];
  variant?: BaseButtonGroupVariant;
  fullWidth?: boolean;
}
