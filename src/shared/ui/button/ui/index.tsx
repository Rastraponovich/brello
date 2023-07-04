import { memo } from "react";

import { type models, closeXButton, iconButton, button } from "../lib";

import { BaseIcon } from "shared/ui/icon";
import { Marker } from "../../marker";

export const Button = memo<models.TButtonProps>(
  ({
    children,
    className,
    size = "sm",
    leftIcon = undefined,
    rightIcon = undefined,
    variant = "primary",
    visualType,
    ...props
  }) => {
    return (
      <button
        data-qa={`Button__${variant}`}
        {...props}
        className={button({ variant, size, className })}
      >
        {leftIcon && visualType !== "dot" && (
          <BaseIcon
            data-qa="Button-icon__left"
            size={size === "xl" ? "large" : "normal"}
            {...leftIcon}
          />
        )}
        {visualType === "dot" &&
          variant !== "link" &&
          variant !== "linkGray" && <Marker className="shrink-0" />}
        {children}
        {rightIcon && visualType !== "dot" && (
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
        className={iconButton({ variant, size, className })}
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
        className={closeXButton({ size, variant, className })}
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
