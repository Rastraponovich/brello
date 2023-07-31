import type { TColors, TSizes } from "shared/lib";
import { type IconName } from "shared/ui/icon";

export type TFeaturedType = "cirlce" | "square";
export type TCircleVariant = "lightCircle" | "darkCircle" | "outline";
export type TSquareVariant = "light" | "dark" | "mid" | "modern" | "glass";

export interface IFeaturedIconProps {
  color?: TColors;
  icon: IconName;
  className?: string;
  iconClassName?: string;
  size?: TSizes;
}

type TConditionalProps =
  | {
      type: "circle";
      variant: TCircleVariant;
      color?: TColors;
    }
  | {
      type: "square";
      variant: TSquareVariant;
    };

export type TFeaturedIconProps = IFeaturedIconProps & TConditionalProps;
