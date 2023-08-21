import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export type InputSize = "sm" | "md";

interface Error {
  error?: string | null | ReactNode;
}

/** TODO: fix */
export interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, IHint {
  size?: InputSize;
  disableIcon?: boolean;
  onValueChange?: (value: string) => void;
}
export interface IHint {
  hint?: {
    text?: string;
    type?: string;
  };
}

interface Validators {
  // eslint-disable-next-line @typescript-eslint/ban-types
  validators?: Function[];
}

export interface InputProps extends BaseInputProps, Validators, Error {
  caption?: string;
}

export interface BaseInputAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export interface IInputAreaProps extends BaseInputAreaProps, IHint, Error {
  caption?: string;
  onValueChange?: (value: string) => void;
}

export interface InputWrapperProps extends IHint, Error {
  type?: HTMLInputElement["type"];
  children: ReactNode;
  className?: string;
  caption?: string;
}

export interface BaseInputWebProps {
  leftValue?: InputHTMLAttributes<HTMLInputElement>["value"];
  rightValue?: InputHTMLAttributes<HTMLInputElement>["value"];
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  leftPlaceholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
  rightPlaceholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
  leftWidth?: number | string;
}

export interface InputWebProps extends IHint, BaseInputWebProps, Error {
  caption?: string;
}
