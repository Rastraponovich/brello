import { InputHTMLAttributes, ReactNode } from "react";

export interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {
  foo?: "bar";
}
export interface IInputCaptionPosition {
  captionPosition?: TCaptionPosition;
}

export interface IInputProps extends IBaseInput, IInputCaptionPosition {
  caption?: string;
}

export interface IInputWrapper extends IInputCaptionPosition {
  children: ReactNode;
  caption?: string;
  className?: string;
}
export type TCaptionPosition = "left" | "top" | "right" | "bottom";
