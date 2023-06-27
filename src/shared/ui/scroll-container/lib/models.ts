import { ReactNode } from "react";

// TODO: Добавить выбор отслеживания скрола
export interface IScrollContainer {
  children: ReactNode;
  scrollOrientation?: TScrollOrientation;
}

export type TScrollOrientation = "vertical" | "horizontal" | "both";
