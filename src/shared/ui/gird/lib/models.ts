import { ElementType } from "react";

export interface IGrid<T = unknown> extends Omit<IGridColumn<T>, "item"> {
  items: T[];
  onItemClick?(item: T): void;
}

export interface IGridColumn<T> extends IBaseTemplate<T> {
  itemTemplate: ElementType;
  templateOptions?: object;
  item: T;
}

export interface IBaseGridItemTemplate<T> extends IBaseTemplate<T> {
  item: T;
}

export interface IBaseTemplate<T> {
  keyProperty: keyof T;
  displayProperty: keyof T;
}
