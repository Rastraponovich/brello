import { cx } from "~/shared/lib";

interface ColorPickerBaseProps {
  selected: string;
  onColorChange: (value: string) => void;
}
export const ColorPickerBase = ({ selected, onColorChange }: ColorPickerBaseProps) => {
  const colors = [
    {
      title: "yellow",
      id: 1,
      value: "bg-yellow-500",
      className: "text-yellow-500 hover:outline-yellow-500",
    },
    { title: "red", id: 2, value: "bg-red-500", className: "text-red-500 hover:outline-red-500" },
    {
      title: "pink",
      id: 3,
      value: "bg-pink-500",
      className: "text-pink-500 hover:outline-pink-500",
    },
    {
      title: "zinc",
      id: 4,
      value: "bg-zinc-500",
      className: "text-zinc-500 hover:outline-zinc-500",
    },
    {
      title: "rose",
      id: 5,
      value: "bg-rose-500",
      className: "text-rose-500 hover:outline-rose-500",
    },
    {
      title: "blue",
      id: 6,
      value: "bg-blue-500",
      className: "text-blue-500 hover:outline-blue-500",
    },
    {
      title: "orange",
      id: 7,
      value: "bg-orange-500",
      className: "text-orange-500 hover:outline-orange-500",
    },
    {
      title: "indigo",
      id: 8,
      value: "bg-indigo-500",
      className: "text-indigo-500 hover:outline-indigo-500",
    },
  ];

  return (
    <div className="flex items-center">
      {colors.map((item) => (
        <ColorPickerItem
          key={item.id}
          className={item.className}
          selected={item.value === selected}
          onClick={() => onColorChange(item.value)}
        />
      ))}
    </div>
  );
};

const ColorPickerItem = ({
  className,
  onClick,
  selected,
}: {
  className?: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="h-10 w-10 p-1.5" onClick={onClick}>
      <div
        className={cx(
          "rounded-full h-full w-full hover:outline outline-offset-2 bg-current",
          selected && "outline outline-2 outline-current",
          className,
          className,
        )}
      ></div>
    </div>
  );
};
