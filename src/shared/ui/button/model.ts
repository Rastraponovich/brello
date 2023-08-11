import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { IconName, IconProps } from "~/shared/ui/icon";

export interface ButtonProps extends ButtonBaseProps, ButtonBaseVariant {
  children?: ReactNode;
  visualType?: ButtonType;
  pending?: boolean;
}

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
}

export interface ButtonBaseVariant {
  variant?: ButtonVariant;
  destructive?: boolean;
}

export type TButtonProps = ButtonProps & ConditionalButton;

type ConditionalButton =
  | {
      visualType: "dot";
      leftIcon: undefined;
      rightIcon: undefined;
      textAlign?: ButtonTextAlign;
    }
  | {
      leftIcon?: IconName;
      rightIcon?: IconName;
      visualType?: "default";
      textAlign?: ButtonTextAlign;
    };

export type ButtonTextAlign = "center" | "left" | "right";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonVariant =
  | "tertiary"
  | "tertiaryGray"
  | "primary"
  | "link"
  | "secondary"
  | "secondaryGray"
  | "linkGray";

export type ButtonType = "dot" | "default";

export interface IconButtonProps extends ButtonBaseProps, ButtonBaseVariant {
  size?: ButtonSize;
  icon: IconProps["name"];
}

export interface CloseXButtonProps extends ButtonBaseProps {
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  variant?: "primary" | "gray";
}
