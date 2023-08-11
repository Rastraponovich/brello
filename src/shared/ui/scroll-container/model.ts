import { type ReactNode } from "react";

// TODO: Добавить выбор отслеживания скрола
export interface ScrollContainerProps {
  children: ReactNode;
  scrollOrientation?: ScrollOrientation;
}

export type ScrollOrientation = "vertical" | "horizontal" | "both";
