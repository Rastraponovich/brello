import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

/** TODO: fix */
export interface IBaseInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    IHint {
  size?: TInputSize;
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

interface Errors {
  hasError?: boolean;
  errors?: { text: string; type: string }[];
}
export interface IInputProps extends IBaseInput, Validators, Errors {
  caption?: string;
}

export interface IBaseInputArea
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export interface IInputAreaProps extends IBaseInputArea, IHint {
  caption?: string;
}

export interface IInputWrapper extends IHint, Errors {
  type?: HTMLInputElement["type"];
  children: ReactNode;
  className?: string;
  caption?: string;
}

// TODO: remove || depricated
export type TCaptionPosition = "left" | "top" | "right" | "bottom";

export type TInputSize = "sm" | "md";

export interface IInputSize {
  size: TInputSize;
}

export interface IBaseInputWeb {
  leftValue?: InputHTMLAttributes<HTMLInputElement>["value"];
  rightValue?: InputHTMLAttributes<HTMLInputElement>["value"];
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  leftPlaceholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
  rightPlaceholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
  leftWidth?: number | string;
}

export interface IInputWebProps extends IHint, IBaseInputWeb {
  caption?: string;
}
