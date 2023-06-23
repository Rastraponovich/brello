import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    IButtonIcon {
  children?: ReactNode;
  textAlign?: TButtonTextAlign;
  size?: TButtonSize;
  variant?: TVariant;
}

interface IButtonIcon {
  leftIcon?: string | ReactNode;
  rightIcon?: string | ReactNode;
}

export type TButtonTextAlign = "center" | "left" | "right";
export type TButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type TVariant = "default" | "primary" | "link";
