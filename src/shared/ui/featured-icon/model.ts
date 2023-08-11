import type { TColors, TSizes } from "~/shared/lib";
import { type IconName } from "~/shared/ui/icon";

export type FeaturedIconType = "cirlce" | "square";
export type FeaturedIconCircleVariant = "lightCircle" | "darkCircle" | "outline";
export type FeaturedIconSquareVariant = "light" | "dark" | "mid" | "modern" | "glass";

export interface BaseFeaturedIconProps {
  color?: TColors;
  icon: IconName;
  className?: string;
  iconClassName?: string;
  size?: TSizes;
}

type ConditionalProps =
  | {
      type: "circle";
      variant: FeaturedIconCircleVariant;
      color?: TColors;
    }
  | {
      type: "square";
      variant: FeaturedIconSquareVariant;
    };

export type FeaturedIconProps = BaseFeaturedIconProps & ConditionalProps;
