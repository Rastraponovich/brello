import { forwardRef } from "react";

import { cx } from "~/shared/lib";

import { COLORS } from "./constants";

interface ColorPickerBaseProps {
  selected: string;
  onColorChange: (value: string) => void;
}

export const ColorPickerBase = forwardRef<HTMLDivElement, ColorPickerBaseProps>((props, ref) => {
  const { selected, onColorChange } = props;

  return (
    <div ref={ref} className="flex items-center">
      {COLORS.map((item) => (
        <ColorPickerItem
          key={item.id}
          selected={item.value === selected}
          onClick={() => onColorChange(item.value)}
          className={cx(item.className, item.value)}
        />
      ))}
    </div>
  );
});

interface ColorPickerItemProps {
  selected: boolean;
  className?: string;
  onClick: () => void;
}

function ColorPickerItem(props: ColorPickerItemProps) {
  const { className, onClick, selected } = props;

  return (
    <div className="aspect-square size-10 shrink-0 p-1.5" onClick={onClick}>
      <div
        className={cx(
          "h-full w-full rounded-full bg-current outline-offset-[3px] hover:outline",
          selected && "outline outline-[3px] outline-current",
          className,
        )}
      ></div>
    </div>
  );
}
