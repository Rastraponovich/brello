import { TColors, TSizes } from "src/shared/lib";

export type TFeaturedIcon =
  | "user"
  | "shield-folder"
  | "plus"
  | "search"
  | "upload-cloud";

export type TFeaturedType = "cirlce" | "square";
export type TCircleVariant = "lightCircle" | "darkCircle" | "outline";
export type TSquareVariant = "light" | "dark" | "mid" | "modern" | "glass";

export interface IFeaturedIconProps {
  color?: TColors;
  icon: TFeaturedIcon;
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
