import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

export interface IIconButton extends IButtonBaseProps {
  size?: TButtonSize;
  icon: string | ReactNode | ReactElement;
}

export interface IButton extends IButtonBaseProps {
  children?: ReactNode;
  visualType?: TButtonType;
}

export interface IButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TButtonSize;
  variant?: TVariant;
}
export type TButtonProps = IButton & TConditionalButton;

type TConditionalButton =
  | {
      visualType: "dot";
      textAlign?: TButtonTextAlign;
      leftIcon?: never;
      rightIcon?: never;
    }
  | {
      visualType?: "default";
      textAlign?: TButtonTextAlign;
      leftIcon?: string | ReactNode;
      rightIcon?: string | ReactNode;
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
