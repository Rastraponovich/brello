import type { SocialButtonAuthServices } from "./model";

export enum Colors {
  Default = "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:hover:bg-white  disabled:opacity-50",
  Facebook = "bg-facebook-600 border-facebook-600 text-white hover:bg-facebook-700 hover:border-facebook-700",
  Apple = "bg-black text-white border-black text-white",
  Figma = "bg-black text-white border-black text-white",
  Twitter = "bg-twitter-600 border-twitter-600 text-white hover:bg-twitter-700 hover:border-twitter-700",
  Dribbble = "bg-dribbble-600 border-dribbble-600 text-white hover:bg-dribbble-700 hover:dribbble-facebook-700",
}

export const BUTTON_COLORS_DICT: Record<SocialButtonAuthServices, Colors> = {
  google: Colors.Default,
  facebook: Colors.Facebook,
  apple: Colors.Apple,
  figma: Colors.Figma,
  twitter: Colors.Twitter,
  dribbble: Colors.Dribbble,
};
