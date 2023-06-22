import { memo } from "react";
import { IButtonBaseProps } from "../lib";
import clsx from "clsx";
import {
  BUTTON_SIZES_DICT,
  BUTTON_VARIANTS,
  EButtonSize,
  EButtonTextAlign,
  EButtonVariant,
} from "../lib/helpers";

export const Button = memo<IButtonBaseProps>(
  ({
    children,
    className,
    textAlign = EButtonTextAlign.Center,
    size = EButtonSize.SM,
    leftIcon,
    rightIcon,
    variant = EButtonVariant.DEFAULT,
    ...props
  }) => {
    return (
      <button
        {...props}
        className={clsx(
          "flex items-center rounded-lg border text-base font-semibold",
          textAlign === EButtonTextAlign.Left && "justify-start",
          textAlign === EButtonTextAlign.Center && "justify-center",
          textAlign === EButtonTextAlign.Right && "justify-end",
          variant !== "link" && BUTTON_SIZES_DICT[size],
          BUTTON_VARIANTS[variant],
          className
        )}
      >
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </button>
    );
  }
);
