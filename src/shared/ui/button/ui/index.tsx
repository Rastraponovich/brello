import clsx from "clsx";
import { memo } from "react";

import { helpers, type models } from "../lib";

import { BaseIcon } from "shared/ui/icon";

export const Button = memo<models.TButtonProps>(
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
        data-qa={`Button__${variant}`}
        {...props}
        className={clsx(
          "flex items-center justify-center rounded-lg border font-semibold",
          size === "xl" ? "gap-3" : "gap-2",
          helpers.BUTTON_TEXT_ALIGN[textAlign],
          helpers.BUTTON_SIZES_DICT[size],
          helpers.BUTTON_VARIANTS[variant],
          helpers.BUTTON_COLORS[variant],
          helpers.BUTTON_TEXT_SIZE_DICT[size],
          className
        )}
      >
        {leftIcon && (
          <BaseIcon
            data-qa="Button-icon__left"
            size={size === "xl" ? "large" : "normal"}
            {...leftIcon}
          />
        )}
        {children}
        {rightIcon && (
          <BaseIcon
            data-qa="Button-icon__right"
            size={size === "xl" ? "large" : "normal"}
            {...rightIcon}
          />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export const IconButton = memo<models.IIconButton>(
  ({ className, size = "sm", icon, variant = "primary", ...props }) => {
    return (
      <button
        data-qa="IconButton"
        {...props}
        className={clsx(
          "flex shrink items-center rounded-lg border font-semibold",
          helpers.BUTTON_ICON_SIZE[size],
          helpers.BUTTON_VARIANTS[variant],
          helpers.BUTTON_COLORS[variant],
          className
        )}
      >
        <BaseIcon
          data-qa="IconButton__icon"
          size={size === "lg" ? "large" : "normal"}
          {...icon}
        />
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

export const CloseXButton = memo<models.ICloseXButton>(
  ({ className, size = "sm", variant = "primary", ...props }) => {
    return (
      <button
        data-qa="CloseXButton"
        {...props}
        className={clsx(
          "flex items-center rounded-lg border border-transparent font-semibold",
          helpers.CLOSE_BUTTON_SIZE_DICT[size],
          helpers.CLOSE_BUTTON_VARIANT_DICT[variant],
          className
        )}
      >
        <BaseIcon
          icon="x-close"
          source="general"
          data-qa="CloseXButton__icon"
          size={size === "lg" ? "large" : "normal"}
        />
      </button>
    );
  }
);
Button.displayName = "Button";
