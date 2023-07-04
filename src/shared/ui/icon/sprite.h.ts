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
    | "user";
  social:
    | "google-color"
    | "apple-color"
    | "facebook-color"
    | "twitter-color"
    | "dribbble-color"
    | "figma-color"
    | "facebook-colorWithBrand"
    | "apple-colorWithBrand"
    | "dribbble-colorWithBrand"
    | "figma-colorWithBrand"
    | "google-colorWithBrand"
    | "twitter-colorWithBrand"
    | "google-brand"
    | "figma-brand"
    | "dribbble-brand"
    | "facebook-brand"
    | "twitter-brand"
    | "apple-brand";
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
  ],
  social: [
    "google-color",
    "apple-color",
    "facebook-color",
    "twitter-color",
    "dribbble-color",
    "figma-color",
    "facebook-colorWithBrand",
    "apple-colorWithBrand",
    "dribbble-colorWithBrand",
    "figma-colorWithBrand",
    "google-colorWithBrand",
    "twitter-colorWithBrand",
    "google-brand",
    "figma-brand",
    "dribbble-brand",
    "facebook-brand",
    "twitter-brand",
    "apple-brand",
  ],
};
