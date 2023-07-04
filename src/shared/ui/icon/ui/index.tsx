import clsx from "clsx";
import { forwardRef, type ForwardedRef, SVGProps } from "react";
import { SpritesMap } from "../sprite.h";

import type { IBaseIcon } from "../lib";

enum BaseIconSize {
  small = "h-4 w-4",
  normal = "h-5 w-5",
  large = "h-6 w-6",
}

export const BaseIcon = forwardRef<SVGSVGElement, IBaseIcon>(
  (
    { icon, source, size = "normal", className, ...props }: IBaseIcon,
    ref: ForwardedRef<SVGSVGElement>
  ) => {
    return (
      <svg
        ref={ref}
        aria-hidden
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(className, BaseIconSize[size])}
        {...props}
      >
        <use xlinkHref={`/icons/${source}.svg#${icon}-icon`}></use>
      </svg>
    );
  }
);
BaseIcon.displayName = "__BaseIcon__";

export type IconName = {
  [Key in keyof SpritesMap]: `${Key}/${SpritesMap[Key]}`;
}[keyof SpritesMap];

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, "name" | "type"> {
  name: IconName;
}
export function Icon({ name, className, viewBox, ...props }: IconProps) {
  const [spriteName, iconName] = name.split("/");

  return (
    <svg
      className={clsx(
        "inline-block h-[1em] w-[1em] select-none fill-current text-inherit",
        className
      )}
      viewBox={viewBox}
      focusable="false"
      aria-hidden
      {...props}
    >
      <use xlinkHref={`/sprites/${spriteName}.svg#${iconName}`} />
    </svg>
  );
}
