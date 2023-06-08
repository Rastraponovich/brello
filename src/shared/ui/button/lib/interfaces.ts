import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

interface IIConButtonProps {
  icon?: string;
  iconPosition?: "left" | "right";
}

export interface IButtonProps extends IButtonBaseProps, IIConButtonProps {
  caption: string;
  pending?: boolean;
}
