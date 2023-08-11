import type { ElementType } from "react";

export interface GridProps<T = unknown> extends Omit<GridColumnProps<T>, "item"> {
  items: T[];
  onItemClick?(item: T): void;
}

export interface GridColumnProps<T> extends BaseTemplateProps<T> {
  itemTemplate: ElementType;
  templateOptions?: object;
  item: T;
}

export interface IBaseGridItemTemplate<T> extends BaseTemplateProps<T> {
  item: T;
}

export interface BaseTemplateProps<T> {
  keyProperty: keyof T;
  displayProperty: keyof T;
}
