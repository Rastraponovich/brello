import { TSocial } from "src/shared/ui/icon/lib";
import { TAuthServices, TButtonTheme } from "./models";

export enum Colors {
  Default = "border-gray-300 bg-white text-gray-700",
  Facebook = "bg-facebook-600 border-facebook-600 text-white",
  Apple = "bg-black text-white border-black text-white",
  Figma = "bg-black text-white border-black text-white",
  Twitter = "bg-twitter-600 border-twitter-600 text-white",
  Dribbble = "bg-dribbble-600 border-dribbble-600 text-white",
}

export const ICONS_DICT: Record<
  TAuthServices,
  Record<TButtonTheme, TSocial>
> = {
  google: {
    colorWithBrand: "google-color",
    color: "google-gray",
    brand: "google-color",
  },
  apple: {
    color: "apple-gray",
    brand: "apple-white",
    colorWithBrand: "apple-color",
  },
  dribbble: {
    color: "dribbble-gray",
    brand: "dribbble-white",
    colorWithBrand: "dribbble-color",
  },
  facebook: {
    color: "facebook-gray",
    brand: "facebook-white",
    colorWithBrand: "facebook-color",
  },
  twitter: {
    color: "twitter-color",
    brand: "twitter-white",
    colorWithBrand: "twitter-color",
  },
  figma: {
    color: "figma-gray",
    brand: "figma-color",
    colorWithBrand: "figma-color",
  },
};

export const BUTTON_COLORS_DICT: Record<TAuthServices, Colors> = {
  google: Colors.Default,
  facebook: Colors.Facebook,
  apple: Colors.Apple,
  figma: Colors.Figma,
  twitter: Colors.Twitter,
  dribbble: Colors.Dribbble,
};
