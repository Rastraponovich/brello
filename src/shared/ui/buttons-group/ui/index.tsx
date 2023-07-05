import { memo } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { type models } from "../lib";

import { Icon } from "shared/ui/icon";
import { Marker } from "shared/ui/marker";

interface IBaseGroupButton
  extends Omit<models.TBaseButtonGroupAction, "id">,
    TBaseGroupButton {
  foo?: "bar";
}

type TBaseGroupButton = VariantProps<typeof baseGroupButton>;

const baseGroupButton = cva(
  "group flex justify-center w-full first:rounded-l-lg last:rounded-r-lg items-center gap-2 disabled:bg-white hover:border-gray-300 py-2.5 text-sm font-semibold hover:bg-gray-50  focus:bg-gray-50 disabled:text-gray-300",
  {
    variants: {
      variant: {
        text: "",
        icon: "px-3",
        dot: "",
        iconWithText: "",
      },
    },
    compoundVariants: [
      {
        variant: ["text", "dot", "iconWithText"],
        className: "px-4 text-gray-700 hover:text-gray-800",
      },
    ],
    defaultVariants: {
      variant: "text",
    },
  }
);
const BaseGroupButton = memo<IBaseGroupButton>(
  ({ variant, text, handler, icon, disabled }) => {
    return (
      <button
        type="button"
        onClick={handler}
        disabled={disabled}
        className={baseGroupButton({ variant })}
      >
        {variant === "dot" && (
          <Marker variant={disabled ? "disabled" : "active"} />
        )}
        {(variant === "iconWithText" || variant === "icon") && icon && (
          <Icon
            name={icon}
            size="normal"
            className="text-gray-500 group-hover:text-gray-700 group-disabled:text-gray-300"
          />
        )}
        {variant !== "icon" && text && <span>{text}</span>}
      </button>
    );
  }
);

BaseGroupButton.displayName = "__BaseGroupButton__";

const baseButtonGroups = cva(
  "flex divide-x divide-gray-300 self-start rounded-lg border border-gray-300 shadow-sm",
  {
    variants: { fullWidth: { true: "w-full", false: "" } },
    defaultVariants: { fullWidth: false },
  }
);

export const ButtonsGroup = memo<models.IButtonsGroup>(
  ({ variant = "text", fullWidth = false }) => {
    const actions: models.TBaseButtonGroupAction[] = [
      {
        id: 1,
        text: "preved",
        icon: "common/plus",
      },
      {
        id: 2,
        text: "medved",
        icon: "common/plus",
      },
      {
        id: 3,
        text: "velosiped",
        icon: "common/plus",

        disabled: true,
      },
    ];
    return (
      <div className={baseButtonGroups({ fullWidth })}>
        {actions.map(({ id, ...action }) => (
          <BaseGroupButton key={id} variant={variant} {...action} />
        ))}
      </div>
    );
  }
);

ButtonsGroup.displayName = "__ButtonsGroup__";
