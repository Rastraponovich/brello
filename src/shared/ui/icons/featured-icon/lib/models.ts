export type TFeaturedIcon =
  | "user"
  | "shield-folder"
  | "plus"
  | "search"
  | "upload-cloud";
export type TFeaturedSizeIcon = "sm" | "md" | "lg";

export interface IFeaturedIconProps {
  icon: TFeaturedIcon;
  className?: string;
  rounded?: boolean;
  iconClassName?: string;
  size?: TFeaturedSizeIcon;
}
