export enum EFeaturedIconSize {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

export const FEATURED_ICON_SIZE_DICT: Record<EFeaturedIconSize, string> = {
  [EFeaturedIconSize.SM]: "h-8 w-8",
  [EFeaturedIconSize.MD]: "h-10 w-10",
  [EFeaturedIconSize.LG]: "h-14 w-14",
};
