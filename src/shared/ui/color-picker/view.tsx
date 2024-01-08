import { forwardRef } from "react";

import { cx } from "~/shared/lib";

import { COLORS } from "./constants";

interface ColorPickerBaseProps {
  selected: string;
  onColorChange: (value: string) => void;
}
export const ColorPickerBase = forwardRef<HTMLDivElement, ColorPickerBaseProps>(
  ({ selected, onColorChange }, ref) => {
    return (
      <div ref={ref} className="flex items-center">
        {COLORS.map((item) => (
          <ColorPickerItem
            key={item.id}
            className={`${item.className} ${item.value}`}
            selected={item.value === selected}
            onClick={() => onColorChange(item.value)}
          />
        ))}
      </div>
    );
  },
);

interface ColorPickerItemProps {
  selected: boolean;
  className?: string;
  onClick: () => void;
}

const ColorPickerItem = ({ className, onClick, selected }: ColorPickerItemProps) => {
  return (
    <div className="h-10 w-10 p-1.5" onClick={onClick}>
      <div
        className={cx(
          "rounded-full h-full w-full hover:outline outline-offset-2 bg-current",
          selected && "outline outline-2 outline-current",
          className,
        )}
      ></div>
    </div>
  );
};
