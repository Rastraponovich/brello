import { memo } from "react";
import { models } from "../lib";

const genericMemo: <T>(component: T) => T = memo;
const DEFAULT_CLASS =
  "grid snap-x snap-mandatory  scroll-px-4 auto-cols-[360px] grid-flow-col gap-12 overflow-x-auto overflow-y-hidden p-4 sm:scroll-px-8 sm:p-8 ";

const DEFAULT_COL_CLASS =
  "flex  snap-center snap-normal flex-col justify-start overflow-hidden";

const _Grid = <T,>({
  items,
  keyProperty,
  itemTemplate,
  templateOptions,
  displayProperty,
}: models.IGrid<T>) => {
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
}: models.IGridColumn<T>) => {
  return (
    <div className={DEFAULT_COL_CLASS}>
      {ItemTemplate ? (
        <ItemTemplate
          item={item}
          {...templateOptions}
          keyProperty={keyProperty}
        />
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

export const BaseGridItemTemplate = <T,>({
  item,
  displayProperty,
}: models.IBaseGridItemTemplate<T>) => {
  return <div>{item[displayProperty] as string}</div>;
};

export const Grid = genericMemo(_Grid);
export const GridColumn = genericMemo(_GridColumn);
