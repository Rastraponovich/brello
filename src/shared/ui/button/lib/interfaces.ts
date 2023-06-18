import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    IButtonIcon {
  children?: ReactNode;
  textAlign?: TButtonTextAlign;
  size?: TButtonSize;
}

interface IButtonIcon {
  leftIcon?: string;
  rightIcon?: string;
}

export type TButtonTextAlign = "center" | "left" | "right";
export type TButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
