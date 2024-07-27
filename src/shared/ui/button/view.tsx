import { forwardRef, memo } from "react";

import { Icon } from "~/shared/ui/icon";
import { Marker } from "~/shared/ui/marker";

import { button, closeXButton, iconButton } from "./constants";
import type { CloseXButtonProps, IconButtonProps, TButtonProps } from "./model";

const _Button = forwardRef<HTMLButtonElement, TButtonProps>((props, ref) => {
  const {
    pending,
    disabled,
    children,
    leftIcon,
    className,
    rightIcon,
    size = "sm",
    type = "button",
    destructive = false,
    variant = "primary",
    visualType = "default",
    ...buttonProps
  } = props;

  return (
    <button
      ref={ref}
      type={type}
      data-qa={`Button__${variant}`}
      disabled={pending || disabled}
      aria-disabled={pending || disabled}
      className={button({ variant, size, className, destructive })}
      {...buttonProps}
    >
      {!pending ? (
        leftIcon &&
        visualType !== "dot" && (
          <Icon
            name={leftIcon}
            aria-hidden="true"
            data-qa="Button-icon__left"
            size={size === "xl" ? "large" : "normal"}
          />
        )
      ) : (
        <Icon
          aria-hidden="true"
          name="common/loading-02"
          data-qa="Button-icon__left"
          size={size === "xl" ? "large" : "normal"}
        />
      )}

      {visualType === "dot" && variant !== "link" && variant !== "linkGray" && (
        <Marker className="shrink-0" />
      )}

      {children}

      {rightIcon && visualType !== "dot" && (
        <Icon
          name={rightIcon}
          aria-hidden="true"
          data-qa="Button-icon__right"
          size={size === "xl" ? "large" : "normal"}
        />
      )}
    </button>
  );
});

export const Button = memo(_Button);
Button.displayName = "Button";

const _IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {
    icon,
    className,
    size = "sm",
    type = "button",
    variant = "primary",
    destructive = false,
    ...buttonProps
  } = props;

  return (
    <button
      ref={ref}
      type={type}
      data-qa="IconButton"
      className={iconButton({ variant, size, className, destructive })}
      {...buttonProps}
    >
      <Icon
        name={icon}
        aria-hidden="true"
        data-qa="IconButton__icon"
        size={size === "lg" ? "large" : "normal"}
      />
    </button>
  );
});

export const IconButton = memo(_IconButton);
IconButton.displayName = "IconButton";

const _CloseXButton = forwardRef<HTMLButtonElement, CloseXButtonProps>((props, ref) => {
  const { className, size = "sm", type = "button", variant = "primary", ...restProps } = props;

  return (
    <button
      ref={ref}
      type={type}
      data-qa="CloseXButton"
      {...restProps}
      className={closeXButton({ size, variant, className })}
    >
      <Icon
        aria-hidden="true"
        name="common/x-close"
        data-qa="CloseXButton__icon"
        size={size === "lg" ? "large" : "normal"}
      />
    </button>
  );
});

export const CloseXButton = memo(_CloseXButton);
CloseXButton.displayName = "CloseXButton";
