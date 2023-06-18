import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {
  foo?: "bar";
}
export interface IInputCaptionPosition {
  captionPosition?: TCaptionPosition;
}

export interface IInputProps extends IBaseInput, IInputCaptionPosition {
  caption?: string;
}

export interface IBaseInputArea
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export interface IInputAreaProps extends IBaseInputArea, IInputCaptionPosition {
  caption?: string;
}

export interface IInputWrapper extends IInputCaptionPosition {
  children: ReactNode;
  caption?: string;
  className?: string;
}
export type TCaptionPosition = "left" | "top" | "right" | "bottom";

export interface IBaseInputWeb {
  leftValue?: InputHTMLAttributes<HTMLInputElement>["value"];
  rightValue?: InputHTMLAttributes<HTMLInputElement>["value"];
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  leftPlaceholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
  rightPlaceholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
  leftWidth?: number | string;
}

export interface IInputWebProps extends IInputCaptionPosition, IBaseInputWeb {
  caption?: string;
}
