import { memo, useMemo } from "react";
import { IButtonProps } from "../lib";
import clsx from "clsx";
import { SpriteIcons } from "src/shared/ui/icon";

export const Button = memo<IButtonProps>(
  ({ caption, pending, iconPosition = "left", icon, ...props }) => {
    const className = useMemo(() => {
      return clsx(
        props.className,
        "flex space-x-2 justify-center",
        iconPosition && iconPosition === "left"
          ? "flex-row"
          : "flex-row-reverse space-x-reverse"
        // iconPosition ? "justify-between" : "justify-center"
      );
    }, [iconPosition, props.className]);
    return (
      <button
        {...props}
        data-qa="Shared__Button"
        title={caption}
        className={className}
      >
        {!!pending && <span>isPending</span>}
        {!!icon && <SpriteIcons name={icon} className="h-4 w-4" />}
        <span>{caption}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
