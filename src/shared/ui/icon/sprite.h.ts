export interface SpritesMap {
  arrows: "arrow-left";
  common:
    | "arrow-left"
    | "attachment"
    | "clock"
    | "dots-vertical"
    | "folder-shield"
    | "help-circle"
    | "home-line"
    | "layers-two"
    | "log-out"
    | "mail"
    | "menu"
    | "plus-circle"
    | "plus-square"
    | "plus"
    | "search-lg"
    | "search"
    | "settings-01"
    | "settings"
    | "upload-cloud"
    | "user-circle"
    | "user"
    | "users-plus"
    | "x-close"
    | "zap"
    | "search-sm";
  communication: "message-smile-circle";
  development: "container";
  shapes: "star-01";
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
  users:
    | "user-01"
    | "user-circle"
    | "user-plus-01"
    | "user"
    | "users-01"
    | "users-plus";
}

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  arrows: ["arrow-left"],
  common: [
    "arrow-left",
    "attachment",
    "clock",
    "dots-vertical",
    "folder-shield",
    "help-circle",
    "home-line",
    "layers-two",
    "log-out",
    "mail",
    "menu",
    "plus-circle",
    "plus-square",
    "plus",
    "search-lg",
    "search",
    "settings-01",
    "settings",
    "upload-cloud",
    "user-circle",
    "user",
    "users-plus",
    "x-close",
    "zap",
    "search-sm",
  ],
  communication: ["message-smile-circle"],
  development: ["container"],
  shapes: ["star-01"],
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
  users: [
    "user-01",
    "user-circle",
    "user-plus-01",
    "user",
    "users-01",
    "users-plus",
  ],
};
