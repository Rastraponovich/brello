import { memo } from "react";

import { DEFAULT_CLASS, DEFAULT_COL_CLASS } from "./constants";
import type { GridColumnProps, GridProps, IBaseGridItemTemplate } from "./model";

const genericMemo: <T>(component: T) => T = memo;

function _Grid<T>(props: GridProps<T>) {
  const { items, keyProperty, itemTemplate, templateOptions, displayProperty } = props;

  return (
    <div className={DEFAULT_CLASS}>
      {items.map((item: T) => (
        <GridColumn<T>
          item={item}
          keyProperty={keyProperty}
          itemTemplate={itemTemplate}
          key={item[keyProperty] as string}
          templateOptions={templateOptions}
          displayProperty={displayProperty}
        />
      ))}
    </div>
  );
}

function _GridColumn<T>(props: GridColumnProps<T>) {
  const { item, keyProperty, templateOptions, displayProperty, itemTemplate: ItemTemplate } = props;

  return (
    <div className={DEFAULT_COL_CLASS}>
      {ItemTemplate ? (
        <ItemTemplate item={item} {...templateOptions} keyProperty={keyProperty} />
      ) : (
        <BaseGridItemTemplate
          item={item}
          {...templateOptions}
          keyProperty={keyProperty}
          displayProperty={displayProperty}
        />
      )}
    </div>
  );
}

export function BaseGridItemTemplate<T>(props: IBaseGridItemTemplate<T>) {
  const { item, displayProperty } = props;

  return <div>{item[displayProperty] as string}</div>;
}

export const Grid = genericMemo(_Grid);
export const GridColumn = genericMemo(_GridColumn);
