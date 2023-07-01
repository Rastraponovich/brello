import { TUser } from "src/entities/user/lib";
import { TSizes } from "src/shared/lib";

export type TAvatarSizes = TSizes | "2xl";

export type TAvatarGroupSize = "xs" | "sm" | "md";

interface IAvatarGroupSize {
  size: TAvatarGroupSize;
}

export interface IAvatarProps {
  foo?: "bar";
  className?: string;
  size?: TAvatarSizes;
  user?: TUser;
}

export interface IAvatarGroup {
  items: TUser[];
  size?: TAvatarGroupSize;
  itemClassName?: string;
  counter?: number;
  canAddedUser?: boolean;
}

export interface IAvatarCounterProps extends IAvatarGroupSize {
  count: number;
}

export interface IAddAvatarButtonProps extends IAvatarGroupSize {
  size: TAvatarGroupSize;
}
