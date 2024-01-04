import { forwardRef } from "react";

import { cx } from "~/shared/lib";

import { BaseIconSize } from "./constants";
import { type IconProps } from "./model";

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, size = "normal", ...props }, ref) => {
    const [spriteName, iconName] = name.split("/");

    return (
      <svg
        ref={ref}
        aria-hidden
        focusable="false"
        viewBox="0 0 24 24"
        className={cx(
          "inline-block select-none fill-current text-inherit",
          size ? BaseIconSize[size] : "h-[1em] w-[1em]",
          className,
        )}
        {...props}
      >
        <use xlinkHref={`/sprites/${spriteName}.svg#${iconName}`} />
      </svg>
    );
  },
);
Icon.displayName = "Icon";
