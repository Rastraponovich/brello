import { memo } from "react";

import { type models, closeXButton, iconButton, button } from "../lib";

import { Icon } from "shared/ui/icon";
import { Marker } from "shared/ui/marker";

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
          <Icon
            name={leftIcon}
            data-qa="Button-icon__left"
            size={size === "xl" ? "large" : "normal"}
          />
        )}
        {visualType === "dot" &&
          variant !== "link" &&
          variant !== "linkGray" && <Marker className="shrink-0" />}
        {children}
        {rightIcon && visualType !== "dot" && (
          <Icon
            name={rightIcon}
            data-qa="Button-icon__right"
            size={size === "xl" ? "large" : "normal"}
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
        <Icon
          name={icon}
          data-qa="IconButton__icon"
          size={size === "lg" ? "large" : "normal"}
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
        <Icon
          name="common/x-close"
          data-qa="CloseXButton__icon"
          size={size === "lg" ? "large" : "normal"}
        />
      </button>
    );
  }
);
Button.displayName = "Button";
