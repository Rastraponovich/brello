import type { TAvatarGroupSize, TAvatarSizes } from ".";

enum Sizes {
  XS = "h-4 w-4",
  SM = "h-8 w-8",
  MD = "h-10 w-10",
  LG = "h-12 w-12",
  XL = "h-14 w-14",
  "2XL" = "h-16 w-16",
}

export const AVATAR_SIZE_DICT: Record<TAvatarSizes, Sizes> = {
  xs: Sizes.XS,
  sm: Sizes.SM,
  md: Sizes.MD,
  lg: Sizes.LG,
  xl: Sizes.XL,
  "2xl": Sizes["2XL"],
};

enum SpacingSize {
  XS = "-space-x-1",
  SM = "-space-x-2",
  MD = "-space-x-3",
}

export const AVATAR_GROUP_SPACING: Record<TAvatarGroupSize, SpacingSize> = {
  xs: SpacingSize.XS,
  sm: SpacingSize.SM,
  md: SpacingSize.MD,
};
