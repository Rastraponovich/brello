import { memo } from "react";
import { ICloseXButton, IIconButton, TButtonProps } from "../lib";
import clsx from "clsx";
import {
  BUTTON_COLORS,
  BUTTON_ICON_SIZE,
  BUTTON_SIZES_DICT,
  BUTTON_TEXT_ALIGN,
  BUTTON_TEXT_SIZE_DICT,
  BUTTON_VARIANTS,
  CLOSE_BUTTON_SIZE_DICT,
  CLOSE_BUTTON_VARIANT_DICT,
} from "../lib/helpers";
import { XCloseIcon } from "../../icons/common";

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
          "flex shrink items-center rounded-lg border font-semibold",
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

export const CloseXButton = memo<ICloseXButton>(
  ({ className, size = "sm", variant = "primary", ...props }) => {
    return (
      <button
        {...props}
        className={clsx(
          "flex items-center rounded-lg border border-transparent font-semibold",
          CLOSE_BUTTON_SIZE_DICT[size],
          CLOSE_BUTTON_VARIANT_DICT[variant],
          className
        )}
      >
        <XCloseIcon className={clsx(size === "lg" ? "h-6 w-6" : "h-5 w-5")} />
      </button>
    );
  }
);
