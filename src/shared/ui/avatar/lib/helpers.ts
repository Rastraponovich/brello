import { type TUser } from "entities/user/lib";
import type { TAvatarGroupSize, TAvatarSizes } from "./models";

enum ImageSize {
  XS = 24,
  SM = 32,
  MD = 40,
  LG = 48,
  XL = 56,
  "2XL" = 64,
}

export const AVATAR_IMAGE_SIZE_DICT: Record<TAvatarSizes, ImageSize> = {
  xs: ImageSize.XS,
  sm: ImageSize.SM,
  md: ImageSize.MD,
  lg: ImageSize.LG,
  xl: ImageSize.XL,
  "2xl": ImageSize["2XL"],
};

enum Sizes {
  XS = "h-4 w-4 text-xs",
  SM = "h-8 w-8 text-sm",
  MD = "h-10 w-10 text-base",
  LG = "h-12 w-12 text-lg",
  XL = "h-14 w-14 text-xl",
  "2XL" = "h-16 w-16 text-2xl",
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

export function getShortName(user: TUser): string {
  let result = "";

  switch (true) {
    case Boolean(!user.lastName && user.firstName):
      result = `${user.firstName[0]}${user.firstName[1]}`;
      break;

    case user.lastName && !user.firstName:
      result = `${user.lastName[0]}${user.lastName[1]}`;
      break;

    case Boolean(user.lastName && user.firstName):
      result = `${user.firstName[0]}${user.lastName[0]}`;
      break;

    default:
      break;
  }

  return result;
}
