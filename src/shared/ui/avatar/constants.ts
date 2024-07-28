import { type TUser } from "~/entities/user";

import type { AvatarGroupSize, AvatarSize } from "./model";

enum ImageSize {
  XS = 24,
  SM = 32,
  MD = 40,
  LG = 48,
  XL = 56,
  "2XL" = 64,
}

export const AVATAR_IMAGE_SIZE_DICT: Record<AvatarSize, ImageSize> = {
  xs: ImageSize.XS,
  sm: ImageSize.SM,
  md: ImageSize.MD,
  lg: ImageSize.LG,
  xl: ImageSize.XL,
  "2xl": ImageSize["2XL"],
};

enum SpacingSize {
  XS = "-space-x-1",
  SM = "-space-x-2",
  MD = "-space-x-3",
}

export const AVATAR_GROUP_SPACING: Record<AvatarGroupSize, SpacingSize> = {
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
