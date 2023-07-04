import clsx from "clsx";
import { SVGProps } from "react";
import { SpritesMap } from "../sprite.h";

import { type IBaseIconSize } from "../lib";

enum BaseIconSize {
  small = "h-4 w-4",
  normal = "h-5 w-5",
  large = "h-6 w-6",
}

export type IconName = {
  [Key in keyof SpritesMap]: `${Key}/${SpritesMap[Key]}`;
}[keyof SpritesMap];

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, "name" | "type">,
    IBaseIconSize {
  name: IconName;
}
export function Icon({
  name,
  className,
  size = "normal",
  ...props
}: IconProps) {
  const [spriteName, iconName] = name.split("/");

  return (
    <svg
      className={clsx(
        "inline-block select-none fill-current text-inherit",
        size ? BaseIconSize[size] : "h-[1em] w-[1em]",
        className
      )}
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden
      {...props}
    >
      <use xlinkHref={`/sprites/${spriteName}.svg#${iconName}`} />
    </svg>
  );
}
