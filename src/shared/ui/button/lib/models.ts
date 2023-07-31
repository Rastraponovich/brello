import { ButtonHTMLAttributes, ReactNode } from "react";
import { IconName, type IconProps } from "shared/ui/icon";

export interface IButton extends IButtonBaseProps, IButtonBaseVariant {
  children?: ReactNode;
  visualType?: TButtonType;
  pending?: boolean;
}

export interface IButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TButtonSize;
}

export interface IButtonBaseVariant {
  variant?: TVariant;
  destructive?: boolean;
}

export type TButtonProps = IButton & TConditionalButton;

type TConditionalButton =
  | {
      visualType: "dot";
      leftIcon: undefined;
      rightIcon: undefined;
      textAlign?: TButtonTextAlign;
    }
  | {
      leftIcon?: IconName;
      rightIcon?: IconName;
      visualType?: "default";
      textAlign?: TButtonTextAlign;
    };

export type TButtonTextAlign = "center" | "left" | "right";
export type TButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type TVariant =
  | "tertiary"
  | "tertiaryGray"
  | "primary"
  | "link"
  | "secondary"
  | "secondaryGray"
  | "linkGray";

export type TButtonType = "dot" | "default";

export interface IIconButton extends IButtonBaseProps, IButtonBaseVariant {
  size?: TButtonSize;
  icon: IconProps["name"];
}

export interface ICloseXButton extends IButtonBaseProps {
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  variant?: "primary" | "gray";
}
