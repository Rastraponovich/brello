import { memo } from "react";
import { IButtonBaseProps } from "../lib";
import clsx from "clsx";
import {
  BUTTON_SIZES_DICT,
  EButtonSize,
  EButtonTextAlign,
} from "../lib/helpers";

export const Button = memo<IButtonBaseProps>(
  ({
    children,
    className,
    textAlign = EButtonTextAlign.Center,
    size = EButtonSize.SM,
    leftIcon,
    rightIcon,
    ...props
  }) => {
    return (
      <button
        {...props}
        className={clsx(
          "flex items-center rounded-lg border text-base font-semibold shadow-sm",
          className,
          textAlign === EButtonTextAlign.Left && "justify-start",
          textAlign === EButtonTextAlign.Center && "justify-center",
          textAlign === EButtonTextAlign.Right && "justify-end",
          BUTTON_SIZES_DICT[size]
        )}
      >
        {leftIcon && <div>left</div>}
        {children}
        {rightIcon && <div>left</div>}
      </button>
    );
  }
);
