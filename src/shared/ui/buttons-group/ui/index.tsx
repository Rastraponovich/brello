import { MouseEventHandler, memo } from "react";
import { BaseIcon, TBaseIconProps } from "../../icon";
import clsx from "clsx";

type TBaseButtonVariant = "text" | "icon" | "dot" | "iconWithText";

type TAction = {
  id: number;
  text?: string;
  icon?: TBaseIconProps;
  handler?: MouseEventHandler<HTMLButtonElement>;
};

interface IBaseGroupButton extends Omit<TAction, "id"> {
  variant: TBaseButtonVariant;
}
const BaseGroupButton = memo<IBaseGroupButton>(
  ({ variant, text, handler, icon }) => {
    return (
      <button
        onClick={handler}
        className={clsx(
          "flex items-center gap-2 py-2.5 text-sm font-semibold",
          "hover:bg-gray-50 hover:text-gray-800 focus:bg-gray-50 disabled:text-gray-300",
          variant === "icon" ? "px-3 text-gray-500" : "px-4 text-gray-700"
        )}
      >
        {variant === "dot" && (
          <i className="h-2 w-2 rounded-full bg-green-600" />
        )}
        {(variant === "iconWithText" || variant === "icon") && icon && (
          <BaseIcon size="normal" {...icon} />
        )}
        {variant !== "icon" && text && <span>{text}</span>}
      </button>
    );
  }
);

BaseGroupButton.displayName = "__BaseGroupButton__";

interface IButtonsGroup {
  actions: TAction[];
  variant: TBaseButtonVariant;
}
export const ButtonsGroup = memo<IButtonsGroup>(({ variant }) => {
  const actions: TAction[] = [
    {
      id: 1,
      text: "preved",
      icon: {
        source: "general",
        icon: "plus",
      },
    },
    {
      id: 2,
      text: "medved",
      icon: {
        source: "general",
        icon: "plus",
      },
    },
    {
      id: 3,
      text: "velosiped",
      icon: {
        source: "general",
        icon: "plus",
      },
    },
  ];
  return (
    <div className="flex divide-x divide-gray-300 self-start rounded-lg border border-gray-300 shadow-sm">
      {actions.map(({ id, ...action }) => (
        <BaseGroupButton {...action} key={id} variant={variant} />
      ))}
    </div>
  );
});

ButtonsGroup.displayName = "__ButtonsGroup__";
