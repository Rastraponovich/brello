export interface SpritesMap {
  common:
    | "arrow-left"
    | "attachment"
    | "clock"
    | "dots-vertical"
    | "folder-shield"
    | "layers-two"
    | "log-out"
    | "mail"
    | "menu"
    | "plus-circle"
    | "plus-square"
    | "plus"
    | "search-lg"
    | "search"
    | "settings"
    | "star"
    | "upload-cloud"
    | "x-close"
    | "users-plus"
    | "user"
    | "user-circle";
  social:
    | "apple-color"
    | "apple-brand"
    | "apple-colorWithBrand"
    | "facebook-brand"
    | "facebook-color"
    | "facebook-colorWithBrand"
    | "figma-brand"
    | "dribbble-color"
    | "figma-color"
    | "figma-colorWithBrand"
    | "google-color"
    | "google-brand"
    | "twitter-brand"
    | "google-colorWithBrand"
    | "twitter-color"
    | "dribbble-colorWithBrand"
    | "twitter-colorWithBrand"
    | "dribbble-brand";
}

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  common: [
    "arrow-left",
    "attachment",
    "clock",
    "dots-vertical",
    "folder-shield",
    "layers-two",
    "log-out",
    "mail",
    "menu",
    "plus-circle",
    "plus-square",
    "plus",
    "search-lg",
    "search",
    "settings",
    "star",
    "upload-cloud",
    "x-close",
    "users-plus",
    "user",
    "user-circle",
  ],
  social: [
    "apple-color",
    "apple-brand",
    "apple-colorWithBrand",
    "facebook-brand",
    "facebook-color",
    "facebook-colorWithBrand",
    "figma-brand",
    "dribbble-color",
    "figma-color",
    "figma-colorWithBrand",
    "google-color",
    "google-brand",
    "twitter-brand",
    "google-colorWithBrand",
    "twitter-color",
    "dribbble-colorWithBrand",
    "twitter-colorWithBrand",
    "dribbble-brand",
  ],
};
