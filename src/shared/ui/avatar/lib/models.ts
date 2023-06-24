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
  user?: {
    firstName?: string;
    lastName?: string;
    fullName?: string;
    photo?: string;
    id?: number;
  };
}

export interface IAvatarGroup {
  items: unknown[];
  size?: TAvatarGroupSize;
  itemClassName?: string;
  counter?: number;
}

export interface IAvatarCounterProps extends IAvatarGroupSize {
  count: number;
}

export interface IAddAvatarButtonProps extends IAvatarGroupSize {
  size: TAvatarGroupSize;
}
