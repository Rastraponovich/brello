import { type SVGProps } from "react";
import { type SpritesMap } from "../sprite.h";

export interface IBaseIconSize {
  size?: "normal" | "large" | "small";
}
export type IconName = {
  [Key in keyof SpritesMap]: `${Key}/${SpritesMap[Key]}`;
}[keyof SpritesMap];

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, "name" | "type">,
    IBaseIconSize {
  name: IconName;
}
