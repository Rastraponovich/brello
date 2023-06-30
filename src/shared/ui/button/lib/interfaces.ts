import { ButtonHTMLAttributes, ReactNode } from "react";
import { TBaseIconProps } from "../../icon";

export interface IButton extends IButtonBaseProps, IButtonBaseVariant {
  children?: ReactNode;
  visualType?: TButtonType;
}

export interface IButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TButtonSize;
}

export interface IButtonBaseVariant {
  variant?: TVariant;
}

export type TButtonProps = IButton & TConditionalButton;

type TConditionalButton =
  | {
      visualType: "dot";
      textAlign?: TButtonTextAlign;
      leftIcon: undefined;
      rightIcon: undefined;
    }
  | {
      visualType?: "default";
      textAlign?: TButtonTextAlign;
      leftIcon?: TBaseIconProps;
      rightIcon?: TBaseIconProps;
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
  icon: TBaseIconProps;
}

export interface ICloseXButton extends IButtonBaseProps {
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  variant?: "primary" | "gray";
}
