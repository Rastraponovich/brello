import { type ComponentProps } from "react";

export type TSocial =
  | "apple-gray"
  | "facebook-gray"
  | "twitter-gray"
  | "google-gray"
  | "figma-gray"
  | "dribbble-gray"
  | "apple-color"
  | "facebook-color"
  | "twitter-color"
  | "google-color"
  | "figma-color"
  | "dribbble-color"
  | "apple-white"
  | "facebook-white"
  | "twitter-white"
  | "dribbble-white";

export type TBaseIconProps =
  | {
      source: "general";
      icon:
        | "plus"
        | "plus-circle"
        | "plus-square"
        | "menu"
        | "search-lg"
        | "dots-vertical"
        | "logout"
        | "settings"
        | "clock"
        | "search"
        | "attachment"
        | "mail"
        | "x-close";
    }
  | {
      source: "layout";
      icon: "layers-two";
    }
  | {
      source: "security";
      icon: "menu" | "folder-shield";
    }
  | {
      source: "users";
      icon: "user" | "user-circle" | "users-plus";
    }
  | {
      source: "shapes";
      icon: "star";
    }
  | {
      source: "social";
      icon: TSocial;
    };

export interface IBaseIconSize {
  size: "normal" | "large" | "small";
}
export type IBaseIcon = ComponentProps<"svg"> & TBaseIconProps & IBaseIconSize;
