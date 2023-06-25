import { memo } from "react";
import { IIconButton, TButtonProps } from "../lib";
import clsx from "clsx";
import {
  BUTTON_COLORS,
  BUTTON_ICON_SIZE,
  BUTTON_SIZES_DICT,
  BUTTON_TEXT_ALIGN,
  BUTTON_TEXT_SIZE_DICT,
  BUTTON_VARIANTS,
} from "../lib/helpers";

export const Button = memo<TButtonProps>(
  ({
    children,
    className,
    textAlign = "center",
    size = "sm",
    leftIcon = undefined,
    rightIcon = undefined,
    variant = "primary",
    ...props
  }) => {
    return (
      <button
        {...props}
        className={clsx(
          "flex items-center rounded-lg border font-semibold",
          size === "xl" ? "gap-3" : "gap-2",
          BUTTON_TEXT_ALIGN[textAlign],
          BUTTON_SIZES_DICT[size],
          BUTTON_VARIANTS[variant],
          BUTTON_COLORS[variant],
          BUTTON_TEXT_SIZE_DICT[size],
          className
        )}
      >
        {leftIcon && leftIcon}
        <span>{children}</span>
        {rightIcon && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export const IconButton = memo<IIconButton>(
  ({ className, size = "sm", icon = "", variant = "primary", ...props }) => {
    return (
      <button
        {...props}
        className={clsx(
          "flex items-center rounded-lg border font-semibold",
          BUTTON_ICON_SIZE[size],
          BUTTON_VARIANTS[variant],
          BUTTON_COLORS[variant],
          className
        )}
      >
        {icon}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
