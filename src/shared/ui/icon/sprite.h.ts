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
    | "user"
    | "users-plus"
    | "x-close";
  social:
    | "apple-brand"
    | "apple-color"
    | "apple-colorWithBrand"
    | "dribbble-brand"
    | "dribbble-color"
    | "dribbble-colorWithBrand"
    | "facebook-brand"
    | "facebook-color"
    | "facebook-colorWithBrand"
    | "figma-brand"
    | "figma-color"
    | "figma-colorWithBrand"
    | "google-brand"
    | "google-color"
    | "google-colorWithBrand"
    | "twitter-brand"
    | "twitter-color"
    | "twitter-colorWithBrand";
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
    "user",
    "users-plus",
    "x-close",
  ],
  social: [
    "apple-brand",
    "apple-color",
    "apple-colorWithBrand",
    "dribbble-brand",
    "dribbble-color",
    "dribbble-colorWithBrand",
    "facebook-brand",
    "facebook-color",
    "facebook-colorWithBrand",
    "figma-brand",
    "figma-color",
    "figma-colorWithBrand",
    "google-brand",
    "google-color",
    "google-colorWithBrand",
    "twitter-brand",
    "twitter-color",
    "twitter-colorWithBrand",
  ],
};
