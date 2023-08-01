import { forwardRef, memo } from "react";

import { type models, closeXButton, iconButton, button } from "../lib";

import { Icon } from "shared/ui/icon";
import { Marker } from "shared/ui/marker";

const _Button = forwardRef<HTMLButtonElement, models.TButtonProps>(
  (props, ref) => {
    const {
      pending,
      disabled,
      children,
      leftIcon,
      className,
      rightIcon,
      size = "sm",
      destructive = false,
      variant = "primary",
      visualType = "default",
      ...buttonProps
    } = props;
    return (
      <button
        ref={ref}
        disabled={pending ?? disabled}
        aria-disabled={pending ?? disabled}
        data-qa={`Button__${variant}`}
        className={button({ variant, size, className, destructive })}
        {...buttonProps}
      >
        {!pending ? (
          leftIcon &&
          visualType !== "dot" && (
            <Icon
              name={leftIcon}
              data-qa="Button-icon__left"
              size={size === "xl" ? "large" : "normal"}
            />
          )
        ) : (
          <Icon
            name="common/loading-02"
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
  },
);

export const Button = memo(_Button);
Button.displayName = "Button";

const _IconButton = forwardRef<HTMLButtonElement, models.IIconButton>(
  (props, ref) => {
    const {
      icon,
      className,
      size = "sm",
      variant = "primary",
      destructive = false,
      ...buttonProps
    } = props;
    return (
      <button
        ref={ref}
        data-qa="IconButton"
        className={iconButton({ variant, size, className, destructive })}
        {...buttonProps}
      >
        <Icon
          name={icon}
          data-qa="IconButton__icon"
          size={size === "lg" ? "large" : "normal"}
        />
      </button>
    );
  },
);

export const IconButton = memo(_IconButton);
IconButton.displayName = "IconButton";

const _CloseXButton = forwardRef<HTMLButtonElement, models.ICloseXButton>(
  ({ className, size = "sm", variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
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
  },
);
export const CloseXButton = memo(_CloseXButton);
CloseXButton.displayName = "CloseXButton";
