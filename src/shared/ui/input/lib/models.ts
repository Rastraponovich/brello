import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export type InputSize = "sm" | "md";

interface Error {
  error?: string | null | ReactNode;
}

/** TODO: fix */
export interface IBaseInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    IHint {
  size?: InputSize;
  disableIcon?: boolean;
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

export interface IInputProps extends IBaseInput, Validators, Error {
  caption?: string;
}

export interface IBaseInputArea
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export interface IInputAreaProps extends IBaseInputArea, IHint, Error {
  caption?: string;
}

export interface IInputWrapper extends IHint, Error {
  type?: HTMLInputElement["type"];
  children: ReactNode;
  className?: string;
  caption?: string;
}

export interface IBaseInputWeb {
  leftValue?: InputHTMLAttributes<HTMLInputElement>["value"];
  rightValue?: InputHTMLAttributes<HTMLInputElement>["value"];
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  leftPlaceholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
  rightPlaceholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
  leftWidth?: number | string;
}

export interface IInputWebProps extends IHint, IBaseInputWeb, Error {
  caption?: string;
}
