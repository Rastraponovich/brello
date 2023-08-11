import { TUser } from "~/entities/user/lib";

import { TSizes } from "~/shared/lib";

export type AvatarSize = TSizes | "2xl";

export type AvatarGroupSize = "xs" | "sm" | "md";

interface IAvatarGroupSize {
  size: AvatarGroupSize;
}

export interface AvatarProps {
  className?: string;
  size?: AvatarSize;
  user?: TUser;
}

export interface AvatarGroupProps {
  items: TUser[];
  size?: AvatarGroupSize;
  itemClassName?: string;
  counter?: number;
  canAddedUser?: boolean;
}

export interface AvatarCounterProps extends IAvatarGroupSize {
  count: number;
}

export interface AvatarAddButtonProps extends IAvatarGroupSize {
  size: AvatarGroupSize;
}
