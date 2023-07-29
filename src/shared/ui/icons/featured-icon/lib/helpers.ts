import { Sizes } from "shared/lib";
import { TCircleVariant, TSquareVariant } from ".";

export enum EFeaturedIconType {
  CIRCLE = "circle",
  SQUARE = "square",
}

export enum EFeaturedIconColor {
  PRIMARY = "primary",
  WARNING = "warning",
  SUCCESS = "success",
  ERROR = "error",
  GRAY = "gray",
}

export enum EFeaturedIconVariant {
  LIGHT = "light",
  MID = "mid",
  DARK = "dark",
  GLASS = "glass",
  MODERN = "modern",
  LIGHT_CIRCLE = "lightCircle",
  OUTLINE = "outline",
  DARK_CIRCLE = "darkCircle",
}

export const FEATURED_ICON_SIZE_DICT: Record<Sizes, string> = {
  [Sizes.XS]: "h-3 w-3",
  [Sizes.SM]: "h-4 w-4",
  [Sizes.MD]: "h-5 w-5",
  [Sizes.LG]: "h-6 w-6",
  [Sizes.XL]: "h-7 w-7",
};

export const BORDER_SIZE: Record<Sizes, string> = {
  [Sizes.XS]: "border-2",
  [Sizes.SM]: "border-4",
  [Sizes.MD]: "border-6",
  [Sizes.LG]: "border-8",
  [Sizes.XL]: "border-10",
};

export const FEATURED_ICON_CONTAINER_SIZE_DICT: Record<Sizes, string> = {
  [Sizes.XS]: "p-1.5",
  [Sizes.SM]: "p-2",
  [Sizes.MD]: "p-2.5",
  [Sizes.LG]: "p-3",
  [Sizes.XL]: "p-3.5",
};

export const FEATURED_ICON_VARIANT_DICT: Record<EFeaturedIconVariant, string> =
  {
    [EFeaturedIconVariant.LIGHT]: "rounded-lg",
    [EFeaturedIconVariant.MID]: "rounded-lg",
    [EFeaturedIconVariant.DARK]: "rounded-lg",
    [EFeaturedIconVariant.GLASS]: "rounded-lg",
    [EFeaturedIconVariant.MODERN]: "rounded-lg border",
    [EFeaturedIconVariant.LIGHT_CIRCLE]: "rounded-full",
    [EFeaturedIconVariant.DARK_CIRCLE]: "rounded-full border",
    [EFeaturedIconVariant.OUTLINE]: "rounded-full border",
  };

type TColorsConditional<
  T,
  S extends string = T extends TCircleVariant ? TCircleVariant : TSquareVariant,
> = Record<
  S,
  T extends TCircleVariant ? Record<EFeaturedIconColor, string> : string
>;

export const SQUARE_COLORS: TColorsConditional<TSquareVariant> = {
  [EFeaturedIconVariant.MODERN]: "border-gray-200 text-gray-700 bg-white",
  [EFeaturedIconVariant.GLASS]: "text-white bg-white/60 blur-8",
  [EFeaturedIconVariant.LIGHT]: "text-blue-600 bg-blue-100",
  [EFeaturedIconVariant.MID]: "bg-blue-600 text-white",
  [EFeaturedIconVariant.DARK]: "bg-blue-800 text-white",
};

export const CIRCLE_COLORS: TColorsConditional<TCircleVariant> = {
  [EFeaturedIconVariant.LIGHT_CIRCLE]: {
    [EFeaturedIconColor.PRIMARY]: "text-blue-600 bg-blue-100",
    [EFeaturedIconColor.SUCCESS]: "text-green-600 bg-green-100",
    [EFeaturedIconColor.ERROR]: "text-rose-600 bg-rose-100",
    [EFeaturedIconColor.GRAY]: "text-gray-600 bg-gray-100",
    [EFeaturedIconColor.WARNING]: "text-orange-600 bg-orange-100",
  },
  [EFeaturedIconVariant.DARK_CIRCLE]: {
    [EFeaturedIconColor.PRIMARY]: "text-white bg-blue-500 border-blue-600",
    [EFeaturedIconColor.SUCCESS]: "text-white bg-green-500 border-green-600",
    [EFeaturedIconColor.ERROR]: "text-white bg-rose-500 border-rose-600",
    [EFeaturedIconColor.GRAY]: "text-white bg-gray-500 border-gray-600",
    [EFeaturedIconColor.WARNING]: "text-white bg-orange-500 border-orange-600",
  },
  [EFeaturedIconVariant.OUTLINE]: {
    [EFeaturedIconColor.PRIMARY]: "text-blue-600 bg-blue-100 border-blue-50",
    [EFeaturedIconColor.SUCCESS]: "text-green-600 bg-green-100 border-green-50",
    [EFeaturedIconColor.ERROR]: "text-rose-600 bg-rose-100 border-rose-50",
    [EFeaturedIconColor.GRAY]: "text-gray-600 bg-gray-100 border-gray-50",
    [EFeaturedIconColor.WARNING]:
      "text-orange-600 bg-orange-100 border-orange-50",
  },
};
