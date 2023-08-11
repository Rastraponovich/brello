import { memo } from "react";

import { DEFAULT_CLASS, DEFAULT_COL_CLASS } from "./constants";
import type { GridColumnProps, GridProps, IBaseGridItemTemplate } from "./model";

const genericMemo: <T>(component: T) => T = memo;

const _Grid = <T,>({
  items,
  keyProperty,
  itemTemplate,
  templateOptions,
  displayProperty,
}: GridProps<T>) => {
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
};

const _GridColumn = <T,>({
  item,
  keyProperty,
  templateOptions,
  displayProperty,
  itemTemplate: ItemTemplate,
}: GridColumnProps<T>) => {
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
};

export const BaseGridItemTemplate = <T,>({ item, displayProperty }: IBaseGridItemTemplate<T>) => {
  return <div>{item[displayProperty] as string}</div>;
};

export const Grid = genericMemo(_Grid);
export const GridColumn = genericMemo(_GridColumn);
